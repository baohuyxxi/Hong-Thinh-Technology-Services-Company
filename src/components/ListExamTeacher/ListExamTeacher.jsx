// src/components/ListExamTeacher/ListExamTeacher.js
import "./ListExamTeacher.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TeacherAPI from "~/services/apis/TeacherAPI";
import Button from "@mui/material/Button";
import DialogLoading from "~/components/DialogLoading/DialogLoading";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";

export default function ListExamTeacher({ classId }) {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    TeacherAPI.getListExamByCreater(classId)
      .then((res) => {
        setExams(res.data.listExams);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [classId]);

  const handleCreateExam = () => {
    navigate(`/my-class-teacher/${classId}/create-test`);
  };

  const handleEditExam = (examId) => {
    navigate(`/my-class-teacher/${classId}/edit-test/${examId}`);
  };

  if (loading) {
    return <DialogLoading />;
  }

  return (
    <div className="list-exam-teacher">
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateExam}
        className="create-exam-button"
      >
        <AddCircleOutlineIcon />
        Tạo mới
      </Button>
      <div className="exam-list">
        {exams.map((exam) => (
          <div key={exam._id} className="exam-item">
            <div className="exam-item__info">
              <div className="exam-item__left">
                <h3 className="exam-item__name">{exam.name}</h3>
                <p className="exam-item__description">{exam.description}</p>
                <p className="exam-item__time">Thời gian: {exam.time} phút</p>
              </div>
              <div className="exam-item__right">
                <p className="exam-item__quantity">Số lượng: {exam.quantity}</p>
                <p className="exam-item__view">Lượt xem: {exam.view}</p>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleEditExam(exam._id)}
                  className="exam-item__edit-button"
                >
                  <EditIcon />
                  Chỉnh sửa
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
