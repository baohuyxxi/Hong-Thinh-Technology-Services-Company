import "./ChapterModalContent.scss";
import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DocumentAPI from "~/services/apis/DocumentAPI";
import LessonAPI from "~/services/apis/LessonAPI";
import ChapterAPI from "~/services/apis/ChapterAPI";
import { useSnackbar } from "notistack";

export default function ChapterModalContent({
  selectedChapter,
  handleChapterDetailChange,
  handleLessonDetailChange,
  handleSaveChapterDetails,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [pdfFile, setPdfFile] = useState(null);

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

      handleLessonDetailChange(documentPDF, "documentPDF", lessonId);
    } catch (error) {
      alert("Đã xảy ra lỗi khi upload tài liệu. Vui lòng thử lại sau.");
    }
  };

  const handleAddYouTubeLink = (lessonId) => {
    const youtube = [
      ...selectedChapter.lessons.find((lesson) => lesson._id === lessonId)
        .youtube,
      "",
    ];
    handleLessonDetailChange(youtube, "youtube", lessonId);
  };

  const getYouTubeEmbedUrl = (url) => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  const getYouTubeVideoId = (url) => {
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})$/;

    const match = url.match(youtubeRegex);
    return match ? match[4] : null;
  };

  const handleChangeLinkYoutube = (e, index, lessonId) => {
    const youtube = selectedChapter.lessons
      .find((lesson) => lesson._id === lessonId)
      .youtube.map((link, i) => (i === index ? e.target.value : link));
    handleLessonDetailChange(youtube, "youtube", lessonId);
  };

  const handleSaveLessonDetails = async () => {
    handleSaveChapterDetails();
    Promise.all(
      selectedChapter.lessons.map(async (lesson) => {
        await LessonAPI.editLesson(lesson, selectedChapter._id, lesson._id)
          .then((res) => {
            enqueueSnackbar("Bài học đã được cập nhật", { variant: "success" });
          })
          .catch((err) => {
            enqueueSnackbar("Đã xảy ra lỗi khi cập nhật bài học", {
              variant: "error",
            });
          });
      })
    );
  };
  return (
    <Box className="edit-book__modal">
      <Typography variant="h6" component="h2">
        Chỉnh sửa chương
      </Typography>
      <TextField
        label="Tên chương"
        name="name"
        value={selectedChapter.name}
        onChange={handleChapterDetailChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Mô tả"
        name="description"
        value={selectedChapter.description}
        onChange={handleChapterDetailChange}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
        Bài học
      </Typography>
      {selectedChapter.lessons.map((lesson) => (
        <Accordion key={lesson._id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${lesson._id}-content`}
            id={`panel-${lesson._id}-header`}
          >
            <Typography>{lesson.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              label="Tên bài học"
              name="name"
              value={lesson.name}
              onChange={(e) =>
                handleLessonDetailChange(e.target.value, "name", lesson._id)
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="Mô tả"
              name="description"
              value={lesson.description}
              onChange={(e) =>
                handleLessonDetailChange(
                  e.target.value,
                  "description",
                  lesson._id
                )
              }
              fullWidth
              margin="normal"
              multiline
              rows={2}
            />
            {lesson.youtube.length === 0 ? (
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ marginTop: "10px" }}
              >
                Thêm Link YouTube
              </Typography>
            ) : (
              lesson.youtube.map((youtubeLink, index) => {
                const embedUrl = getYouTubeEmbedUrl(youtubeLink);
                return (
                  <div key={index}>
                    <TextField
                      label="Link YouTube"
                      name="youtube"
                      value={youtubeLink}
                      onChange={(e) =>
                        handleChangeLinkYoutube(e, index, lesson._id)
                      }
                      fullWidth
                      margin="normal"
                    />
                    {embedUrl ? (
                      <iframe
                        title={`lesson-video-${lesson._id}-${youtubeLink}`}
                        width="100%"
                        height="315"
                        src={embedUrl}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        style={{ marginTop: "10px" }}
                      ></iframe>
                    ) : (
                      <Typography
                        variant="body2"
                        color="error"
                        style={{ marginTop: "10px" }}
                      >
                        Link không hợp lệ!
                      </Typography>
                    )}
                  </div>
                );
              })
            )}
            {lesson.documentPDF && (
              <div>
                <Typography variant="subtitle1">Tài liệu PDF:</Typography>
                <Typography variant="body1">
                  <a
                    href={lesson.documentPDF.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "underline", color: "blue" }}
                  >
                    {lesson.documentPDF.name}
                  </a>
                </Typography>
              </div>
            )}
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              style={{ marginTop: "10px" }}
            />
            <Button
              onClick={(e) => handleUploadDocument(lesson._id)}
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
            >
              Upload PDF
            </Button>
            <Button
              onClick={() => handleAddYouTubeLink(lesson._id)}
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />}
              style={{ marginTop: "10px" }}
            >
              Thêm link YouTube
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
      <Button
        onClick={handleSaveLessonDetails}
        variant="contained"
        color="primary"
        className="edit-book__modal-button"
        style={{ marginTop: "10px" }}
      >
        Lưu
      </Button>
    </Box>
  );
}
