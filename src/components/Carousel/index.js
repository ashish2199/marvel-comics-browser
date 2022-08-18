import React, { useState } from "react";
import "./styles.scss";

function Carousel({ items, disableCarousel, size }) {
  const [firstItem, setFirstItem] = useState(0);
  function fetchPreviousPage() {
    const length = items.length;
    let newFirstItem = firstItem > 0 ? firstItem - 1 : length - size;
    setFirstItem(newFirstItem);
  }
  function fetchNextPage() {
    const length = items.length;
    let newFirstItem = firstItem < length - size ? firstItem + 1 : 0;
    setFirstItem(newFirstItem);
  }
  return (
    <>
      <div className="carousel-container">
        <div
          className={
            disableCarousel ? "disabled-caraousel" : "enabled-carousel"
          }
        >
          A
        </div>
        <div
          role="button"
          className="page-backward"
          onClick={() => {
            if (!disableCarousel) {
              fetchPreviousPage();
            }
          }}
          disabled={disableCarousel}
        >
          <i className="arrow left"></i>
        </div>
        <div className="avatars">
          {items.map((item, index) => {
            const leftDisplacement = firstItem * -150;
            return (
              <div
                key={index}
                style={{ left: leftDisplacement }}
                className="carousel-item"
              >
                {item}
              </div>
            );
          })}
        </div>
        <div
          role="button"
          className="page-forward"
          onClick={() => {
            if (!disableCarousel) {
              fetchNextPage();
            }
          }}
        >
          <i className="arrow right"></i>
        </div>
      </div>
    </>
  );
}

export default Carousel;
