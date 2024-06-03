import React from "react";
import notFound from "../Images/notFound.jpg";

export default function NoPage() {
  return (
    <div className="outer-no-event">
      <img src={notFound} className="not-found" />
    </div>
  );
}
