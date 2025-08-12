// src/pages/CreateExam/CreateExam.js
import React, { useState, useEffect } from "react";
import TeacherAPI from "~/services/apis/TeacherAPI";
import FramePage from "~/components/FramePage/FramePage";
import CreateQuestion from "~/components/CreateQuestion/CreateQuestion";
import FormFields from "./FormFields";
import "./CreateExam.scss";
import PublicAPI from "~/services/apis/PublicAPI";
import { ExamDataModel } from "~/models/examDataModel";
import { useParams } from "react-router-dom";
import ExamAPI from "~/services/apis/ExamAPI";
const CreateExam = () => {
  const { classId, examId } = useParams();
  const [examData, setExamData] = useState(ExamDataModel);

  examData.classId = classId;

  useEffect(() => {
    if (examId) {
      ExamAPI.getExam(examId, 1, 100).then((res) => {
        setExamData(res.data);
      });
    }
  }, [examId]);

  const addQuestion = () => {
    setExamData({
      ...examData,
      questions: [
        ...examData.questions,
        {
          sentenceNumber: examData.questions.length + 1,
          typeQ: "CHOICE",
          content: "",
          images: [],
          answers: [{ content: "", correct: "A", point: 0 }],
        },
      ],
    });
  };

  const handleQuestionChange = (index, key, value) => {
   
    const newQuestions = examData.questions.map((question, qIndex) => {
      if (index === qIndex) {
        return { ...question, [key]: value };
      }
      return question;
    });
    if (key === "typeQ") {
      newQuestions[index].answers = [{ content: "", correct: "A", point: 0 }];
    }
    console.log(newQuestions); 
    setExamData({ ...examData, questions: newQuestions });
  };

  const handleAnswerChange = (qIndex, aIndex, key, value) => {
    const newQuestions = examData.questions.map((question, questionIndex) => {
      if (questionIndex === qIndex) {
        const newAnswer = question.answers.map((answer, answerIndex) => {
          if (answerIndex === aIndex) {
            return { ...answer, [key]: value };
          }
          return answer;
        });
        return { ...question, answers: newAnswer };
      }
      return question;
    });
    setExamData({ ...examData, questions: newQuestions });
  };

  const handleAddAnswer = (qIndex, answer) => {
    const newQuestions = examData.questions.map((question, questionIndex) => {
      if (questionIndex === qIndex) {
        return {
          ...question,
          answers: [...question.answers, answer],
        };
      }
      return question;
    });
    setExamData({ ...examData, questions: newQuestions });
  };

  const handleRemoveAnswer = (qIndex, aIndex) => {
    const newQuestions = examData.questions.map((question, questionIndex) => {
      if (questionIndex === qIndex) {
        const updatedAnswers = question.answers.filter(
          (_, answerIndex) => answerIndex !== aIndex
        );
        return { ...question, answers: updatedAnswers };
      }
      return question;
    });
    setExamData({ ...examData, questions: newQuestions });
  };

  const handleRemoveQuestion = (qIndex) => {
    const newQuestions = examData.questions.filter(
      (_, index) => index !== qIndex
    );
    setExamData({ ...examData, questions: newQuestions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (examId) {
      TeacherAPI.editExam(examId, examData);
    } else {
      TeacherAPI.createExam(examData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExamData({ ...examData, [name]: value });
  };

  return (
    <FramePage>
      <div className="create-exam-page">
        <div className="create-exam">
          <h1 className="create-exam__title">
            {examId ? "Chỉnh sửa bài thi" : "Tạo bài thi"}
          </h1>
          <form onSubmit={handleSubmit} className="create-exam__form">
            <FormFields
              examData={examData}
              handleChange={handleChange}
              classId={classId}
            />

            {examData.questions.map((question, qIndex) => (
              <CreateQuestion
                key={qIndex}
                question={question}
                handleQuestionChange={handleQuestionChange}
                handleAnswerChange={handleAnswerChange}
                handleAddAnswer={handleAddAnswer}
                qIndex={qIndex}
                handleRemoveAnswer={handleRemoveAnswer}
                handleRemoveQuestion={handleRemoveQuestion}
              />
            ))}
            <button
              className="create-exam__add-question-button"
              type="button"
              onClick={addQuestion}
            >
              Thêm Câu Hỏi
            </button>
            <button className="create-exam__submit-button" type="submit">
              {examId ? "Cập nhật" : "Tạo mới"}
            </button>
          </form>
        </div>
      </div>
    </FramePage>
  );
};

export default CreateExam;
