import React from "react";
import "./CardTeachingStaff.scss";
import Button from "~/components/Button/Button";
import { Link } from "react-router-dom";

export default function CardTeachingStaff({ teacher }) {
  const teacherId = 1;

  return (
    <div className="card-teaching-staff col l-4 m-6 c-12">
      <div className="card-teaching-staff__image">
        <img
          src={
            teacher.avatar !=="avatar_url" ? teacher.avatar : "https://via.placeholder.com/150"
          }
          alt="Avatar"
        />
      </div>
      <div className="card-teaching-staff__info">
        <h3 className="card-teaching-staff__name">{teacher.lastName}</h3>
        <p className="card-teaching-staff__position">Professor</p>
        <p className="card-teaching-staff__description">
          {teacher.introduction
            ? teacher.introduction
            : " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer necodio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi."}
        </p>
        <Link to={`/teaching-staff/${teacher._id}`}>
          <Button>Xem chi tiết</Button>
        </Link>
      </div>
    </div>
  );
}
