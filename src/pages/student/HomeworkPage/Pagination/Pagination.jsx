import './Pagination.scss';
import React from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        className={i === currentPage ? "active" : ""}
        onClick={() => onPageChange(i)}
      >
        {i}
      </button>
    );
  }
  return (
    <div className="pagination">
      <ArrowLeftIcon
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />
      {pages}
      <ArrowRightIcon
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </div>
  );
};

export default Pagination;
