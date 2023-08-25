import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SERVER_ADDR } from "../App";
import { JsonViz } from "../components/JsonViz";

export const DoePage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [detail, setDetail] = useState(false);

  const fetchPerson = () => {
    axios
      .get(`http://${SERVER_ADDR}:5050/unidentified/${id}`)
      .then((response) => {
        // handle success
        setData(response.data);
      });
  };

  useEffect(() => {
    fetchPerson();
  }, []);

  return (
    <div>
      <h2>Unidentified Person</h2>

      {data && (
        <>
          <div>
            <div>
              Name: {data["First Name"]} {data["Last Name"]}
            </div>
            <div>City: {data["City"]}</div>
            <div>County: {data["County"]}</div>
            <div>State: {data["State"]}</div>
            <div>Date Last Seen: {data["DLC"]}</div>
            <div>Date Updated: {data["Date Modified"]}</div>
            <div>Age: {data["Missing Age"]}</div>
            <div>Sex: {data["Sex"]}</div>
          </div>

          <div>
            <h4
              onClick={() => {
                setDetail(!detail);
              }}
            >
              Raw Data
            </h4>
            {detail && (
              <div className="scrolling">
                <JsonViz obj={data} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
