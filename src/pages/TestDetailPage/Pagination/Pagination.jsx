import React from "react";
import './Pagination.scss';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="pagination">
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          className={`pagination-button ${
            index === currentPage ? "active" : ""
          }`}
          onClick={() => onPageChange(index)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
