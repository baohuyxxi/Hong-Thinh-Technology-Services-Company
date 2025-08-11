import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FramePage from "~/components/FramePage/FramePage";
import StudentAPI from "~/services/apis/StudentAPI";
import { format } from "date-fns";
import { CircularProgress } from "@mui/material";
import "./TestResultsPage.scss";

const TestResultsPage = () => {
  const { testId } = useParams();
  const [loading, setLoading] = useState(true);
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    StudentAPI.getTestFinish(testId)
      .then((res) => {
        setTestResult(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch test results:", error);
        setLoading(false);
      });
  }, [testId]);

  if (loading) {
    return (
      <FramePage>
        <div className="loading">
          <CircularProgress />
        </div>
      </FramePage>
    );
  }

  if (!testResult) {
    return (
      <FramePage>
        <div className="no-data">Không có dữ liệu bài làm.</div>
      </FramePage>
    );
  }

  const {
    name,
    classId,
    createBy,
    startTime,
    endTime,
    answers,
    correct,
    total,
    point,
  } = testResult;

  const getResultColor = (result, isCorrectAnswer) => {
    if (result.correct) {
      return "correct-answer";
    } else if (!result.correct && result.answer) {
      return "incorrect-answer";
    } else if (isCorrectAnswer) {
      return "correct-answer";
    }
    return "";
  };

  return (
    <FramePage>
      <div className="test-results-page">
        <header className="page-header">
          <h1>Chi Tiết Bài Làm</h1>
        </header>
        <section className="test-info">
          <h2 className="test-title">{name}</h2>
          <div className="info-item">
            <span className="info-label">Lớp:</span> {classId.name}
          </div>
          <div className="info-item">
            <span className="info-label">Giáo viên:</span> {createBy.firstName} {createBy.lastName}
          </div>
          <div className="info-item">
            <span className="info-label">Thời gian bắt đầu:</span> {format(new Date(startTime), "dd/MM/yyyy HH:mm:ss")}
          </div>
          <div className="info-item">
            <span className="info-label">Thời gian kết thúc:</span> {format(new Date(endTime), "dd/MM/yyyy HH:mm:ss")}
          </div>
          <div className="info-item">
            <span className="info-label">Số câu đúng:</span> {correct}/{total}
          </div>
          <div className="info-item">
            <span className="info-label">Điểm:</span> {point}
          </div>
        </section>
        <section className="answers-section">
          <h3 className="answers-title">Câu Trả Lời</h3>
          {answers.map((answer) => (
            <div key={answer.sentenceNumber} className="answer-item">
              <h4 className="answer-question">Câu {answer.sentenceNumber}</h4>
              <div className="answer-details">
                <p><strong>Loại câu hỏi:</strong> {answer.typeQ}</p>
                <ul className="answer-results">
                  {answer.result.map((result, index) => (
                    <li key={index} className={`answer-result-item ${getResultColor(result, false)}`}>
                      <p>
                        <strong>Đáp án đã chọn:</strong> {result.answer ? result.answer : "Chưa trả lời"}
                      </p>
                      <p>
                        <strong>Đúng:</strong> {result.correct ? "Có" : "Không"}
                      </p>
                      <p>
                        <strong>Điểm:</strong> {result.point}
                      </p>
                      {!result.correct && result.correctAnswer && (
                        <p className="correct-answer">Đáp án đúng: {result.correctAnswer}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>
      </div>
    </FramePage>
  );
};

export default TestResultsPage;
