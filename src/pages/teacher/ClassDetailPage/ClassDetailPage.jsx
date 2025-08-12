// src/pages/ClassDetailPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FramePage from "~/components/FramePage/FramePage";
import PublicAPI from "~/services/apis/PublicAPI";
import DialogLoading from "~/components/DialogLoading/DialogLoading";
import ListExamTeacher from "~/components/ListExamTeacher/ListExamTeacher";
import "./ClassDetailPage.scss";

const colors = [
  "#4A60F4",
  "#DC4C4F",
  "#F2BB44",
  "#74B154",
  "#449695",
  "#8318F6",
];

const ClassDetailPage = () => {
  const navigate = useNavigate();
  const { classId } = useParams();
  const [classDetail, setClassDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PublicAPI.getOneClass(classId)
      .then((res) => {
        setClassDetail(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch class details:", error);
        setLoading(false);
      });
  }, [classId]);

  if (loading) {
    return (
      <FramePage>
        <DialogLoading />
      </FramePage>
    );
  }

  if (!classDetail) {
    return (
      <FramePage>
        <div className="no-data">No class details available.</div>
      </FramePage>
    );
  }

  const getColorByIndex = (index) => colors[index % colors.length];

  return (
    <FramePage imageBanner={classDetail.image}>
      <div className="class-detail">
        <div className="class-detail__info">
          <h2 className="class-detail__name">{classDetail.name}</h2>
          <p className="class-detail__description">{classDetail.description}</p>
        </div>
        <div className="class-detail__books">
          <h3>Sách</h3>
          <ul>
            {classDetail.books.map((book, index) => (
              <div
                key={book._id}
                className="class-detail__book"
                style={{ backgroundColor: getColorByIndex(index) }}
                onClick={() => navigate(`/edit-book/${classId}/${book._id}`)}
              >
                <div className="class-detail__book-info">
                  <h4 className="class-detail__book-name">{book.name}</h4>
                  <p className="class-detail__book-description">
                    {book.description}
                  </p>
                </div>
              </div>
            ))}
          </ul>
        </div>
        <ListExamTeacher classId={classId}/>
      </div>
    </FramePage>
  );
};

export default ClassDetailPage;
