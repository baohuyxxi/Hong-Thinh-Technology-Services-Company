import React from "react";
import './TestHeader.scss';

const TestHeader = ({ metaData }) => {
  return (
    <div className="test-header">
      <h1 className="test-title">{metaData.name}</h1>
      <p className="test-description">{metaData.description}</p>
      <p className="test-time">Thời gian thực hiện: {metaData.time} phút</p>
      <p className="test-start-time">
        Thời gian bắt đầu: {new Date(metaData.startTime).toLocaleString()}
      </p>
      <p className="test-end-time">
        Thời gian kết thúc: {new Date(metaData.endTime).toLocaleString()}
      </p>
    </div>
  );
};

export default TestHeader;
