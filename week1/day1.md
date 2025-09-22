# Month 1 - 📅 Day 1 - Linux basic - git rebase

## 🔑 Học hôm nay
1. Filesystem Hierarchy Standard (FHS):
- Khái niệm: là một tiêu chuẩn thiết kế các thư mục trong hệ thống các phiên bản hệ điều hành Linux  
=> Mục đích: giúp cho người dùng hệ điều hành có thể phán đoán được nơi lưu trữ các file hay thư mục của mình, hay của các phần mềm được cài đặt
- Cấu trúc bao gồm:
+ /bin: là thư mục chứa những file binaries, tức là những command, cơ bản và thiết yếu của hệ thống;
+ /boot: Chứa tất cả các file cần thiết cho quá trình boot hệ thống;
+ /dev: chứa các device files
+ /etc: tức là các file config cho các phần mềm thuộc về hệ thống hiện tại. Ví dụ như muốn tìm file cấu hình cho nginx thì có thể tìm ở /etc/nginx;
+ /home: là thư mục chứa các file, cũng như personal settings của từng người dùng, các thư mục con bên trong sẽ là các thư mục có tên theo các users của hệ thống.
2. Các lệnh liên quan đến permission trong linux:
- Permission rwx, chmod, chown, umask
3. một số lệnh sử dụng git
- git rebase: Git rebase cho phép bạn chuyển đổi gốc của một nhánh (branch) từ một commit sang commit khác. Khi bạn sử dụng Git Rebase, nó sẽ tạo ra một chuỗi mới của các commit trông giống như bạn đã tạo một nhánh mới từ commit ban đầu

3.1. Thực hành sử dụng git rebase
# Tạo repo mới
mkdir rebase-conflict-test && cd rebase-conflict-test
git init

# Commit A
echo "Hello" > app.txt
git add app.txt
git commit -m "A: init app"

# Commit B trên master
echo "Line from master (B)" >> app.txt
git commit -am "B: add line from master"

# Tạo nhánh feature và commit C (sửa cùng dòng để gây conflict)
git checkout -b feature
echo "Line from feature (C)" > app.txt   # overwrite dòng B
git commit -am "C: add line from feature"

# Commit D trên feature
echo "Another line from feature (D)" >> app.txt
git commit -am "D: add another line from feature"

# Quay về master và thêm commit E (cũng sửa cùng dòng -> gây conflict với C)
git checkout master
echo "Line from master (E)" > app.txt   # overwrite lại dòng
git commit -am "E: modify line from master"

# Thực hiện rebase feature lên master (sẽ conflict ở commit C)
git checkout feature
git rebase master

# ===> Lúc này bạn sẽ thấy conflict trong app.txt
# Mở app.txt, sửa lại theo ý bạn (ví dụ giữ cả hai dòng):
#   Line from master (E) + Line from feature (C)
#   Another line from feature (D)

# Sau khi sửa, chạy:
# git add app.txt
# git rebase --continue

# Nếu commit D cũng conflict, lặp lại resolve + add + --continue


## 📝 Ghi chú cá nhân
- Cần luyện thêm cách sử dụng các tool cho git;
- Thực hành thêm về git rebase --i.