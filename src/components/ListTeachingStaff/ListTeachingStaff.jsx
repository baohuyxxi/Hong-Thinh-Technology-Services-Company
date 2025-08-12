import "./ListTeachingStaff.scss";
import CardTeachingStaff from "../CardTeachingStaff/CardTeachingStaff";

export default function ListTeachingStaff({ listTeacher }) {
  return (
    <div className="list-teaching-staff row">
      {listTeacher.map((teacher, index) => {
        return <CardTeachingStaff teacher={teacher}/>;
      })}
    </div>
  );
}
