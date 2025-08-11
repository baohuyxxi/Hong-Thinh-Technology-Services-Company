import React from "react";
import "./HeaderDefault.scss";

import PlaceIcon from "@mui/icons-material/Place";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PhoneIcon from "@mui/icons-material/Phone";

export default function HeaderDefault() {
  return (
    <header className="header-default">
      <div className="header-default__container slide-menu">
        <div className="slide-menu__left col">
          <div className="contact-item">
            <PlaceIcon /> <span>Địa chỉ</span>
          </div>
          <div className="contact-item">
            <EmailIcon /> <span>pitshongthinh@gmail.com</span>
          </div>
          <div className="contact-item">
            <AccessTimeIcon /> <span>08:00 - 17:00</span>
          </div>
          <div className="contact-item">
            <PhoneIcon /> <span>090 707 91 68</span>
          </div>
        </div>
      </div>
    </header>
  );
}
