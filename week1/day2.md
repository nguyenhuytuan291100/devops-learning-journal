# Month 1 - 📅 Day 2 
## 📌 Nội dung hôm nay
- Mô hình dữ liệu quan hệ cơ bản;
- Nguyên tắc SOLID;
- Spring boot cơ bản;
- JWT Auth.

## 🔑 Học hôm nay
1. Thiết kế database:
1.1. Kiến thức cơ bản về database:
- Database, Relational và NoSql:
+ Database: Nơi lưu và truy suất dữ liệu có tổ chức;
+ Relational Database: Dữ liệu được tổ chức thành quan hệ, tương ứng với bảng, mỗi bảng có các cột, hàng, các bảng liên kết với nhau qua khóa (khóa chính và khóa ngoại), dùng SQL (Structure query language) để thao tác dữ liệu;
+ NoSQL database: Là cơ sở dữ liệu phi quan hệ, xuất hiện khi xảy ra vấn đề dữ liệu khổng lồ, thay đổi liên tục, cần phân tán nhiều trên server. Ví dụ về cơ sở dữ liệu phi quan hệ: Key-value store, Document store, Column family store, Graph db.
- SQL cơ bản:
+ Table: là 1 cấu trúc lưu trữ dữ liệu;
+ Row/Record: Một dòng dữ liệu;
+ Column: Thuộc tính;
+ Primary key: Khóa chính của dữ liệu, là định danh duy nhất cho mỗi row;
+ Foreign key: Khóa ngoại, tham chiếu đến Primary key của bảng khác.
+ Các câu lệnh cơ bản: SELECT, INSERT, UPDATE, DELETE
1.2. Chuẩn hóa dữ liệu:
- Khái niệm: Là quá trình tổ chức dữ liệu trong cơ sở dữ liệu quan hệ nhằm:
+ giảm sự trùng lặp dữ liệu;
+ Đảm bảo tính toàn vẹn dữ liệu;
+ giúp việc thêm sửa xóa dữ liệu không gây ra bất thường.
- các dạng chuẩn hóa: 
+ 1NF: Dạng chuẩn 1 cần thỏa mãn: Mỗi ô thuộc tính chỉ chứa giá trị nguyên tố, không được chứa danh sách hoặc tập hợp, không có cột lặp;
💡 **Ví dụ:**: bảng Sinh viên có 2 trường: 
Sinh viên	Môn học
   An	    Toán, Lý, Hóa
Bảng trên vi phạm 1 NF vì cột môn học chứa nhiều giá trị => Tách ra thành 03 bản ghi
+ 2NF: Dạng chuẩn 2 cần thỏa mãn: Thỏa mãn dạng chuẩn 1 NF, Mọi thuộc tính không khóa phải phụ thuộc toàn bộ vào khóa chính (Không được phụ thuộc vào 1 phần của khóa, ví dụ như nếu có 2 khóa chính)
💡 **Ví dụ:**: 
MãSV	MãMH	TênSV	NgàySinh	TênMH	SốTC	Điểm
SV01	MH01	Nguyễn An	01-01-2000	CSDL	3	8.0
SV01	MH02	Nguyễn An	01-01-2000	Mạng MT	3	7.5
SV02	MH01	Lê Bình	05-03-2001	CSDL	3	9.0
Bảng trên vi phạm nguyên tắc do TênSV, Ngày sinh chỉ phụ thuộc vào MãSV; TênMH và Số TC phụ thuộc vào MãMH; Điểm phụ thuộc vào 2 khóa là MãSV và MãMH
=> Xảy ra vấn đề: Dư thừa dữ liệu (do thông tin thừa lặp lại ở nhiều dòng), Lỗi khi cập nhật (Nếu phải đổi tên thì cần đổi ở tất cả các dòng); Lỗi khi xóa dữ liệu (Nếu xóa tất cả các môn học mà SV02 đăng ký thì mất luôn thông tin sinh viên Lê Bình)
=> giải pháp là tách thành 3 bảng: SINHVIEN(MãSV, TênSV, NgàySinh); MonHoc(MãMH, TênMH, SốTC); DangKy(MãSV, MãMH, Điểm)
+3NF: Dạng chuẩn 3 NF cần thỏa mãn: Thỏa mãn 2 NF, Không tồn tại phụ thuộc bắc cầu (Không có một thuộc tính ko khóa nào phụ thuộc tới 1 thuộc tính không khóa khác).
💡 **Ví dụ:**:
Bảng SinhVien:
MãSV	TênSV	    MãKhoa	 TênKhoa
SV01	Nguyễn An	CNTT	 Công nghệ TT
SV02	Lê Bình	    QTKD	 Quản trị KD
Nguyên tắc tách: Nếu thấy có phụ thuộc dạng 𝑋→𝑌: X→Y và 𝑌→𝑍: Y→Z (Z là thuộc tính không khóa),
→ Z phụ thuộc bắc cầu vào X → tách bảng
+ BCNF: là một dạng chuẩn chặt chẽ hơn 3NF, thỏa mãn điều kiện: khi đã ở 3NF, với mọi phụ thuộc hàm X→Y thì X phải là siêu khóa, superkey.

2. Nguyên tắc SOLID
2.1. Single responsibility princible
- Nội dung: 1 class chỉ nên giữ một trách nhiệm duy nhất.
Ví dụ: public class ReportManager()
{
   public void ReadDataFromDB();
   public void ProcessData();
   public void PrintReport();
}
Class trên thực hiện 3 chức năng, khi thay đổi 1 trong 3 chức năng trên thì sẽ phải thay đổi lại class này, càng về sau, class sẽ càng bị phình to ra.
=> sửa lại thành như sau
// Lớp chịu trách nhiệm đọc dữ liệu từ DB
public class DataReader
{
    public void ReadDataFromDB()
    {
        // Code đọc dữ liệu từ DB
    }
}

// Lớp chịu trách nhiệm xử lý dữ liệu
public class DataProcessor
{
    public void ProcessData()
    {
        // Code xử lý dữ liệu
    }
}

// Lớp chịu trách nhiệm in báo cáo
public class ReportPrinter
{
    public void PrintReport()
    {
        // Code in báo cáo
    }
}

// Lớp quản lý, phối hợp các chức năng trên
public class ReportManager
{
    private readonly DataReader _reader;
    private readonly DataProcessor _processor;
    private readonly ReportPrinter _printer;

    public ReportManager(DataReader reader, DataProcessor processor, ReportPrinter printer)
    {
        _reader = reader;
        _processor = processor;
        _printer = printer;
    }

    public void GenerateReport()
    {
        _reader.ReadDataFromDB();
        _processor.ProcessData();
        _printer.PrintReport();
    }
}
2.2. Open/Closed principle
- Nội dung: Không được sửa đổi 1 class có sẵn, nhưng có thể mở rộng bằng cách kế thừa
Ví dụ: 
class ConnectionManager
{
    public function doConnection(Object $connection)
    {
        if($connection instanceof SqlServer) {
            //connect with SqlServer
        } elseif($connection instanceof MySql) {
            //connect with MySql
        }
    }
}
Trong ví dụ trên, nếu yêu cầu phải kết nối đến 1 vài cơ sở dữ liệu khác
=> Áp dụng nguyên tắc, cần phải thiết kế lại sử dụng lớp trừu tượng
abstract class Connection()
{
        public abstract function doConnect();
}

class SqlServer extends Connection
{
    public function doConnect()
    {
        //connect with SqlServer
    }
}

class MySql extends Connection
{
    public function doConnect()
    {
        //connect with MySql
    }
}

class ConnectionManager
{
    public function doConnection(Connection $connection)
    {
        //something
        //.................
        //connection
        $connection->doConnect();
    }
}

2.3. Liskov substitution principle
- Nội dung: Trong một chương trình, các object của class con có thể thay thế class cha mà không làm thay đổi tính đúng đắn của chương trình.
- Ví dụ: 
interface IShape {
    int Area();
}

class Rectangle : IShape {
    public int Width { get; set; }
    public int Height { get; set; }

    public int Area() {
        return Width * Height;
    }
}

class Square : IShape {
    public int Side { get; set; }

    public int Area() {
        return Side * Side;
    }
}
IShape shape1 = new Rectangle { Width = 5, Height = 10 };
IShape shape2 = new Square { Side = 5 };

Console.WriteLine(shape1.Area()); // 50
Console.WriteLine(shape2.Area()); // 25

=> Nguyên tắc này nhấn mạnh: Class con không được phá vỡ logic hay kỳ vọng từ class cha

2.4. Interface Segregation Principle
- Nội dung: Thay vì dùng 1 interface lớn, ta nên tách thành nhiều interface nhỏ, với nhiều mục đích cụ thể
import java.util.*;

// Interface for vegetarian menu
interface IVegetarianMenu {
    List<String> getVegetarianItems();
}

// Interface for non-vegetarian menu
interface INonVegetarianMenu {
    List<String> getNonVegetarianItems();
}

// Interface for drinks menu
interface IDrinkMenu {
    List<String> getDrinkItems();
}

2.5. Dependency Inversion Principle (DIP)
- Nội dung: Các module cấp cao không phụ thuộc trực tiếp vào các module cấp thấp. Cả 2 nên phụ thuộc vào các abtraction.
- ví dụ:
// Abstraction (interface)
interface NotificationService {
    void send(String message);
}

// Cài đặt cụ thể 1: Email
class EmailService implements NotificationService {
    @Override
    public void send(String message) {
        System.out.println("Sending email: " + message);
    }
}

// Cài đặt cụ thể 2: SMS
class SMSService implements NotificationService {
    @Override
    public void send(String message) {
        System.out.println("Sending SMS: " + message);
    }
}

// Module cấp cao chỉ phụ thuộc vào abstraction
class UserService {
    private NotificationService notificationService;

    // Inject dependency qua constructor
    public UserService(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    public void registerUser(String username) {
        System.out.println("Registering user: " + username);
        notificationService.send("Welcome " + username + "!");
    }
}

public class Main {
    public static void main(String[] args) {
        // Dùng Email
        NotificationService email = new EmailService();
        UserService service1 = new UserService(email);
        service1.registerUser("Alice");

        // Dùng SMS
        NotificationService sms = new SMSService();
        UserService service2 = new UserService(sms);
        service2.registerUser("Bob");
    }
}
=> Trong ví dụ trên:
- UserService không phụ thuộc trực tiếp vào Email hay SMS → dễ dàng mở rộng thêm nhiều loại thông báo khác;
- Dễ dàng test → ta có thể mock NotificationService khi viết unit test;
- Code linh hoạt, dễ bảo trì, đúng tinh thần của SOLID.