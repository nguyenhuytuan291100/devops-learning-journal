import express from "express";
import bodyParser from "body-parser";

import { InMemoryUrlStore } from "../version1/adapters/repositories/InMemoryUrlStore.js";
import { AnalyticsService } from "../version1/domain/services/AnalyticsService.js";
import { ShortCodeService } from "../version1/domain/services/ShortCodeService.js";

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// Vẫn hard-code để thấy “mùi” OCP; sẽ refactor ở bước sau.
const ALERT_THRESHOLD = 100;
const ALERT_WINDOW_MS = 60_000;

// Khởi tạo các “đối tượng có trách nhiệm rõ ràng”
const shortCodeService = new ShortCodeService();
const urlStore = new InMemoryUrlStore();
const analytics = new AnalyticsService();

app.post("/shorten", (req, res) => {
  try {
    const { url } = req.body ?? {};
    if (!url) return res.status(400).json({ error: "url is required" });

    const code = shortCodeService.generate(url); // SRP: tách sinh/validate code
    urlStore.save(code, url); // SRP: tách lưu trữ mapping

    return res.status(201).json({
      code,
      shortUrl: `http://localhost:${PORT}/${code}`,
    });
  } catch (e: any) {
    return res.status(400).json({ error: e?.message ?? "bad request" });
  }
});

// GET /:code     → tìm url gốc + ghi click + (tạm) kiểm tra alert + redirect
app.get("/:code", (req, res) => {
  const code = req.params.code;
  const url = urlStore.findUrl(code); // SRP: tách tra cứu mapping

  if (!url) return res.status(404).send("Not found");

  const userAgent = String(req.headers["user-agent"] || "unknown");
  analytics.recordClick(code, userAgent); // SRP: ghi nhận click

  // VẪN CÒN “MÙI” OCP: rule cảnh báo hard-code ở controller (bước sau sẽ tách).
  const count = analytics.countInWindow(code, ALERT_WINDOW_MS);
  if (count >= ALERT_THRESHOLD) {
    // VẪN CÒN “MÙI” DIP: notifier là console (bước sau sẽ tách).
    console.log(
      `[ALERT] Code=${code} has ${count} clicks in last ${ALERT_WINDOW_MS / 1000}s`
    );
  }

  res.setHeader("Location", url);
  return res.status(302).send();
});

// GET /stats/:code → thống kê
app.get("/stats/:code", (req, res) => {
  const code = req.params.code;
  if (!urlStore.exists(code))
    return res.status(404).json({ error: "not found" });

  const total = analytics.totalClicks(code);
  const topAgents = analytics.topUserAgents(code);
  const clicksLastMinute = analytics.countInWindow(code, ALERT_WINDOW_MS);

  return res.json({
    code,
    originalUrl: urlStore.getOriginalUrlUnsafe(code), // đã check exists phía trên
    totalClicks: total,
    topAgents,
    clicksLastMinute,
  });
});

app.get("/health", (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`SRP server running on http://localhost:${PORT}`);
});
