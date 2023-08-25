import React, { useState } from "react";
import axios from "axios";

const targets = {
  missing: "missing",
  unid: "unidentified",
};

export const BulkUploader = () => {
  const [input, setInput] = useState("");
  const [pct, setPct] = useState(0);
  const [target, setTarget] = useState(targets.missing);

  const inputChange = (event) => {
    setInput(event.target.value);
  };

  const typeChange = (event) => {
    setTarget(event.target.value);
  };

  console.log("target is", target);

  const doSubmit = async () => {
    let jsonBlock;
    try {
      jsonBlock = JSON.parse(input);
    } catch (e) {
      console.log("bad json");
      return;
    }
    const chunkSize = 20;
    for (let i = 0; i < jsonBlock.length; i += chunkSize) {
      const chunk = jsonBlock.slice(i, i + chunkSize);
      await axios.post(`http://localhost:5050/${target}/bulk`, chunk);
    }
  };

  return (
    <div className="uploader">
      <select name="Target" id="targets" onChange={typeChange}>
        <option value="missing">Missing Persons</option>
        <option value="unidentified">Unidentified</option>
      </select>
      <textarea onChange={inputChange} />
      {pct !== 0 && <p>{pct}%</p>}
      <button onClick={doSubmit}>submit</button>
    </div>
  );
};
