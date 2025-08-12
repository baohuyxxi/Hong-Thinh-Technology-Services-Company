import "./LessonAccordion.scss";
import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import YouTubeLinks from "../YouTubeLinks/YouTubeLinks";
import DocumentUpload from "../DocumentUpload/DocumentUpload";
import LessonAPI from "~/services/apis/LessonAPI";

const LessonAccordion = ({
  lesson,
  chapterId,
  handleFileChange,
  handleUploadDocument,
  handleAddYouTubeLink,
  handleChangeLinkYoutube,
  handleSaveChapter,
}) => {
  const [editingLesson, setEditingLesson] = useState({
    name: lesson.name,
    description: lesson.description,
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    try {
      const data ={...editingLesson, youtube: lesson.youtube, documentPDF: lesson.documentPDF};
      setSaving(true);
      handleSaveChapter();
      await LessonAPI.editLesson(data, chapterId, lesson._id);
    } catch (error) {
      console.error("Failed to save lesson:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Accordion className="chapter-details-page__lesson-list__accordion">
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel-${lesson._id}-content`}
        id={`panel-${lesson._id}-header`}
        className="chapter-details-page__lesson-list__accordion-summary"
      >
        <Typography>{lesson.name}</Typography>
      </AccordionSummary>
      <AccordionDetails className="chapter-details-page__lesson-list__accordion-details">
        <TextField
          label="Tên bài học"
          value={editingLesson.name}
          onChange={(e) =>
            setEditingLesson({ ...editingLesson, name: e.target.value })
          }
          fullWidth
          margin="normal"
          className="chapter-details-page__lesson-list__text-field"
        />
        <TextField
          label="Mô tả"
          value={editingLesson.description}
          onChange={(e) =>
            setEditingLesson({ ...editingLesson, description: e.target.value })
          }
          fullWidth
          margin="normal"
          multiline
          rows={2}
          className="chapter-details-page__lesson-list__text-field"
        />
        <YouTubeLinks
          youtubeLinks={lesson.youtube}
          lessonId={lesson._id}
          handleAddYouTubeLink={handleAddYouTubeLink}
          handleChangeLinkYoutube={handleChangeLinkYoutube}
        />
        <DocumentUpload
          documentPDF={lesson.documentPDF}
          handleFileChange={handleFileChange}
          handleUploadDocument={() => handleUploadDocument(lesson._id)}
        />  
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          className="chapter-details-page__lesson-list__save-btn"
          disabled={saving}
        >
          {saving ? "Đang lưu..." : "Lưu"}
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default LessonAccordion;
