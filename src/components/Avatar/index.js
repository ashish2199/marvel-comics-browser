import React from "react";
import { ReactComponent as TickMark } from "assets/imgs/tick.svg";

import "./styles.scss";

function Avatar({ imgSrc, name, isSelected }) {
  return (
    <div
      className={
        isSelected ? "avatar-image selected-character" : "avatar-image"
      }
    >
      <img src={imgSrc} alt={name} title={name} />
      <TickMark className="tick-mark" />
    </div>
  );
}

export default Avatar;
