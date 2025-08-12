import "./ExamItem.scss";
import React from "react";
import { format } from "date-fns";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

export default function ExamItem({ exam, onViewDetails, onContinueTest }) {
  const navigate = useNavigate();

  const onViewResults = (testId) => {
    navigate(`/test-results/${testId}`);
  };

  return (
    <li className="exam-item" key={exam._id}>
      <h2>{exam.name}</h2>
      <p>{exam.description}</p>
      <p>Thời gian thực hiện: {exam.time} phút</p>
      <p>
        Thời gian bắt đầu: {format(new Date(exam.startTime), "hh:mm:ss a")} ngày{" "}
        {format(new Date(exam.startTime), "dd/MM/yyyy")}
      </p>
      <p>
        Thời gian kết thúc: {format(new Date(exam.endTime), "hh:mm:ss a")} ngày{" "}
        {format(new Date(exam.endTime), "dd/MM/yyyy")}
      </p>
      <p>Số lần được phép thực hiện: {exam.numberOfAttempts}</p>
      {renderButton(exam, onViewDetails, onContinueTest)}

      {exam.listTest && exam.listTest.length > 0 && (
        <Accordion className="exam-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${exam._id}-content`}
            id={`panel-${exam._id}-header`}
          >
            <div className="exam-summary">
              <h3>Kết quả làm bài trước đó</h3>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div className="test-results">
              <ul>
                {exam.listTest.map((test) => (
                  <li key={test._id}>
                    <p>
                      Thời gian:{" "}
                      {format(new Date(test.startTime), "hh:mm:ss a")} -{" "}
                      {format(new Date(test.endTime), "hh:mm:ss a")} ngày{" "}
                      {format(new Date(test.endTime), "dd/MM/yyyy")}
                    </p>
                    <p>
                      Số câu đúng: {test.correct}/{test.total}
                    </p>
                    <p>Điểm: {test.point}</p>
                    <button
                      className="btn-view-details"
                      onClick={(e) => onViewResults(test._id)}
                    >
                      Xem chi tiết
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </AccordionDetails>
        </Accordion>
      )}
    </li>
  );
}

const renderButton = (exam, onViewDetails, onContinueTest) => {
  switch (exam.statusTest) {
    case "NONE":
      return (
        <button className="btn-action" onClick={() => onViewDetails(exam._id)}>
          Thực hiện
        </button>
      );
    case "END":
      return (
        <button className="btn-action" disabled>
          Đã hoàn thành
        </button>
      );
    case "PENDING":
      return (
        <button
          className="btn-action"
          onClick={() => onContinueTest(exam._id, exam.listTest)}
        >
          Tiếp tục thực hiện
        </button>
      );
    default:
      return null;
  }
};
