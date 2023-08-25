import React from "react";
import { useNavigate } from "react-router-dom";

import "./Back.css";

export const Back = () => {
  const nav = useNavigate();
  return (
    <div className="back-forward">
      <div className="back-button" onClick={() => nav(-1)}>
        {"<"} Back
      </div>
      <div className="back-button" onClick={() => nav(1)}>
        Forward {">"}
      </div>
    </div>
  );
};
