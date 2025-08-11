import React, { useState, useEffect } from "react";
import "./HomeworkPage.scss";
import FramePage from "~/components/FramePage/FramePage";
import ExamAPI from "~/services/apis/ExamAPI";
import DialogLoading from "~/components/DialogLoading/DialogLoading";
import { useNavigate } from "react-router-dom";
import Tabs from "./Tabs/Tabs";
import ExamList from "./ExamList/ExamList";
import Pagination from "./Pagination/Pagination";

export default function HomeworkPage() {
  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentTab, setCurrentTab] = useState("LESSON");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        const res = await ExamAPI.getListExam(currentTab, currentPage);
        setExams(res.data.listExams);
        setTotalPages(res.data.totalPage);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [currentPage, currentTab]);

  if (loading) {
    return (
      <FramePage>
        <DialogLoading />
      </FramePage>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleViewDetails = async (examId) => {
    await ExamAPI.createTest(examId).then((res) => {
      const idTest = res.data._id;
      navigate(`/test-detail/${examId}?idTest=${idTest}`);
    });
  };

  const handleContinueTest = async (examId, listTest) => {
    const idTest = listTest.find((test) => test.status === "PENDING")._id;
    navigate(`/test-detail/${examId}?idTest=${idTest}`);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <FramePage>
      <div className="homework-page">
        <h1>Bài tập về nhà</h1>
        <Tabs
          currentTab={currentTab}
          onTabChange={(tab) => {
            setCurrentTab(tab);
            setCurrentPage(1);
          }}
        />
        <ExamList
          exams={exams}
          onViewDetails={handleViewDetails}
          onContinueTest={handleContinueTest}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </FramePage>
  );
}
