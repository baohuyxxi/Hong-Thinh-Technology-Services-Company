import "./DialogLoading.scss";
import React from "react";
import loadingGift from "~/assets/gif/loading.gif";

export default function DialogLoading() {
  return (
    <div className="dialog-loading">
      <div className="dialog-loading__content">
        <img
          src={loadingGift}
          alt="Loading"
          className="dialog-loading__image"
        />
      </div>
    </div>
  );
}
