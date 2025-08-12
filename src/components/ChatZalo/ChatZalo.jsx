import React, { useState } from "react";
import "./ChatZalo.scss";
import chatzalo from "~/assets/icon/zalo.svg";

export default function ChatZalo() {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="chatzalo"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => window.open(import.meta.env.VITE_LINK_ChatZalo)}
    >
      <img src={chatzalo} className="chatzalo__icon" alt="chatzalo Icon" />
    </div>
  );
}
