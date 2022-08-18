import React, { useState } from "react";
import "./styles.scss";

function Paginator({
  lastPage = 13,
  size = 5,
  firstPage = 1,
  setPage = () => {},
  page = firstPage,
}) {
  function generatePageArray(page) {
    return new Array(size)
      .fill()
      .map((_, i) => i + 1 + Math.floor((page - 1) / size) * size);
  }

  const [pageArray, setPageArray] = useState(generatePageArray(firstPage));

  function changePage(page) {
    setPage(page);
    if (page > pageArray[pageArray.length - 1] && page < lastPage) {
      setPageArray(generatePageArray(page));
    } else if (page < pageArray[0]) {
      setPageArray(generatePageArray(page));
    }
  }

  function getPagesButtons() {
    return pageArray.map((i) => {
      let className = i === page ? "currentPage pageIcon" : "pageIcon";
      className = i > lastPage ? `${className} disabled` : className;
      return (
        <div
          className={className}
          role="button"
          onClick={() => {
            if (i <= lastPage) {
              changePage(i);
            }
          }}
          key={`page_${i}`}
        >
          {i}
        </div>
      );
    });
  }
  return (
    <div className="page-container">
      <div
        className={page < 2 ? "page-backward disabled" : "page-backward"}
        onClick={() => {
          if (page > 1) {
            changePage(page - 1);
          }
        }}
        role="button"
      >
        &lt;
      </div>
      {getPagesButtons()}
      <div
        className={page >= lastPage ? "page-forward disabled" : "page-forward"}
        onClick={() => {
          if (page < lastPage) {
            changePage(page + 1);
          }
        }}
        role="button"
      >
        &gt;
      </div>
    </div>
  );
}

export default Paginator;
