import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SERVER_ADDR } from "../App";
import { type } from "@testing-library/user-event/dist/type";
import { JsonViz } from "../components/JsonViz";
import { MissingPerson } from "../models/MissingPerson";
import { GoToNamus } from "../components/GoToNamus";
import { Back } from "../components/Back";

export const PersonPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [detail, setDetail] = useState(null);
  const [person, setPerson] = useState(null);

  const fetchPerson = () => {
    axios.get(`http://${SERVER_ADDR}:5050/missing/${id}`).then((response) => {
      setData(response.data);
      setPerson(new MissingPerson(response.data));
    });
  };

  useEffect(() => {
    fetchPerson();
  }, []);

  return (
    <div>
      <h2>Missing Person</h2>
      {data && (
        <>
          <div className="person-info">
            {data.images?.length > 0 && (
              <img
                src={
                  "https://www.namus.gov/" +
                  data.images[0]?.files?.thumbnail.href
                }
                alt="Missing person"
              />
            )}
            {data.images?.length === 0 && <i>No image available</i>}
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
            <h4 onClick={() => setDetail(!detail)}>
              {detail ? "Hide" : "Show"} Raw Data
            </h4>
            {detail && (
              <div className="scrolling">
                <JsonViz obj={data} />
              </div>
            )}
          </div>
          <GoToNamus caseNum={id} type="MissingPersons" />
        </>
      )}
    </div>
  );
};
