import React from "react";
import TorSVG from "../../../svg/tor.js";
import "./tor.scss";

function NoticeQuitTor({ usesTor, ...props }) {
  return (
    usesTor && (
      <div className="notice-turn-off-tor-container" {...props}>
        <div className="notice-turn-off-tor-wrapper">
          <div className="notice-turn-off-tor">
            <TorSVG />
            <div className="text-border">
              <p className="first">
                <span className="tor">Tor</span> Detected!
              </p>
              <p className="second">
                Quit Tor and relaunch this site in a clear web browser!
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default NoticeQuitTor;
