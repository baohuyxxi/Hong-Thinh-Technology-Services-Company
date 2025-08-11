import "./CardCourse.scss";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

export default function CardCourse({ classData }) {
  return (
    <div className="card-course col l-4 m-6 c-12">
      <div className="card-course__container">
        <img
          src={
            classData.image !== "" && classData.image !== "url"
              ? classData.image
              : "https://via.placeholder.com/300"
          }
          alt={classData.name}
          className="card-course__image"
        />
        <div className="card-course__info">
          <h3 className="card-course__name">{classData.name}</h3>
          {/* <p className="card-course__description">{classData.description}</p> */}
          <Link to={`/courses/${classData._id}`}>
            <Button>Học thử</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
