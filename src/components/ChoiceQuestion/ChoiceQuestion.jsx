import React from "react";
import "./ChoiceQuestion.scss";

const ChoiceQuestion = ({ question, handleQuestionChange, qIndex }) => {
  const handleCorrectChange = (e) => {
    const correctAnswer = e.target.value;
    const newAnswers = question.answers.map((answer, index) => ({
      ...answer,
      correct: correctAnswer,
    }));
    handleQuestionChange(qIndex, "answers", newAnswers);
  };

  return (
    <div className="choice-question__correct-answer" key={qIndex}>
      <select
        value={question.answers[0].correct}
        onChange={handleCorrectChange}
      >
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
      </select>
    </div>
  );
};

export default ChoiceQuestion;
