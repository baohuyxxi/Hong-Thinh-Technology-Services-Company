import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import FramePage from "~/components/FramePage/FramePage";
import { useSnackbar } from "notistack";
import "./ChapterDetailsPage.scss";
import BookAPI from "~/services/apis/BookAPI";
import LessonAPI from "~/services/apis/LessonAPI";
import DocumentAPI from "~/services/apis/DocumentAPI";
import ChapterHeader from "~/components/ChapterHeader/ChapterHeader";
import LessonAccordion from "~/components/LessonAccordion/LessonAccordion";
import Button from "~/components/Button/Button";
import DialogLoading from "~/components/DialogLoading/DialogLoading";

const ChapterDetailsPage = () => {
  const { chapterId } = useParams();
  const [chapterData, setChapterData] = useState([]);
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const fetchChapterData = async () => {
    try {
      setLoading(true);
      const response = await BookAPI.getChapter(chapterId);
      setChapterData(response.data);
    } catch (error) {
      console.error("Failed to fetch chapter data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChapterData();
  }, [chapterId]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
  };

  const handleUploadDocument = async (lessonId) => {
    if (!pdfFile) {
      alert("Vui lòng chọn một tài liệu PDF để upload.");
      return;
    }

    try {
      const uploadResponse = await DocumentAPI.uploadDocument(pdfFile);
      const documentPDF = {
        name: pdfFile.name,
        link: uploadResponse.data.link,
      };

      const updatedLessons = chapterData.lessons.map((lesson) =>
        lesson._id === lessonId ? { ...lesson, documentPDF } : lesson
      );

      setChapterData({ ...chapterData, lessons: updatedLessons });
    } catch (error) {
      alert("Đã xảy ra lỗi khi upload tài liệu. Vui lòng thử lại sau.");
    }
  };

  const handleAddYouTubeLink = (lessonId) => {
    const updatedLessons = chapterData.lessons.map((lesson) =>
      lesson._id === lessonId
        ? { ...lesson, youtube: [...lesson.youtube, ""] }
        : lesson
    );
    setChapterData({ ...chapterData, lessons: updatedLessons });
  };

  const handleChangeLinkYoutube = (event, index, lessonId) => {
    const newLink = event.target.value;
    const updatedLessons = chapterData.lessons.map((lesson) =>
      lesson._id === lessonId
        ? {
            ...lesson,
            youtube: lesson.youtube.map((link, i) =>
              i === index ? newLink : link
            ),
          }
        : lesson
    );
    setChapterData({ ...chapterData, lessons: updatedLessons });
  };

  const handleNameChange = (name) => {
    setChapterData({ ...chapterData, name });
  };

  const handleDescriptionChange = (description) => {
    setChapterData({ ...chapterData, description });
  };

  if (!chapterData) {
    return <div>Loading...</div>;
  }

  const handleAddLesson = () => {
    const newLesson = {
      name: "Bài học mới",
      description: "",
      youtube: [],
      documentPDF: null,
    };
    LessonAPI.createLesson(newLesson, chapterId).then((res) => {
      fetchChapterData();
    });
  };

  const handleSave = async () => {
    try {
      await BookAPI.editChapter(chapterData, chapterId);
      enqueueSnackbar("Đã lưu thay đổi", { variant: "success" });
    } catch (error) {
      console.error("Failed to save chapter:", error);
      enqueueSnackbar("Đã xảy ra lỗi khi lưu thay đổi", { variant: "error" });
    }
  }



  if (loading) {
    return (
      <FramePage>
        <DialogLoading />
      </FramePage>
    );
  }
  return (
    <FramePage>
      <Box className="chapter-details-page">
        <ChapterHeader
          name={chapterData.name}
          description={chapterData.description}
          onNameChange={handleNameChange}
          onDescriptionChange={handleDescriptionChange}
        />
        <Box className="chapter-details-page__lesson-list">
          {chapterData.lessons.map((lesson) => (
            <LessonAccordion
              key={lesson._id}
              lesson={lesson}
              chapterId={chapterId}
              handleFileChange={handleFileChange}
              handleUploadDocument={handleUploadDocument}
              handleAddYouTubeLink={handleAddYouTubeLink}
              handleChangeLinkYoutube={handleChangeLinkYoutube}
              handleSaveChapter={handleSave}
            />
          ))}
        </Box>
        <Button onClick={handleAddLesson}>Thêm bài học</Button>
      </Box>
    </FramePage>
  );
};

export default ChapterDetailsPage;
