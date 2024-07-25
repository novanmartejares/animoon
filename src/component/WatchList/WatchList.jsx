"use client";
import React from "react";
import Card from "../Card/Card";
import { FaHeart } from "react-icons/fa";
import "./watchList.css";

// Utility function to fetch and combine data from all options
const getCombinedData = (type) => {
  const options = [
    { key: "Watching", value: "1" },
    { key: "On-Hold", value: "2" },
    { key: "Plan to Watch", value: "3" },
    { key: "Dropped", value: "4" },
    { key: "Completed", value: "5" },
  ];

  let combinedData = [];

  options.forEach((option) => {
    if (!type || type === option.value) {
      const key = `animeData_${option.key}`;
      const data = localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key))
        : [];
      combinedData = [...combinedData, ...data];
    }
  });

  // Sort combined data by timestamp in descending order (most recent first)
  combinedData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return combinedData;
};

const WatchList = (props) => {
  const data = getCombinedData(props.type);
  const cards = data?.map((data, idx) => {
    return <Card key={data.id} data={data} delay={idx * 0.05} itsMe={"true"} />;
  });

  const navigateToType = (type) => {
    window.location.href = type
      ? `/user/watch-list?type=${type}`
      : "/user/watch-list";
  };

  const getOptionName = (type) => {
    switch (type) {
      case "1":
        return "Watching";
      case "2":
        return "On-Hold";
      case "3":
        return "Plan to Watch";
      case "4":
        return "Dropped";
      case "5":
        return "Completed";
      default:
        return "All";
    }
  };

  return (
    <div className="alltio">
      <div className="allInnr">
        <div className="entFa">
          <div className="watCFa">
            <div className="watC">
              <FaHeart />
              Watch List
            </div>
            <div></div>
          </div>
          <div className="butM">
            <div className="butInnM">
              <div
                className={`namil ${!props.type ? "selectedNO" : ""}`}
                onClick={() => navigateToType(null)}
              >
                All
              </div>
              <div
                className={`oamil ${props.type === "1" ? "selectedNO" : ""}`}
                onClick={() => navigateToType("1")}
              >
                Watching
              </div>
              <div
                className={`oamil ${props.type === "2" ? "selectedNO" : ""}`}
                onClick={() => navigateToType("2")}
              >
                On-Hold
              </div>
              <div
                className={`oamil ${props.type === "3" ? "selectedNO" : ""}`}
                onClick={() => navigateToType("3")}
              >
                Plan to Watch
              </div>
              <div
                className={`oamil ${props.type === "4" ? "selectedNO" : ""}`}
                onClick={() => navigateToType("4")}
              >
                Dropped
              </div>
              <div
                className={`oamil ${props.type === "5" ? "selectedNO" : ""}`}
                onClick={() => navigateToType("5")}
              >
                Completed
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div>
        <div className="ddidd">
          <div className="drd-col">
            <div className="darg d-flex a-center j-center">
              {cards.length > 0 ? (
                cards
              ) : (
                <div className="EmLi">
                  <div className="listEmp">
                    {getOptionName(props.type)} list is empty
                  </div>
                  <div className="adviso">{'<^ Add some animes to the list ^>'}</div>
                  <div className="flex"><div>\__---</div><div className="adviso">/\/\/\/\/\/\</div><div>---__/</div></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchList;
