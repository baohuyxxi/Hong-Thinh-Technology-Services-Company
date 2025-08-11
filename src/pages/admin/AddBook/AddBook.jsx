// AddBook.jsx
import "./AddBook.scss";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AdminAPI from "~/services/apis/AdminAPI";
import FramePage from "~/components/FramePage/FramePage";

export default function AddBook() {
  const { classId } = useParams();
  const [bookData, setBookData] = useState({ title: '', author: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    AdminAPI.addBook({ classId, ...bookData }).then((res) => {
  
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  return (
    <FramePage>
      <div className="add-book">
        <div className="add-book__container">
          <h1>Thêm sách</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="book-title">Tên sách</label>
              <input type="text" id="book-title" name="title" value={bookData.title} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="book-author">Tác giả</label>
              <input type="text" id="book-author" name="author" value={bookData.author} onChange={handleChange} />
            </div>
            <button type="submit">Thêm sách</button>
          </form>
        </div>
      </div>
    </FramePage>
  );
}
