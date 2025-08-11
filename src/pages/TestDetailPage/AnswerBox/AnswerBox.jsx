import React from "react";
import "./AnswerBox.scss";

const AnswerBox = ({
  answers,
  handleQuestionClick,
  handleSubmit,
  flaggedQuestions,
}) => {
  const answeredAnswers = (answer) => {
    if (answer.typeQ === "CHOICE") {
      if (answer.result[0].answer !== null) {
        return true;
      }
    } else if (answer.typeQ === "FREETEXT") {
      return answer.result.some((item) => item.answer !== null);
    }
    return false;
  };

  const isFlagged = (sentenceNumber) => {
    return flaggedQuestions.includes(sentenceNumber);
  };

  return (
    <div className="answer-box">
      <h3>Câu trả lời đã chọn</h3>
      <ul className="answer-list">
        {answers.map((answer, index) => (
          <li
            key={index}
            className={`answer-item${
              answeredAnswers(answer) ? "-answered" : ""
            }${isFlagged(answer.sentenceNumber) ? " flagged" : ""}`}
          >
            <button onClick={() => handleQuestionClick(answer.sentenceNumber)}>
              Câu {answer.sentenceNumber}
              {isFlagged(answer.sentenceNumber) && (
                <span className="flag-icon">🚩</span>
              )}
            </button>
          </li>
        ))}
      </ul>
      <button className="submit-button" onClick={handleSubmit}>
        Nộp bài
      </button>
    </div>
  );
};

export default AnswerBox;
