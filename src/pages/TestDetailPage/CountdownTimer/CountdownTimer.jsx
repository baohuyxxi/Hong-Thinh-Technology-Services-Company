import React, { useEffect, useState } from "react";
import './CountdownTimer.scss';

const CountdownTimer = ({ timeLeft }) => {
  const [time, setTime] = useState(timeLeft);

  useEffect(() => {
    if (time <= 0) return;

    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1000) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1000;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return <div className="countdown-timer">Thời gian còn lại: {formatTime(time)}</div>;
};

export default CountdownTimer;
