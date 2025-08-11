// EditBook.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FramePage from "~/components/FramePage/FramePage";
import BookAPI from "~/services/apis/BookAPI";
import ChapterAPI from "~/services/apis/ChapterAPI";
import { DataGrid } from "@mui/x-data-grid";
import { Modal, Button } from "@mui/material";
import ChapterModalContent from "~/components/ChapterModalContent/ChapterModalContent";
import AddChapterModal from "~/components/AddChapterModal/AddChapterModal";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import "./EditBook.scss";

const EditBook = () => {
  const navigate = useNavigate();
  const { classId, bookId } = useParams();
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openAddChapterDialog, setOpenAddChapterDialog] = useState(false);
  const [newChapterDetails, setNewChapterDetails] = useState({
    name: "",
    description: "",
  });
  const [selectedChapter, setSelectedChapter] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const fetchBookData = async () => {
    setLoading(true);
    try {
      const response = await BookAPI.getBook(bookId);
      setBookData(response.data);
    } catch (error) {
      console.error("Failed to fetch book data", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBookData();
  }, [bookId]);

  const handleChapterEdit = async (id, field, value) => {
    const updatedChapters = bookData.lessons.map((lesson) =>
      lesson._id === id ? { ...lesson, [field]: value } : lesson
    );
    setBookData({ ...bookData, lessons: updatedChapters });

    try {
      await BookAPI.updateChapter(id, { [field]: value });
    } catch (error) {
      console.error("Failed to update chapter", error);
    }
  };

  const handleAddChapter = async () => {
    try {
      const data = { ...newChapterDetails };
      data.classId = classId;
      data.bookId = bookId;
      const newChapter = await BookAPI.addChapter(data);
      enqueueSnackbar("Chương mới đã được thêm", { variant: "success" });
      setOpenAddChapterDialog(false);
      fetchBookData();
    } catch (error) {
      console.error("Failed to add chapter", error);
      setOpenAddChapterDialog(false);
    }
  };

  const handleRemoveChapter = async (chapterId) => {
    try {
      await BookAPI.removeChapter(chapterId);
      setBookData({
        ...bookData,
        lessons: bookData.lessons.filter((lesson) => lesson._id !== chapterId),
      });
      enqueueSnackbar("Chương đã được xóa", { variant: "success" });
    } catch (error) {
      console.error("Failed to remove chapter", error);
    }
  };

  const handleOpenChapterDetailsPage = (chapterId) => {
    navigate(`/edit-book/edit-chapter/${chapterId}`);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedChapter(null);
  };

  const handleOpenAddChapterDialog = () => {
    setOpenAddChapterDialog(true);
  };

  const handleCloseAddChapterDialog = () => {
    setOpenAddChapterDialog(false);
    setNewChapterDetails({ name: "", description: "" });
  };

  const handleChapterDetailChange = (e) => {
    const { name, value } = e.target;
    setSelectedChapter({ ...selectedChapter, [name]: value });
  };

  const handleLessonDetailChange = (value, key, lessonId) => {
    const updateBookData = [...bookData];
    const chapterIndex = updateBookData.findIndex((chapter) =>
      chapter.lessons.some((lesson) => lesson._id === lessonId)
    );
    if (chapterIndex !== -1) {
      const lessonIndex = updateBookData[chapterIndex].lessons.findIndex(
        (lesson) => lesson._id === lessonId
      );

      if (lessonIndex !== -1) {
        updateBookData[chapterIndex].lessons[lessonIndex][key] = value;
        setBookData(updateBookData);
      } else {
        console.error("Lesson not found");
      }
    } else {
      console.error("Chapter not found");
    }
  };

  const handleSaveChapterDetails = async () => {
    try {
      await ChapterAPI.editChapter(selectedChapter, selectedChapter._id);
      enqueueSnackbar("Chương đã được cập nhật", { variant: "success" });
    } catch (error) {
      console.error("Failed to save chapter details", error);
    }
  };

  const chapterColumns = [
    { field: "name", headerName: "Tên chương", width: 200, editable: true },
    { field: "description", headerName: "Mô tả", width: 300, editable: true },
    {
      field: "actions",
      headerName: "Hành động",
      width: 150,
      renderCell: (params) => (
        <button
          onClick={() => handleOpenChapterDetailsPage(params.row._id)}
          className="edit-book__button"
        >
          Chỉnh sửa
        </button>
      ),
    },
  ];

  return (
    <FramePage>
      <div className="edit-book">
        <div className="edit-book__container">
          <div className="edit-book__chapters">
            <h2 className="edit-book__subtitle">Danh sách chương</h2>
            <DataGrid
              loading={loading}
              rows={bookData?.map((chapter) => ({
                id: chapter._id,
                ...chapter,
              }))}
              columns={chapterColumns}
              autoHeight
              disableSelectionOnClick
              onCellEditCommit={(params) =>
                handleChapterEdit(params.id, params.field, params.value)
              }
            />
            <button
              onClick={handleOpenAddChapterDialog}
              className="edit-book__button"
            >
              Thêm chương
            </button>
          </div>
        </div>
      </div>

      {selectedChapter && (
        <Modal open={openModal} onClose={handleCloseModal}>
          <ChapterModalContent
            selectedChapter={selectedChapter}
            handleChapterDetailChange={handleChapterDetailChange}
            handleLessonDetailChange={handleLessonDetailChange}
            handleSaveChapterDetails={handleSaveChapterDetails}
          />
        </Modal>
      )}

      <AddChapterModal
        open={openAddChapterDialog}
        onClose={handleCloseAddChapterDialog}
        newChapterDetails={newChapterDetails}
        setNewChapterDetails={setNewChapterDetails}
        onAddChapter={handleAddChapter}
      />
    </FramePage>
  );
};

export default EditBook;
