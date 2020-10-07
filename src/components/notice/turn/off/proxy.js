import React from "react";
import ProxySVG from "../../../../svg/proxy.js";
import "./proxy.scss";

function NoticeTurnOffProxy({ usesProxy, ...props }) {
  return (
    usesProxy && (
      <div className="notice-turn-off-proxy-container" {...props}>
        <div className="notice-turn-off-proxy-wrapper">
          <div className="notice-turn-off-proxy">
            <ProxySVG />
            <div className="text-border">
              <p className="first">
                <span className="proxy">Proxy</span> Detected!
              </p>
              <p className="second">
                Turn off your proxy in order to access site's contents!
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default NoticeTurnOffProxy;
