import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_ADDR } from "../App";
import "./Browse.css";
import { MissingTable } from "../components";

export const Browse = () => {
  const [MPData, setMPData] = useState(null);
  const [UIData, setUIData] = useState(null);
  const navigate = useNavigate();

  const fetchMPData = () => {
    axios.get(`http://${SERVER_ADDR}:5050/missing`).then((response) => {
      // handle success
      setMPData(response.data);
    });
  };

  const fetchUIData = () => {
    axios.get(`http://${SERVER_ADDR}:5050/unidentified`).then((response) => {
      // handle success
      setUIData(response.data);
    });
  };

  const [browsing, setBrowsing] = useState(null);
  const chooseBrowse = (event) => {
    setBrowsing(event.target.value);
  };

  useEffect(() => {
    fetchMPData();
    fetchUIData();
  }, []);

  return (
    <div className="browse-page">
      <h2>Browse</h2>

      <div className="browse-buttons">
        <button value="missing" onClick={chooseBrowse}>
          Missing
        </button>
        <button value="unidentified" onClick={chooseBrowse}>
          Unidentified
        </button>
      </div>

      {MPData && (
        <div>
          {browsing === "missing" && <MissingTable data={MPData} />}
          {/* {browsing === "missing" &&
            MPData.map((row) => {
              return (
                <div
                  key={row._id}
                  className="mp-row"
                  onClick={() =>
                    navigate(`/browse/missing/${row["Case Number"]}`)
                  }
                >
                  {row["First Name"]} {row["Last Name"]}
                </div>
              );
            })} */}
          {browsing === "unidentified" &&
            UIData.map((row) => {
              console.log("row is", row);
              return (
                <div
                  key={row._id}
                  className="mp-row"
                  onClick={() =>
                    navigate(`/browse/unidentified/${row["Case"]}`)
                  }
                >
                  {row["Case"]}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};
