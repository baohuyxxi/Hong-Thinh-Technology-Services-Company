import "./ListExamTeacherPage.scss";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FramePage from "~/components/FramePage/FramePage";
import ExamAPI from "~/services/apis/ExamAPI";
import Button from "@mui/material/Button";
import DialogLoading from "~/components/DialogLoading/DialogLoading";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function ListExamTeacherPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    ExamAPI.getListExam()
      .then((res) => {
        console.log(res.data);
        setExams(res.data.listExams); // Assuming the response data contains the list of exams
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleCreateExam = () => {
    navigate("create-exam");
  };

  if (loading) {
    return <DialogLoading />;
  }

  return (

      <div className="list-exam-teacher-page">
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateExam}
          className="create-exam-button"
        >
          <AddCircleOutlineIcon />
          Tạo mới
        </Button>
        {/* Render the list of exams here */}
        <div className="exam-list">
          {exams?.map((exam) => (
            <div key={exam?._id} className="exam-item">
              {/* Render exam details */}
              <p>{exam?.name}</p>
            </div>
          ))}
        </div>
      </div>

  );
}
