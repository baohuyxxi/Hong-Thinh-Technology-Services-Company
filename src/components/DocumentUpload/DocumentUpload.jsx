import './DocumentUpload.scss';
import React from "react";
import { Typography, Button } from "@mui/material";

const DocumentUpload = ({ documentPDF, handleFileChange, handleUploadDocument }) => {
  return (
    <div className="document-upload">
      {documentPDF ? (
        <div className="document-upload__file-info">
          <Typography variant="subtitle1">Tài liệu PDF:</Typography>
          <Typography variant="body1">
            <a href={documentPDF.link} target="_blank" rel="noreferrer" className="document-upload__file-link">
              {documentPDF.name}
            </a>
          </Typography>
        </div>
      ) : (
        <Typography variant="body1" className="document-upload__placeholder">
          Chưa có tài liệu PDF
        </Typography>
      )}
      <div className="document-upload__controls">
        <label className="document-upload__file-label">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="document-upload__file-input"
          />
        </label>
        <Button
          onClick={handleUploadDocument}
          variant="contained"
          color="primary"
          className="document-upload__upload-btn"
        >
          Upload PDF
        </Button>
      </div>
    </div>
  );
};

export default DocumentUpload;
