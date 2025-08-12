import React, { useState } from "react";
import "./Messenger.scss";
import messenger from "~/assets/icon/messenger.svg";

export default function Messenger() {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="messenger"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => window.open(import.meta.env.VITE_LINK_MESSENGER)}
    >
      {/* {hover && <div className="messenger__tooltip">Liên hệ Messenger</div>} */}
      <img src={messenger} className="messenger__icon" alt="Messenger Icon" />
    </div>
  );
}
