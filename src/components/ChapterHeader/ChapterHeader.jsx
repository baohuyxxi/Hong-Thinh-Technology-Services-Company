import './ChapterHeader.scss';
import React from "react";
import { Typography, TextField } from "@mui/material";

const ChapterHeader = ({ name, description, onNameChange, onDescriptionChange }) => {
  return (
    <>
      <TextField
        label="Tên chương"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        fullWidth
        margin="normal"
        className="chapter-details-page__name"
      />
      <TextField
        label="Mô tả"
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        className="chapter-details-page__description"
      />
      <Typography
        variant="h6"
        component="h2"
        className="chapter-details-page__lesson-list__header"
      >
        Bài học
      </Typography>
    </>
  );
};

export default ChapterHeader;
