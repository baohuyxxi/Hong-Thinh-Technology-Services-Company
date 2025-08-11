import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FramePage from "~/components/FramePage/FramePage";
import StudentAPI from "~/services/apis/StudentAPI";
import DialogLoading from "~/components/DialogLoading/DialogLoading";
import "./BookDetail.scss";

export default function BookDetail() {
  const { bookId } = useParams();
  const [bookDetail, setBookDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    StudentAPI.getBook(bookId).then((res) => {
      setBookDetail(res.data);
      setLoading(false);
    });
  }, [bookId]);

  if (loading) {
    return (
      <FramePage>
        <DialogLoading />
      </FramePage>
    );
  }

  if (!bookDetail) {
    return (
      <FramePage>
        <div>Book not found</div>
      </FramePage>
    );
  }

  return (
    <FramePage>
      <div className="book-detail">
        {bookDetail.map((book) => (
          <div key={book._id} className="book-detail__book">
            <h2>{book.name}</h2>
            <p>{book.description}</p>

            <div className="book-detail__class">
              <img src={book.classId.image} alt={book.classId.name} />
              <div>
                <h3>{book.classId.name}</h3>
                <p>{book.classId.description}</p>
              </div>
            </div>
            <div className="book-detail__lessons">
              {book.lessons.map((lesson) => (
                <div key={lesson._id} className="book-detail__lesson">
                  <h3>{lesson.name}</h3>
                  <p>{lesson.description}</p>
                  {lesson.youtube.length > 0 && (
                    <div className="book-detail__youtube">
                      {lesson.youtube.map((link, index) => {
                        const embedUrl = getYouTubeEmbedUrl(link);
                        return (
                          <div
                            key={index}
                            className="book-detail__youtube-item"
                          >
                            {embedUrl ? (
                              <iframe
                                title={`youtube-video-${lesson._id}-${index}`}
                                src={embedUrl}
                                width="100%"
                                height="315"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              ></iframe>
                            ) : (
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Video {index + 1}
                              </a>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {lesson.documentPDF && (
                    <div className="book-detail__pdf">
                      Link bài học: 
                      <a
                        href={lesson.documentPDF.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {lesson.documentPDF.name}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </FramePage>
  );
}

// Helper function to get YouTube embed URL
const getYouTubeEmbedUrl = (url) => {
  const videoId = getYouTubeVideoId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
};

const getYouTubeVideoId = (url) => {
  const youtubeRegex =
    /^(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})$/;
  const match = url.match(youtubeRegex);
  return match ? match[4] : null;
};
