import "./Radio.scss";
import React from "react";

function Radio({ id, label, checked, onChange }) {
  return (
    <div className="checkbox-wrapper">
      <input
        type="radio"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="check-box"></label>
      <label htmlFor={id} className="title__check-box">{label}</label>
    </div>
  );
}

export default Radio;
