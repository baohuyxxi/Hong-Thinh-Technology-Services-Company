import "./MyClassTeacher.scss";
import React, { useEffect, useState } from "react";
import FramePage from "~/components/FramePage/FramePage";
import PublicAPI from "~/services/apis/PublicAPI";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function MyClassTeacher() {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const account = useSelector((state) => state.account.info);

  useEffect(() => {
    PublicAPI.getListClass().then((res) => {
      const data = res.data.filter((item) =>
        item.teacherIds.some((id) => id === account._id)
      );
      setClasses(data);
    });
  }, [account._id]);

  const handleToClass = (id) => () => {
    navigate(`/my-class-teacher/${id}`);
  };

  return (
    <FramePage>
      <div className="class-list">
        {classes.map((classItem) => (
          <div key={classItem._id} className="class-item" onClick={handleToClass(classItem._id)}>
            <img src={classItem.image} alt={classItem.name} className="class-image" />
            <div className="class-content">
              <h3 className="class-name">{classItem.name}</h3>
              {/* <p className="class-description">{classItem.description}</p> */}
            </div>
          </div>
        ))}
      </div>
    </FramePage>
  );
}
