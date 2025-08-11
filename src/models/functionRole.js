export const getLeftMenuItems = () => [
  { to: "/", text: "Trang chủ" },
  { to: "/introduce", text: "Giới thiệu" },
];

export const getRightMenuItems = () => [
  {
    to: "https://www.facebook.com/BiSteam129",
    text: "Facebook Bi Steam",
    icon: "FacebookOutlinedIcon",
  },
  { to: "/#phone", text: "0123456789", icon: "LocalPhoneIcon" },
];

const commonDropdownMenuItems = [
  { to: "/introduce", text: "Giới thiệu" },
  { to: "/teaching-staff", text: "Đội ngũ giáo viên" },
  { to: "/courses", text: "Khóa học" },
  // { to: "/homework", text: "Bài kiểm tra" },
  // { to: "#z", text: "Toán vui" },
  // { to: "#z", text: "Thi thử" },
  // { to: "/exams", text: "Đề thi" },
  // { to: "#z", text: "Tài liệu" },
  { to: "/#phone", text: "0123456789", icon: "LocalPhoneIcon" },
  {
    to: "/tutorials",
    text: "Hướng dẫn học",
    icon: "IntegrationInstructionsIcon",
  },
];

const commonMenuItems = [
  { to: "/tutorials", text: "Hướng dẫn học" },
  { to: "/teaching-staff", text: "Đội ngũ giáo viên" },
  { to: "/courses", text: "Khóa học" },
  // { to: "#z", text: "Toán vui" },
  // { to: "#z", text: "Thi thử" },
  // { to: "/exams", text: "Đề thi" },
  // { to: "#z", text: "Tài liệu" },
];

const adminDropdownMenuItems = [
  { to: "/admin", text: "Admin Dashboard" },
  { to: "/admin/create-class", text: "Tạo lớp học" },
  { to: "/list-classes", text: "Danh sách lớp học" },
  { to: "/admin/create-teacher", text: "Tạo giáo viên" },
];

const adminMenuItems = [
  { to: "/admin", text: "Admin Dashboard" },
  { to: "/admin/create-class", text: "Tạo lớp học" },
  { to: "/list-classes", text: "Danh sách lớp học" },
  { to: "/admin/create-teacher", text: "Tạo giáo viên" },
  ///admin/create-teacher
];

const teacherDropdownMenuItems = [
  { to: "/my-class-teacher", text: "Lớp học của tôi" },

  // { to: "/list-classes", text: "Danh sách lớp học" },
  //test-management
  // { to: "/test-management", text: "Quản lý đề kiểm tra" },
];

const teacherMenuItems = [
  { to: "/my-class-teacher", text: "Lớp học của tôi" },

  // { to: "/list-classes", text: "Danh sách lớp học" },
  // { to: "/test-management", text: "Quản lý đề kiểm tra" },
];

const studentDropdownMenuItems = [
  { to: "/my-class", text: "Lớp học của tôi" },
  { to: "/homework", text: "Bài kiểm tra" },
  { to: "/courses", text: "Khóa học" },
  { to: "/exams", text: "Đề thi" },

  //my-class
];

const studentMenuItems = [
  { to: "/my-class", text: "Lớp học của tôi" },
  { to: "/homework", text: "Bài kiểm tra" },
  { to: "/courses", text: "Khóa học" },
  { to: "/exams", text: "Đề thi" },
];

export const getDropdownMenuItems = (role) => {
  switch (role) {
    case "ADMIN":
      return adminDropdownMenuItems;
    case "TEACHER":
      return teacherDropdownMenuItems;
    case "STUDENT":
      return studentDropdownMenuItems;
    default:
      return commonDropdownMenuItems;
  }
};

export const getMenuItems = (role) => {
  switch (role) {
    case "ADMIN":
      return adminMenuItems;
    case "TEACHER":
      return teacherMenuItems;
    case "STUDENT":
      return studentMenuItems;
    default:
      return commonMenuItems;
  }
};
