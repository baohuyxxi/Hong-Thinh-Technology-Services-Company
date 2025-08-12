import "./MyClassStudent.scss";
import React, { useEffect, useState } from "react";
import FramePage from "~/components/FramePage/FramePage";
import StudentAPI from "~/services/apis/StudentAPI";
import DialogLoading from "~/components/DialogLoading/DialogLoading";
import { useNavigate } from "react-router-dom";

export default function MyClass() {
  const navigate = useNavigate();
  const [myClasses, setMyClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    StudentAPI.getMyClass().then((res) => {
      setMyClasses([res.data, res.data, res.data, res.data, res.data]);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <FramePage>
        <DialogLoading />
      </FramePage>
    );
  }

  const handleClassClick = (classId) => {
    navigate(`/my-class/${classId}`);
  };
  return (
    <FramePage>
      <div className="class-list">
        <div className="class-list__container">
          <div className="row">
            {myClasses.map((classItem) => (
              <div
                key={classItem._id}
                className="class-item col l-3 m-4 c-6"
                onClick={() => handleClassClick(classItem._id)}
              >
                <img
                  src={classItem.image}
                  alt={classItem.name}
                  className="class-image"
                />
                <div className="class-info">
                  <h2 className="class-name">{classItem.name}</h2>
                
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FramePage>
  );
}
