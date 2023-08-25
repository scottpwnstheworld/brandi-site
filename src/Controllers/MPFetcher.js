import axios from "axios";
import React, { useState } from "react";

export const MPFetcher = () => {
  const MP_DATA = {};

  const fetchAll = async (hard) => {
    if (MP_DATA.length === 0 || hard) {
      axios.get("http://localhost:5050/missing").then((response) => {
        // handle success
        // response.data;
      });
    }
  };
};
