import "./TeachingStaff.scss";
import React, { useEffect, useState } from "react";
import FramePage from "~/components/FramePage/FramePage";
import ListTeachingStaff from "~/components/ListTeachingStaff/ListTeachingStaff";
import BannerTeachingStaff from "~/components/BannerTeachingStaff/BannerTeachingStaff";
import PublicAPI from "~/services/apis/PublicAPI";
export default function TeachingStaff() {
  const [listTeacher, setListTeacher] = useState([]);
  useEffect(() => {
    const fetchListTeacher = async () => {
      try {
        const res = await PublicAPI.getListTeacher();
        setListTeacher(res.data);
      } catch (error) {
      
      }
    };
    fetchListTeacher();
  }, []);
 
  return (
    <FramePage>
      <div className="teaching-staff">
      
        {listTeacher.length > 0 && (
          <ListTeachingStaff listTeacher={listTeacher} />
        )}
      </div>
    </FramePage>
  );
}
