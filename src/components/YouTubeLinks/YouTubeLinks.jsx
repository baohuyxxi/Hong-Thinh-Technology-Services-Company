import "./YouTubeLinks.scss";
import React from "react";
import { Typography, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ytbNotAvailable from "~/assets/images/youtube-not-available.png";
import { getYouTubeEmbedUrl } from "~/utils/getYouTubeVideoId";
const YouTubeLinks = ({
  youtubeLinks,
  lessonId,
  handleAddYouTubeLink,
  handleChangeLinkYoutube,
}) => {
  
  const isValidYouTubeUrl = (url) => {
    const videoId = getYouTubeVideoId(url);
    return videoId !== null;
  };
  return (
    <>
      {youtubeLinks.length === 0 ? (
        <Button
          onClick={() => handleAddYouTubeLink(lessonId)}
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
        
          style={{ height: "30px" }}
        >
          Thêm link YouTube
        </Button>
      ) : (
        <>
          {youtubeLinks.map((youtubeLink, index) => {
            const embedUrl = getYouTubeEmbedUrl(youtubeLink);
            return (
              <div
                key={index}
                className="chapter-details-page__lesson-list__youtube-link"
              >
                <TextField
                  label="Link YouTube"
                  value={youtubeLink}
                  onChange={(e) => handleChangeLinkYoutube(e, index, lessonId)}
                  fullWidth
                  margin="normal"
                  className="chapter-details-page__lesson-list__text-field"
                />
              </div>
            );
          })}
          <Button
            onClick={() => handleAddYouTubeLink(lessonId)}
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            className="chapter-details-page__lesson-list__add-youtube-btn"
            style={{ height: "30px" }}
          >
            Thêm link YouTube
          </Button>
          <div className="chapter-details-page__lesson-list__youtube-frames row">
            {youtubeLinks.map((youtubeLink, index) => {
              const embedUrl = getYouTubeEmbedUrl(youtubeLink);
              return isValidYouTubeUrl(youtubeLink) ? (
                <div
                  key={index}
                  className="chapter-details-page__lesson-list__youtube-container col l-3 m-6 c-12"
                >
                  <iframe
                    title={`lesson-video-${lessonId}-${youtubeLink}`}
                    src={embedUrl}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="chapter-details-page__lesson-list__youtube-iframe "
                  ></iframe>
                </div>
              ) : (
                <div
                  key={index}
                  className="chapter-details-page__lesson-list__youtube-container col l-3 m-6 c-12"
                >
                  <img
                    src={ytbNotAvailable}
                    alt="youtube-not-available"
                    // className="chapter-details-page__lesson-list__youtube-not-available"
                  />
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};


export default YouTubeLinks;
