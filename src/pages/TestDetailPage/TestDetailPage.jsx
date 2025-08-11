import "./TestDetailPage.scss";
import React, { useEffect, useState } from "react";
import ExamAPI from "~/services/apis/ExamAPI";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import DialogLoading from "~/components/DialogLoading/DialogLoading";
import FramePage from "~/components/FramePage/FramePage";
import TestHeader from "./TestHeader/TestHeader";
import CountdownTimer from "./CountdownTimer/CountdownTimer";
import QuestionList from "./QuestionList/QuestionList";
import Pagination from "./Pagination/Pagination";
import AnswerBox from "./AnswerBox/AnswerBox";
import { testMetaData } from "~/models/testMetaData";

export default function TestDetailPage() {
  const { examID } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idTest = searchParams.get("idTest");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [metaData, setMetaData] = useState(testMetaData);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [flaggedQuestions, setFlaggedQuestions] = useState(
    JSON.parse(localStorage.getItem(`flaggedQuestions${idTest}`)) || []
  );
  const limit = 2;
  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const resExam = await ExamAPI.getExam(examID, 1, limit);
        const tempMeta = Object.keys(testMetaData).reduce((obj, key) => {
          if (key in resExam.data) obj[key] = resExam.data[key];
          return obj;
        }, {});
        const resAnswers = await ExamAPI.getTestPending(idTest);
        setAnswers(resAnswers.data.answers);

        const currentTime = new Date().getTime();
        const startTime = new Date(
          resAnswers.data.startTime.replace("Z", "")
        ).getTime();
        const timeRemaining =
          resExam.data.time * 1000 * 60 - (currentTime - startTime);
        setTimeLeft(timeRemaining);
        setMetaData(tempMeta);
        setQuestions((prevQuestions) => [
          ...prevQuestions,
          resExam.data.questions,
        ]);
        setLoading(false);

        if (tempMeta.totalPage > 1) {
          const allPagesData = await Promise.all(
            Array.from({ length: tempMeta.totalPage - 1 }, (_, i) =>
              ExamAPI.getExam(examID, i + 2, limit)
            )
          );
          const allQuestions = allPagesData.map((res) => res.data.questions);
          setQuestions((prevQuestions) => [...prevQuestions, ...allQuestions]);
        }
      } catch (error) {
        console.error("Error fetching exam data", error);
      }
    };

    fetchExamData();
  }, [examID]);
  useEffect(() => {
    localStorage.setItem(`flaggedQuestions${idTest}`, JSON.stringify(flaggedQuestions));
  }, [flaggedQuestions]);

  const handlePageChange = (newPage) => {
    const data = {
      testId: idTest,
      finish: false,
      from: currentPage * limit + 1,
      to: currentPage * limit + questions[currentPage].length,
      answers: answers.filter(
        (item) =>
          item.sentenceNumber >= currentPage * limit + 1 &&
          item.sentenceNumber <= currentPage * limit + limit
      ),
    };

    ExamAPI.pushAnswer(examID, data);
    window.scrollTo({ top: 0 });
    setCurrentPage(newPage);
  };

  const handleAnswerChoiceChange = (sentenceNumber, answer) => {
    const newAnswers = [...answers];
    const index = newAnswers.findIndex(
      (item) => item.sentenceNumber === sentenceNumber
    );
    newAnswers[index] = {
      ...newAnswers[index],
      result: [{ answer: answer }],
    };
    setAnswers(newAnswers);
  };
  const handleAnswerFreeTextChange = (sentenceNumber, index, answer) => {
    const newAnswers = [...answers];
    const indexAnswer = newAnswers.findIndex(
      (item) => item.sentenceNumber === sentenceNumber
    );
    newAnswers[indexAnswer] = {
      ...newAnswers[indexAnswer],
      result: newAnswers[indexAnswer].result.map((item, i) => {
        if (i === index) {
          return { answer: answer };
        }
        return item;
      }),
    };
    setAnswers(newAnswers);
  };
  const handleQuestionClick = (sentenceNumber) => {
    const pageIndex = Math.floor((sentenceNumber - 1) / limit);
    handlePageChange(pageIndex);
  };
  const handleSubmit = () => {
    const data = {
      testId: idTest,
      finish: true,
      from: 1,
      to: answers.length +1,
      answers: answers,
    };
    setLoading(true);
    ExamAPI.pushAnswer(examID, data).then((res) => {
      if (res.status === 200) {
        setLoading(false);
        enqueueSnackbar("Nộp bài thành công", { variant: "success" });
        navigate(`/homework`);
      }
    });
  };

  const handleFlagToggle = (sentenceNumber) => {
    setFlaggedQuestions((prevFlagged) => {
      if (prevFlagged.includes(sentenceNumber)) {
        return prevFlagged.filter((num) => num !== sentenceNumber);
      } else {
        return [...prevFlagged, sentenceNumber];
      }
    });
  };

  if (loading) {
    return <DialogLoading />;
  }
  return (
    <div className="test-detail-page row">
      <div className="col l-3 m-10 c-12">
        <TestHeader metaData={metaData} />
        {timeLeft !== null && <CountdownTimer timeLeft={timeLeft} />}
        <AnswerBox
          answers={answers}
          handleQuestionClick={handleQuestionClick}
          handleSubmit={handleSubmit}
          flaggedQuestions={flaggedQuestions}
        />
      </div>
      <div className="col l-9 m-10 c-12">
        <QuestionList
          questions={questions[currentPage]}
          answers={answers}
          onAnswerChoiceChange={handleAnswerChoiceChange}
          onAnswerFreeTextChange={handleAnswerFreeTextChange}
          onFlagToggle={handleFlagToggle}
          flaggedQuestions={flaggedQuestions}
        />
        <Pagination
          totalPages={metaData.totalPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
