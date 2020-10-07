import React from "react";

function LandingPage({ content, ...props }) {
  return <div {...props}>{content}</div>;
}

export default LandingPage;
