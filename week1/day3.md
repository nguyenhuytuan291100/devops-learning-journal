# Month 1 - 📅 Day 3
## 📌 Nội dung hôm nay
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

2. Spring core
- Khái niệm: Spring boot là 1 framwork của java được xây dựng trên top của spring giúp đơn giản hoá quá trình phát triển ứng dụng. Spring boot đến cùng với máy chủ nhúng.
2.1. Spring boot
- giới thiệu: Spring là một trong những framework phổ biến để xây dựng các ứng dụng, nhưng spring truyền thống yêu cầu file cấu hình XML lớn vì vậy spring boot ra đời để khắc phục vấn đề này;
- Một số tính năng chính:
+ Tự động cấu hình: Tự động cấu hình các components dựa trên các dependencies, không cần các file cấu hình thủ công XML;
+ Dễ dàng bảo trì và tạo REST endpoints bằng việc sử dụng các annotation: @RestController, @GetMapping and @PostMapping;
+ Máy chủ Tomcat nhúng: Spring boot framework, loại bỏ sự cần thiết của việc cấu hình;
+ Dễ dàng triển khai: đóng gói thành file JAR hoặc WAR, tích hợp với Docker và Kubernetes.
+ Phù hợp với kiến trúc Microservices.
2.2. IOC (Inversion of Control)
- Spring IOC là core của Spring framework, tạo và quản lý các object(beans), tiêm vào các phụ thuộc và quản lý vòng đời của chúng.
- Có 2 loại: Bean factory và ApplicationContext;
- Lợi ích của IoC container:
+ Dependency Injection: Tự động bơm phụ thuộc vào class;
+ Lifecycle Management: Quản lý vòng đời của Bean, bao gồm khởi tạo, xóa;
+ Configuration Flexibility: Cấu hình linh hoạt;
+ Loose Coupling: Thúc đẩy khớp nối lỏng lẻo.
2.3. Spring dependency Injection with Example
- Khái niệm: DI là 1 loại thiết kế khi các đối tượng nhận được các phụ thuộc của họ từ nguồn phía ngoài hơn việc tạo ở bên trong. giúp cho việc làm lỏng khớp nối, dễ test, dễ bảo trì code.
- Có 2 kiểu của Tiêm phụ thuộc trong Spring: Setter Dependency Injection và Constructor Dependency Injection.

3. Spring boot core feature
3.1. Spring boot - Architecture
- giới thiệu: Spring boot gồm 4 lớp: Presentation <-> Business <-> Persistence <-> Database
3.2. Spring boot - Annotations
- @SpringBootApplication: Đây là annotation được dùng để đánh dấu class chính của Ứng dụng spring boot, gói gọn cả 4 annotations: @SpringBootApplication(chỉ ra rằng lớp này cung cấp các cấu hình cho ứng dụng spring boot), @EnableAutoConfiguration(Tự động cấu hình các beans), @ComponentScan cùng với thuộc tính mặc định của chúng.
3.3. Application Properties
- Spring boot cung cấp 1 cách linh hoạt cho việc cấu hình các cài đặt của ứng dụng sử dụng application.properties or application.yml file.
3.4. Spring boot actuator
- Spring boot actuator là một module đi kèm Spring boot, cung cấp sẵn các endpoints giám sát và quản lý ứng dụng khi đang chạy. Nói cách khác, Actuator giúp bạn dễ dàng theo dõi tình trạng và hiệu năng của ứng dụng mà không cần phải tự viết thêm nhiều code.

4. Spring boot with restAPI
4.1. RestController annotation:
- Rest controller trong dự án spring boot là một lớp đặc biệt được dùng để định nghĩa RESTful web services, được đánh dấu bởi @RestController

5. Spring boot microservices
- Khái niệm: Microservices là một kiến trúc khi ứng dụng được chia thành các service nhỏ, độc lập. Các service này giao tiếp với nhau qua APIs. Các service có thể deployed độc lập. Kiến trúc này khiến cho ứng dụng dễ mở rộng, tin cậy và dễ cho việc bảo trì.
- Thuộc tính của Ứng dụng:
+ Tính module hóa;
+ Tính độc lập: Các service có thể được phát triển bằng các ngôn ngữ khác nhau; Khi 1 service chết thì sẽ không ảnh hưởng đến các service khác;
+ Tính mở rộng: Service độc lập có thể mở rộng độc lập dựa trên yêu cầu;
+ Tính linh hoạt: Các service có thể sửa đổi, cập nhật và thay thế 1 cách độc lập.
