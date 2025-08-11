import React from "react";
import "./FreeTextQuestion.scss";

const FreeTextQuestion = ({
  question,
  handleQuestionChange,
  handleAnswerChange,
  handleAddAnswer,
  handleRemoveAnswer,
  qIndex,
}) => {
  return (
    <>
      {question.answers.map((answer, aIndex) => (
        <div key={aIndex} className="free-text-answer-group row">
          <div className=" col l-6 m-6 c-12">
            <textarea
              className="free-text-answer-input"
              placeholder="Câu hỏi. VD: 1 + 1 = ?"
              value={answer.content}
              onChange={(e) =>
                handleAnswerChange(qIndex, aIndex, "content", e.target.value)
              }
            />
          </div>
          <div className=" col l-6 m-6 c-8">
            <input
              className="free-text-correct-input"
              type="text"
              placeholder="Đáp án đúng"
              value={answer.correct}
              onChange={(e) =>
                handleAnswerChange(qIndex, aIndex, "correct", e.target.value)
              }
            />
          </div>
          {/* <div className="  col l-2 m-2 c-4">
            <input
              className="free-text-point-input"
              type="number"
              placeholder="Điểm"
              value={answer.point}
              onChange={(e) =>
                handleAnswerChange(qIndex, aIndex, "point", e.target.value)
              }
            />
          </div> */}
          <button
            className="free-text-remove-answer-button"
            type="button"
            onClick={() => handleRemoveAnswer(qIndex, aIndex)}
          >
            Xóa
          </button>
        </div>
      ))}
      <button
        className="free-text-add-answer-button"
        type="button"
        onClick={() =>
          handleAddAnswer(qIndex, {
            content: "",
            correct: "",
            point: 1,
          })
        }
      >
        Thêm Câu Trả Lời
      </button>
    </>
  );
};

export default FreeTextQuestion;
