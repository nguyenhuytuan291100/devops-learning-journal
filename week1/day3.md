# Month 1 - 📅 Day 2 
## 📌 Nội dung hôm nay
- Curl
- Practice clean architect and solid principle

## 🔑 Học hôm nay
1. Thiết kế cơ sở dữ liệu
- Nội dung: Gồm các bước sau:
* Bước 1: Xác định yêu cầu bài toán, bao gồm:
+ Đọc kỹ yêu cầu nghiệp vụ, dữ liệu nào cần quản lý, ai là người quản lý hệ thống, dùng để làm gì;
=> Bước này giống việc phân tích nghiệp vụ trong thực tế.
* Bước 2: Xác định thực thế(Entity) và các thuộc tính:
+ Tìm các danh từ trong yêu cầu, thường sẽ trở thành bảng;
+ Ví dụ: Khách hàng, Sản phẩm, Hóa đơn, Nhân viên;
+ Thuộc tính của các thực thể: Khách hàng(Mã KH, Tên KH, Địa chỉ, SĐT); Sản phẩm(MãSP, TênSP, ĐơnGiá, SốLượngTồn).
* Bước 3: Xác định các mối quan hệ (Relationship)
+ Dựa vào động từ trong yêu cầu;
+ Hóa đơn gồm nhiều sản phẩm;
+ Nhân viên lập hóa đơn nhiều.
=> Đối với quan hệ n-n, ta phải tách thành bảng trung gian ChiTiếtHóaĐơn(MãHĐ, MãSP, SốLượng, ĐơnGiá).
* Bước 4: Vẽ mô hình ERD (Entity-Relationship Diagram):

2. Spring boot
- Khái niệm: Spring boot là 1 framwork của java được xây dựng trên top của spring giúp đơn giản hoá quá trình phát triển ứng dụng. Spring boot đến cùng với máy chủ nhúng.
2.1. Spring boot
- giới thiệu: Spring là một trong những framework phổ biến để xây dựng các ứng dụng, nhưng spring truyền thống yêu cầu file cấu hình XML lớn vì vậy spring boot ra đời để khắc phục vấn đề này;
- Một số tính năng chính:
+ Tự động cấu hình: Tự động cấu hình các components dựa trên các dependencies, không cần các file cấu hình thủ công XML;
+ Dễ dàng bảo trì và tạo REST endpoints bằng việc sử dụng các annotation: @RestController, @GetMapping and @PostMapping;
+ Máy chủ Tomcat nhúng: Spring boot framework, loại bỏ sự cần thiết của việc cấu hình;
+ Dễ dàng triển khai: đóng gói thành file JAR hoặc WAR, tích hợp với Docker và Kubernetes.
+ Phù hợp với kiến trúc Microservices.

