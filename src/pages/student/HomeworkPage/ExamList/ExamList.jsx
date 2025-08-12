import './ExamList.scss';
import React from "react";
import ExamItem from "../ExamItem/ExamItem";

const ExamList = ({ exams, onViewDetails, onContinueTest }) => (
  <ul>
    {exams.length === 0 ? (
      <p className="no-exams">Không có bài tập nào.</p>
    ) : (
      exams.map((exam) => (
        <ExamItem
          key={exam._id}
          exam={exam}
          onViewDetails={onViewDetails}
          onContinueTest={onContinueTest}
        />
      ))
    )}
  </ul>
);

export default ExamList;
