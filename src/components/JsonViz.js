import React from "react";
import "./JsonViz.css";

export const JsonViz = ({ obj }) => {
  if (!obj) {
    return;
  }
  const keys = Object.keys(obj);
  return (
    <div className="indent">
      {keys.map((key) => {
        return (
          <div>
            {obj[key] && (
              <>
                <h5>{key}</h5>
                {typeof obj[key] === "object" && <JsonViz obj={obj[key]} />}
                {typeof obj[key] !== "object" && (
                  <div className="indent">{obj[key]}</div>
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
