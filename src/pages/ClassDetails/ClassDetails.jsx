// src/components/ClassDetails/ClassDetails.jsx
import "./ClassDetails.scss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PublicAPI from "~/services/apis/PublicAPI";
import FramePage from "~/components/FramePage/FramePage";
import DialogLoading from "~/components/DialogLoading/DialogLoading";
import { getYouTubeEmbedUrl } from "~/utils/getYouTubeVideoId";
const ClassDetails = () => {
  const { classId } = useParams();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchClassDetails = async () => {
      setLoading(true);
      try {
        const response = await PublicAPI.getOneClass(classId);
        setClassData(response.data);

        const chapterResponse = await PublicAPI.getChapterPublic(classId);
        setChapters(chapterResponse.data);
      } catch (error) {
        console.error("Failed to fetch class details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClassDetails();
  }, [classId]);

  if (loading) {
    return (
      <FramePage>
        <DialogLoading />
      </FramePage>
    );
  }

  return (
    <FramePage imageBanner={classData?.image}>
      {classData && (
        <div className="class-details">
          <h1>Bài học thử {classData.name}</h1>
          <p>
            GIỚI THIỆU KHÓA HỌC TOÁN {classData.name} BAO GỒM CÁC NỘI DUNG NHƯ
            SAU:
          </p>

          {chapters.map((chapter) => (
            <div key={chapter.chapterId} className="chapter">
              <h2>{chapter.name}</h2>
              <p>{chapter.description}</p>
              {chapter.lessons.map((lesson) => (
                <div key={lesson._id} className="lesson">
                  <h3>{lesson.name}</h3>
                  <p>{lesson.description}</p>
                  {lesson.youtube.length > 0 && (
                    <div className="video-links">
                      {lesson.youtube.map((link, index) => (
                        <iframe
                          key={index}
                          title={lesson.name}
                          src={getYouTubeEmbedUrl(link)}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </FramePage>
  );
};

export default ClassDetails;
