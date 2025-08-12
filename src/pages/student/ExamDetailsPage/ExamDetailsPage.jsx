import './ExamDetailsPage.scss';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FramePage from '~/components/FramePage/FramePage';
import ExamAPI from '~/services/apis/ExamAPI';
import DialogLoading from '~/components/DialogLoading/DialogLoading';

export default function ExamDetailsPage() {
  const { examId } = useParams();
  const [loading, setLoading] = useState(true);
  const [exam, setExam] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        setLoading(true);
        const response = await ExamAPI.getExam(examId);
        setExam(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [examId]);

  if (loading) {
    return (
      <FramePage>
        <DialogLoading />
      </FramePage>
    );
  }

  if (error) {
    return (
      <FramePage>
        <div>Error: {error.message}</div>
      </FramePage>
    );
  }

  if (!exam) {
    return (
      <FramePage>
        <div>No exam found</div>
      </FramePage>
    );
  }

  return (
    <FramePage>
      <div className="exam-details-page">
        <h1>{exam.name}</h1>
        <p>{exam.description}</p>
        <p>Time: {exam.time} minutes</p>
        <p>Start Time: {new Date(exam.startTime).toLocaleString()}</p>
        <p>End Time: {new Date(exam.endTime).toLocaleString()}</p>
        <h2>Questions</h2>
        <ul>
          {exam.questions.map((question, index) => (
            <li key={index}>
              <p>Câu {question.sentenceNumber}: {question.content}</p>
              {question.images && question.images.length && question.images[0] !== "" && (
                <div>
                  {question.images.map((image, imgIndex) => (
                    <img key={imgIndex} src={image} alt={`Question ${index + 1}`} />
                  ))}
                </div>
              )}
              <ul>
                {question.answers.map((answer, idx) => (
                  <li key={idx}>
                    {answer.content} 
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </FramePage>
  );
}
