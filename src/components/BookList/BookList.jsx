// BookList.jsx
import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const BookList = ({ books, handleEditCellChange , loading}) => {
  const bookColumns = [
    { field: "name", headerName: "Tên sách", width: 200, editable: true },
    {
      field: "description",
      headerName: "Mô tả sách",
      width: 300, editable: true,
    },
    { field: "type", headerName: "Loại sách", width: 150, editable: true },
    {
      field: "actions",
      headerName: "Hành động",
      width: 150,
      renderCell: (params) => (
        <button
          onClick={() => handleEditCellChange(params.row)}
          className="edit-class__button"
        >
          Sửa
        </button>
      ),
    },
  ];

  return (
    <div className="edit-class__books">
      <h2 className="edit-class__subtitle">Danh sách sách</h2>
      <DataGrid
        rows={books.map((book, index) => ({
          id: index,
          ...book,
        }))}
        loading={loading}
        columns={bookColumns}
        autoHeight
        disableSelectionOnClick
        onCellEditCommit={handleEditCellChange}
      />
    </div>
  );
};

export default BookList;
