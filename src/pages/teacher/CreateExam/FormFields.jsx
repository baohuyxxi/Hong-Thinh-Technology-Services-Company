// src/components/FormFields/FormFields.js
import React, { useEffect, useState } from "react";
import PublicAPI from "~/services/apis/PublicAPI";
import BookAPI from "~/services/apis/BookAPI";

const FormFields = ({ examData, handleChange, classId }) => {
  const [books, setBooks] = useState([]);
  const [chapters, setChapterSelected] = useState([]);
  useEffect(() => {
    PublicAPI.getOneClass(classId).then((res) => {
      setBooks(res.data.books);
    });
  }, [classId]);

  useEffect(() => {
    if (examData.bookId) {
      BookAPI.getBook(examData.bookId).then((res) => {
        const chapters = res.data.map((chapter) => ({
          value: chapter._id,
          text: chapter.name,
        }));
        setChapterSelected(chapters);
      });
    }
  }, [examData.bookId]);

  const selectedBook = books.map((book) => ({
    value: book._id,
    text: book.name,
  }));

  return (
    <div className="row">
      {[
        {
          id: "type",
          label: "Loại Đề Thi",
          type: "select",
          options: [
            { value: "EXAM", text: "Đề Thi" },
            { value: "TEST", text: "Bài Kiểm Tra" },
            { value: "LESSON", text: "Bài Học" },
          ],
        },
        {
          id: "numberOfAttempts",
          label: "Số lần thực hiện",
          type: "number",
          min: 1,
        },
        { id: "name", label: "Tên Đề Thi", type: "text" },

        {
          id: "startTime",
          label: "Thời Gian Bắt Đầu",
          type: "datetime-local",
        },
        {
          id: "endTime",
          label: "Thời Gian Kết Thúc",
          type: "datetime-local",
        },
        { id: "time", label: "Thời Gian", type: "number", min: 1 },
        { id: "description", label: "Mô Tả", type: "textarea" },
        ...(examData.type === "LESSON"
          ? [
              {
                id: "bookId",
                label: "Book",
                type: "select",
                options: selectedBook,
              },
              {
                id: "chapterId",
                label: "Chapter",
                type: "select",
                options: chapters,
              },
            ]
          : []),
      ].map(({ id, label, type, options, ...rest }) => (
        <div
          key={id}
          className={`create-exam__form-group ${"col l-4 m-6 c-12"}`}
        >
          <label className="create-exam__label" htmlFor={id}>
            {label}
          </label>
          {type === "select" ? (
            <select
              className="create-exam__select"
              id={id}
              name={id}
              value={examData[id]}
              onChange={handleChange}
            >
              {options.map((opt) => (
                <option key={opt.value || opt._id} value={opt.value || opt._id}>
                  {opt.text || opt.name}
                </option>
              ))}
            </select>
          ) : type === "textarea" ? (
            <textarea
              className="create-exam__textarea"
              id={id}
              name={id}
              value={examData[id]}
              onChange={handleChange}
            />
          ) : (
            <input
              className="create-exam__input"
              type={type}
              id={id}
              name={id}
              min={rest.min || null}
              value={examData[id]}
              onChange={handleChange}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default FormFields;
