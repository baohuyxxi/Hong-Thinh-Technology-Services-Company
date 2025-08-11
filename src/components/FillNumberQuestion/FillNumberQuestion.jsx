import React from "react";
import "./FillNumberQuestion.scss";

const FillNumberQuestion = ({
  question,
  handleQuestionChange,
  handleAnswerChange,
  handleAddAnswer,
  qIndex,
}) => {
  return (
    <>
      {question.answers.map((answer, aIndex) => (
        <div key={aIndex} className="fill-number-answer-group">
          <input
            className="fill-number-answer-input"
            type="text"
            placeholder="Câu hỏi"
            value={answer.content}
            onChange={(e) =>
              handleAnswerChange(qIndex, aIndex, "content", e.target.value)
            }
          />
          <input
            className="fill-number-correct-input"
            type="text"
            placeholder="Đáp án đúng"
            value={answer.correct}
            onChange={(e) =>
              handleAnswerChange(qIndex, aIndex, "correct", e.target.value)
            }
          />
          <input
            className="fill-number-image-input"
            type="text"
            placeholder="URL hình ảnh (nếu có)"
            value={answer.image}
            onChange={(e) =>
              handleAnswerChange(qIndex, aIndex, "image", e.target.value)
            }
          />
          <input
            className="fill-number-point-input"
            type="number"
            placeholder="Điểm"
            value={answer.point}
            onChange={(e) =>
              handleAnswerChange(qIndex, aIndex, "point", e.target.value)
            }
          />
        </div>
      ))}
      <button
        className="fill-number-add-answer-button"
        type="button"
        onClick={() =>
          handleAddAnswer(qIndex, {
            content: "",
            image: "",
            correct: "",
            point: 0,
          })
        }
      >
        Thêm Câu Trả Lời
      </button>
    </>
  );
};

export default FillNumberQuestion;
