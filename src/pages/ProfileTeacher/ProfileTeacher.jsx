import React, { useEffect, useState } from "react";
import "./ProfileTeacher.scss";
import FramePage from "~/components/FramePage/FramePage";
import PublicAPI from "~/services/apis/PublicAPI";
import { useParams } from "react-router-dom";
import DialogLoading from "~/components/DialogLoading/DialogLoading";

export default function ProfileTeacher() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PublicAPI.getTeacher(id).then((res) => {
      setTeacher(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <FramePage>
        <DialogLoading />
      </FramePage>
    );
  }

  return (
    <FramePage>
      <div className="profile-teacher">
        <div className="profile-teacher__info">
          <img
            src={teacher.avatar}
            alt="Avatar"
            className="profile-teacher__avatar"
          />
          <div className="profile-teacher__details">
            <h2 className="profile-teacher__name">
              {teacher.sex === "Nam" ? "Thầy: " : "Cô: "}
              {teacher.firstName} {teacher.lastName}
            </h2>
            {/* <p className="profile-teacher__position">{teacher.role}</p> */}
            {teacher.introduction && (
              <p className="profile-teacher__introduction">
                {teacher.introduction}
              </p>
            )}
            <div className="profile-teacher__contact">
              <p className="profile-teacher__email">Email: {teacher.email}</p>
              <p className="profile-teacher__phone">Điện thoại: {teacher.phone}</p>
              <p className="profile-teacher__address">Địa chỉ: {teacher.address}</p>
            </div>
          </div>
        </div>
      </div>
    </FramePage>
  );
}
