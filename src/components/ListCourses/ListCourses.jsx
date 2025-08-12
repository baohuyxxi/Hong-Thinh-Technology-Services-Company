import "./ListCourses.scss";
import CardCourse from "../CardCourse/CardCourse";
import PublicAPI from "~/services/apis/PublicAPI";
import { useEffect, useState } from "react";

export default function ListCourses() {
  const [classDatas, setClassDatas] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PublicAPI.getListClass().then((res) => {
      setClassDatas(res.data);
      setLoading(false);
    });
  }, []);


  return (
    <div className="list-courses row">
      {loading ? (
        <p>Loading...</p>
      ) : (
        classDatas.map((classData) => <CardCourse classData={classData} />)
      )}
    </div>
  );
}
