import React from "react";
import "./Tabs.scss"; // Đảm bảo bạn đã tạo file SCSS cho Tabs

const Tabs = ({ currentTab, onTabChange }) => (
  <div className="tabs">
    <button
      className={currentTab === "LESSON" ? "active" : ""}
      onClick={() => onTabChange("LESSON")}
    >
      Bài học
    </button>
    <button
      className={currentTab === "TEST" ? "active" : ""}
      onClick={() => onTabChange("TEST")}
    >
      Kiểm tra
    </button>
    <button
      className={currentTab === "EXAM" ? "active" : ""}
      onClick={() => onTabChange("EXAM")}
    >
      Thi
    </button>
  </div>
);

export default Tabs;
