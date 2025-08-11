
const getYouTubeVideoId = (url) => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=)?([^&=\n_%?]{11})|youtu\.be\/([^&=\n_%?]{11})/;
  const match = url.match(regex);
  return match ? match[1] || match[2] : null;
};
export const getYouTubeEmbedUrl = (url) => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };