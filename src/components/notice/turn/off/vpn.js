import React from "react";
import VpnSVG, { models } from "../../../../svg/vpn.js";
import "./vpn.scss";

function NoticeTurnOffVPN({ usesVPN, ...props }) {
  return (
    usesVPN && (
      <div className="notice-turn-off-vpn-container" {...props}>
        <div className="notice-turn-off-vpn-wrapper">
          <div className="notice-turn-off-vpn">
            <VpnSVG model={models.blue} />
            <div className="text-border">
              <p className="first">
                <span className="vpn">VPN</span> Detected!
              </p>
              <p className="second">
                Turn off your vpn in order to access site's contents!
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default NoticeTurnOffVPN;
