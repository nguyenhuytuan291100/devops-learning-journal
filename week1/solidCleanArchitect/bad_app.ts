import express from "express";
import bodyParser from "body-parser";

const app = express(); // khởi tạo express app
app.use(bodyParser.json());

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000; // đọc biến môi trường PORT, mặc định 3000
const ALERT_THRESHOLD = 100; // NGƯỠNG ALERT cứng (hard-code) - vi phạm OCP (khó mở rộng)
const ALERT_WINDOW_MS = 60_000;

// Mọi thứ đổ vào 2 biến này
const urlMap: Record<string, { url: string; createdAt: number }> = {}; // map shortCode → url + thời điểm tạo
const clickLogs: Record<string, { at: number; userAgent: string }[]> = {}; // map shortCode → danh sách click (thời gian + UA)

// Sinh code ngẫu nhiên
function generateShortCode(originalUrl: string): string {
  if (!/^https?:\/\//i.test(originalUrl)) {
    // validate URL rất sơ sài ngay tại đây (không lớp riêng)
    throw new Error("Invalid URL. Must start with http:// or https://"); // ném lỗi ngay controller sẽ nhận
  }
  // Sinh code ngẫu nhiên (rất dễ trùng, không check) - cố tình đơn giản & sai
  return Math.random().toString(36).slice(2, 8);
}

function saveShortUrl(code: string, url: string): void {
  // lưu mapping vào global state
  urlMap[code] = { url, createdAt: Date.now() }; // ghi thẳng vào object toàn cục - vi phạm DIP (không qua abstraction)
  if (!clickLogs[code]) clickLogs[code] = []; // chuẩn bị mảng log clicks nếu chưa có
}

function findOriginalUrl(code: string): string | null {
  // tra cứu URL gốc theo shortCode
  return urlMap[code]?.url ?? null; // nếu không tồn tại, trả null
}

function recordClick(code: string, userAgent: string): void {
  // ghi nhận 1 lần click cho shortCode
  const now = Date.now(); // lấy timestamp hiện tại
  if (!clickLogs[code]) clickLogs[code] = []; // đảm bảo có mảng
  clickLogs[code].push({ at: now, userAgent }); // thêm bản ghi mới (thời gian + UA)
}

function getStats(code: string) {
  // tính thống kê đơn giản cho shortCode
  const logs = clickLogs[code] ?? []; // lấy tất cả click đã ghi
  const total = logs.length; // tổng số click
  // Tính top user-agent rất thô sơ (lặp và đếm)
  const uaCount: Record<string, number> = {}; // bảng đếm UA
  for (const l of logs) {
    // duyệt từng click
    uaCount[l.userAgent] = (uaCount[l.userAgent] || 0) + 1; // tăng bộ đếm
  }
  const topAgents = Object.entries(uaCount) // chuyển sang mảng [UA, count]
    .sort((a, b) => b[1] - a[1]) // sắp xếp giảm dần theo count
    .slice(0, 3); // lấy top 3
  return { total, topAgents }; // trả kết quả
}

function countClicksInWindow(code: string, windowMs: number): number {
  // đếm click trong khoảng thời gian gần đây
  const now = Date.now(); // thời gian hiện tại
  const since = now - windowMs; // mốc "từ thời điểm" = now - windowMs
  const logs = clickLogs[code] ?? []; // lấy log của code
  // lọc các click có thời điểm >= since
  return logs.filter((l) => l.at >= since).length; // số click trong cửa sổ
}

function notifyAlert(code: string, count: number) {
  // THÔNG BÁO ALERT (cố tình chỉ console) - hạ tầng trộn nghiệp vụ
  // Vi phạm DIP: thay vì Notifier interface, ta console trực tiếp.
  console.log(
    `[ALERT] Code=${code} has ${count} clicks in last ${ALERT_WINDOW_MS / 1000}s`
  ); // in cảnh báo
}

// Rút gọn URL
app.post("/shorten", (req, res) => {
  // định nghĩa route POST /shorten
  try {
    // bắt ngoại lệ thô
    const { url } = req.body ?? {}; // lấy url từ body
    if (!url) {
      // nếu không có url
      return res.status(400).json({ error: "url is required" }); // trả lỗi 400
    }
    const code = generateShortCode(url); // sinh mã ngắn (dính logic random ở controller)
    // Lưu vào global state (không qua abstraction)
    saveShortUrl(code, url); // ghi mapping code↔url
    // Trả về kết quả
    return res
      .status(201)
      .json({ code, shortUrl: `http://localhost:${PORT}/${code}` }); // tạo shortUrl trước cả khi biết domain chính thức
  } catch (err: any) {
    // nếu có lỗi validate
    return res.status(400).json({ error: err.message || "bad request" }); // trả lỗi 400
  }
});

// Redirect theo shortCode
app.get("/:code", (req, res) => {
  // định nghĩa route GET /:code
  const code = req.params.code; // đọc code từ path
  const url = findOriginalUrl(code); // lấy URL gốc từ global map
  if (!url) {
    // nếu không tồn tại
    return res.status(404).send("Not found"); // trả 404
  }
  
  const userAgent = req.headers["user-agent"] || "unknown"; // đọc user-agent từ header (nếu không có thì unknown)
  recordClick(code, String(userAgent)); // ghi nhận click (trộn nghiệp vụ vào controller)
  // Kiểm tra cảnh báo ngay tại controller (vi phạm OCP/DIP: rule hard-code)
  const count = countClicksInWindow(code, ALERT_WINDOW_MS); // đếm click trong 60 giây
  if (count >= ALERT_THRESHOLD) {
    // nếu vượt ngưỡng
    notifyAlert(code, count); // gọi notifier console (không qua interface)
  }

  // Thực hiện redirect 302
  res.setHeader("Location", url); // gắn header Location
  return res.status(201).send(); // trả 302 Found
});

// Lấy thống kê
app.get("/stats/:code", (req, res) => {
  // định nghĩa route GET /stats/:code
  const code = req.params.code; // lấy code từ path
  if (!urlMap[code]) {
    // kiểm tra xem code có tồn tại không
    return res.status(404).json({ error: "not found" }); // nếu không có, trả 404
  }
  const stats = getStats(code); // tính thống kê tại chỗ (controller tự làm)
  const lastMinute = countClicksInWindow(code, ALERT_WINDOW_MS); // đếm click trong 60 giây để hiển thị thêm
  return res.json({
    // trả về JSON
    code, // code yêu cầu
    originalUrl: urlMap[code].url, // url gốc (truy cập state toàn cục từ controller)
    totalClicks: stats.total, // tổng click
    topAgents: stats.topAgents, // top user-agent
    clicksLastMinute: lastMinute, // số click trong phút gần nhất
  });
});

// Health-check (tiện test nhanh)
app.get("/health", (_req, res) => {
  // route GET /health
  return res.status(200).json({ ok: true }); // trả ok: true
});

// Khởi động server
app.listen(PORT, () => {
  // lắng nghe cổng PORT đã cấu hình
  console.log(`BAD server running on http://localhost:${PORT}`); // in log địa chỉ server
});
