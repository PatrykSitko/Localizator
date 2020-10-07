import React from "react";
import LoadingSVG from "../svg/loading.js";
import useDots from "../effects/use/dots.js";
import useTimeout from "../effects/use/timeout.js";
import "./loading.scss";

function Loading({ userIPv4Saved }) {
  const dots = useDots(350);
  const fadedOut = useTimeout(userIPv4Saved, 1500);
  return (
    !fadedOut && (
      <div
        className={`loading-component-container${
          userIPv4Saved && !fadedOut ? " fade-out" : ""
        }`}
      >
        <div className="loading-component">
          <LoadingSVG />
          <p>Loading{dots}</p>
        </div>
      </div>
    )
  );
}

export default Loading;
