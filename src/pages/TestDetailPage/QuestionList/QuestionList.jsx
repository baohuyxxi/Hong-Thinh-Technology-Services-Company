import React from "react";
import "./QuestionList.scss";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import OutlinedFlagSharpIcon from "@mui/icons-material/OutlinedFlagSharp";
import { IconButton } from "@mui/material";
const defaultOptions = ["A", "B", "C", "D"];

const QuestionList = ({
  questions,
  answers,
  onAnswerChoiceChange,
  onAnswerFreeTextChange,
  onFlagToggle,
  flaggedQuestions
}) => {
  const getAnswer = (sentenceNumber) => {
    if (!answers) return null;
    return answers.find((answer) => answer.sentenceNumber === sentenceNumber);
  };

  return (
    <ul className="questions-list">
      {questions.map((question, index) => {
        const userAnswer = getAnswer(question.sentenceNumber);
        const isFlagged = flaggedQuestions.includes(question.sentenceNumber);
        return (
          <li key={index} className="question-item">
            <div className="question-header">
              <p className="question-content">
                Câu {question.sentenceNumber}: {question.content}
              </p>
              <IconButton
                className="question-flag-button"
                onClick={() => onFlagToggle(question.sentenceNumber)}
              >
                <span> Đặt cờ</span>
                {isFlagged ? <FlagRoundedIcon  style={{color:'red'}}/> : <OutlinedFlagSharpIcon />}
              </IconButton>
            </div>

            {question.images &&
              question.images.length &&
              question.images[0] !== "" && (
                <div className="question-images">
                  {question.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt={`Question ${index + 1}`}
                      className="question-image"
                    />
                  ))}
                </div>
              )}
            {question.typeQ === "CHOICE" && (
              <ul className="choice-options">
                {defaultOptions.map((option, idx) => (
                  <li key={idx} className="choice-option">
                    <label>
                      <input
                        type="radio"
                        name={`question_${index}`}
                        checked={
                          userAnswer &&
                          userAnswer.result[0].answer ===
                            (question.answers[idx]?.content || `${option}`)
                        }
                        onChange={() =>
                          onAnswerChoiceChange(
                            question.sentenceNumber,
                            question.answers[idx]?.content || `${option}`
                          )
                        }
                        className="choice-input"
                      />
                      <span className="custom-radio"></span>
                      {question.answers[idx]?.content || `${option}`}
                    </label>
                  </li>
                ))}
                <button
                  className="remove-choice-button"
                  onClick={() =>
                    onAnswerChoiceChange(question.sentenceNumber, null)
                  }
                >
                  Bỏ chọn
                </button>
              </ul>
            )}
            {question.typeQ === "FREETEXT" && (
              <div className="freetext-answers">
                {question.answers.map((answer, idx) => (
                  <div key={idx} className="freetext-answer">
                    <label className="freetext-label">{answer.content}</label>
                    <input
                      type="text"
                      name={`question_${index}_answer_${idx}`}
                      value={userAnswer.result[idx].answer}
                      onChange={(e) =>
                        onAnswerFreeTextChange(
                          question.sentenceNumber,
                          idx,
                          e.target.value
                        )
                      }
                      className="freetext-input"
                    />
                  </div>
                ))}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default QuestionList;
