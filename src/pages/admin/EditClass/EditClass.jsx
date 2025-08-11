// EditClass.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminAPI from "~/services/apis/AdminAPI";
import PublicAPI from "~/services/apis/PublicAPI";
import FramePage from "~/components/FramePage/FramePage";
import ClassForm from "~/components/ClassForm/ClassForm";
import BookList from "~/components/BookList/BookList";
import TeacherList from "~/components/TeacherList/TeacherList";
import DialogLoading from "~/components/DialogLoading/DialogLoading";
import "./EditClass.scss";
const EditClass = () => {
  const { classId } = useParams();
  const [classData, setClassData] = useState({
    name: "",
    description: "",
    books: [],
    teacherIds: [],
    image: "",
  });
  const [listTeachers, setListTeachers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loadingClass, setLoadingClass] = useState(true);
  const [loadingTeachers, setLoadingTeachers] = useState(true);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AdminAPI.getOneClass(classId);

        const { name, description, books, teacherIds, image } = response.data;
        setClassData({ name, description, books, teacherIds, image });
        setLoading(false);
        const teacherData = await Promise.all(
          teacherIds.flatMap(async (id) => {
            const data = await PublicAPI.getTeacher(id);
            return data.data;
          })
        );
        setTeachers(teacherData);

        setLoadingClass(false);
      } catch (error) {}
      try {
        const listTeachers = await PublicAPI.getListTeacher();
        setListTeachers(listTeachers.data);
        setLoadingTeachers(false);
      } catch (error) {}
    };
    fetchData()
  }, [classId]);

  const handleAddTeacher = async (teacherId) => {
    try {
      await AdminAPI.addTeacher({ classId, teacherId });
      const teacherData = await PublicAPI.getTeacher(teacherId);
      setTeachers([...teachers, teacherData.data]);
    } catch (error) {}
  };

  const handleRemoveTeacher = async (teacherId) => {
    try {
      await AdminAPI.removeTeacher({ classId, teacherId });
      setClassData((prevClassData) => ({
        ...prevClassData,
        teacherIds: prevClassData.teacherIds.filter((id) => id !== teacherId),
      }));
      setTeachers((prevTeachers) =>
        prevTeachers.filter((teacher) => teacher._id !== teacherId)
      );
    } catch (error) {}
  };

  const handleEditCellChange = ({ id, field, value }) => {
    navigate(`/edit-book/${classId}/${classData.books[id]._id}`);
  };

  if (loading) {
    return (
      <FramePage>
        <DialogLoading />
      </FramePage>
    );
  }
  return (
    <FramePage>
      <div className="edit-class">
        <div className="edit-class__container">
          <h1 className="edit-class__title">Chỉnh sửa lớp học</h1>
          <ClassForm
            classId={classId}
            classData={classData}
            setClassData={setClassData}
          />
          <BookList
            books={classData.books}
            handleEditCellChange={handleEditCellChange}
            loading={loadingClass}
          />
          <TeacherList
            teachers={teachers}
            listTeachers={listTeachers}
            handleRemoveTeacher={handleRemoveTeacher}
            handleAddTeacher={handleAddTeacher}
            loading={loadingTeachers}
          />
        </div>
      </div>
    </FramePage>
  );
};

export default EditClass;
