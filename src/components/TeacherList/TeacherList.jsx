// TeacherList.jsx
import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const TeacherList = ({
  teachers,
  listTeachers,
  handleRemoveTeacher,
  handleAddTeacher,
  loading,
}) => {
  const teacherColumns = [
    { field: "firstName", headerName: "Họ", width: 150 },
    { field: "lastName", headerName: "Tên", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Số điện thoại", width: 150 },
    {
      field: "actions",
      headerName: "Hành động",
      width: 150,
      renderCell: (params) => (
        <button
          onClick={() => handleRemoveTeacher(params.row._id)}
          className="edit-class__button"
        >
          Xóa
        </button>
      ),
    },
  ];

  return (
    <div className="edit-class__teachers">
      <h2 className="edit-class__subtitle">Danh sách giáo viên</h2>
      <DataGrid
        rows={teachers.map((teacher) => ({
          id: teacher._id,
          ...teacher,
        }))}
        columns={teacherColumns}
        autoHeight
        disableSelectionOnClick
        loading={loading}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddTeacher(e.target.elements.teacherId.value);
        }}
        className="edit-class__form"
      >
        <select name="teacherId" className="edit-class__input">
          <option value="">Chọn giáo viên</option>
          {listTeachers.map((teacher) => (
            <option key={teacher._id} value={teacher._id}>
              {teacher.firstName} {teacher.lastName}
            </option>
          ))}
        </select>
        <button type="submit" className="edit-class__button">
          Thêm giáo viên
        </button>
      </form>
    </div>
  );
};

export default TeacherList;
