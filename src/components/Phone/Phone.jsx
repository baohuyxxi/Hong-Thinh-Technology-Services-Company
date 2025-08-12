import React, { useState } from "react";
import "./Phone.scss";
import phone from "~/assets/icon/phone.svg";

export default function Phone() {
  const [hover, setHover] = useState(false);

  return (
    <a
      className="phone"
      href="tel:0346353913"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* {hover && <div className="phone__tooltip">0346 353 913</div>} */}
      <img src={phone} className="phone__icon" alt="Phone Icon" />
    </a>
  );
}
