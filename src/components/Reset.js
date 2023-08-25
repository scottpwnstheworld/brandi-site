import axios from "axios";
import React, { useState } from "react";

export const Reset = () => {
  const [done, setDone] = useState(false);

  const reset = async () => {
    const result = await axios.delete("http://localhost:5050/missing");
    setDone(true);
  };
  return (
    <button disabled={done} onClick={reset}>
      RESET DATABASE
    </button>
  );
};
