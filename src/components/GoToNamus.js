import React from "react";

export const GoToNamus = ({ caseNum, type }) => {
  return (
    <a href={`https://www.namus.gov/${type}/Case#/${caseNum.slice(2)}`}>
      <div>Go to Namus profile</div>
    </a>
  );
};
