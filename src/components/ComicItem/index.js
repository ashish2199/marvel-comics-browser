import React from "react";
import "./styles.scss";

function ComicItem({ comicDetails }) {
  let { id, title, issueNumber, thumbnailUrl } = comicDetails;
  return (
    <div className="comic-item">
      <div className="comic-image" title={title}>
        <div className="img-container">
          <img src={thumbnailUrl} alt={title} />
        </div>
        <div className="comic-details">
          <div className="comic-name">{title}</div>
          <div className="comic-edition">#{issueNumber}</div>
        </div>
      </div>
    </div>
  );
}

export default ComicItem;
