import "./Exams.scss";
import React, { useEffect, useState } from "react";
import Table from "@mui/joy/Table";
import FramePage from "~/components/FramePage/FramePage";
import TestAPI from "~/services/apis/TestAPI";
import { useSnackbar } from "notistack";
import DialogLoading from "~/components/DialogLoading/DialogLoading";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Exams() {
  const [examsData, setExamsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const data = await TestAPI.getAllTestOfExam("666c3ce591a4c9226af9ddc1");
        setExamsData(data.data); // Assuming the API returns an object with a 'data' property
      } catch (error) {
        enqueueSnackbar("Failed to load exams data", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [enqueueSnackbar]);

  const handleViewDetails = (examId) => {
    navigate(`/exam/${examId}`); // Navigate to the exam details page
  };

  if (loading) {
    return <DialogLoading />;
  }

  return (
    <FramePage>
      {examsData.map((exam, index) => (
        <div className="exams" key={exam._id}>
          <div className="exams__title">Đề thi: {exam.examId.name}</div>
          <div className="exams__content">
            <Table
              variant="soft"
              borderAxis="bothBetween"
              className="exams__content__table"
            >
              <thead>
                <tr>
                  <th
                    style={{ width: "40%" }}
                    className="exams__content__table__header"
                  >
                    Đề thi
                  </th>
                  <th className="exams__content__table__header">Thời gian bắt đầu</th>
                  <th className="exams__content__table__header">Thời gian kết thúc</th>
                  <th className="exams__content__table__header">Điểm</th>
                  <th className="exams__content__table__header">Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{exam.examId.name}</td>
                  <td>{new Date(exam.startTime).toLocaleString()}</td>
                  <td>{new Date(exam.endTime).toLocaleString()}</td>
                  <td>{exam.point}</td>
                  <td>
                    <button onClick={() => handleViewDetails(exam.examId._id)}>
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      ))}
    </FramePage>
  );
}
