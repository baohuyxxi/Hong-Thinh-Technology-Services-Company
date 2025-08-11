// AddChapterModal.js
import React from 'react';
import { Modal, Button, TextField } from '@mui/material';
import './AddChapterModal.scss'; // Create this SCSS file for styling

const AddChapterModal = ({
  open,
  onClose,
  newChapterDetails,
  setNewChapterDetails,
  onAddChapter,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="add-chapter-dialog">
        <h2>Thêm chương mới</h2>
        <TextField
          label="Tên chương"
          name="name"
          value={newChapterDetails.name}
          onChange={(e) => setNewChapterDetails({ ...newChapterDetails, name: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Mô tả"
          name="description"
          value={newChapterDetails.description}
          onChange={(e) => setNewChapterDetails({ ...newChapterDetails, description: e.target.value })}
          fullWidth
          margin="normal"
        />
        <div className="add-chapter-dialog__actions">
          <Button onClick={onClose} color="secondary">
            Hủy bỏ
          </Button>
          <Button onClick={onAddChapter} color="primary" variant="contained">
            Thêm
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddChapterModal;
