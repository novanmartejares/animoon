"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase"; // Ensure this points to your firebase.js file
import "./all.css";
import { FaThLarge } from "react-icons/fa";

const Page = () => {
  const [cachedData, setCachedData] = useState([]); // State to store cached data

  const fetchAllDocs = async () => {
    try {
      const liveRoomsRef = collection(db, "liveRooms"); // Reference to the liveRooms collection
      const querySnapshot = await getDocs(liveRoomsRef); // Fetch all documents

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Include document ID
        ...doc.data(), // Include document data
      }));

      setCachedData(data); // Update state with fetched data
      console.log("Fetched data:", data);
      alert("Fetched data:", data);

      return data;
    } catch (error) {
      console.error("Error fetching data from Firestore:", error);
      alert("Error fetching data from Firestore:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchAllDocs(); // Fetch data on component mount
  }, []);

  const getTimeDifference = (ko) => {
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const differenceInSeconds = currentTime - ko.createTime.seconds;

    if (differenceInSeconds < 3600) {
      // Less than an hour
      return `${Math.floor(differenceInSeconds / 60)} minutes ago`;
    } else {
      // Greater than or equal to an hour
      return `${(differenceInSeconds / 3600).toFixed(0)} hours ago`;
    }
  };

  // alert(cachedData)

  return (
    <div className="fate-l">
      <div className="found-al">
        <div>
          {" "}
          <div className="topi-l">
            <div className="opt-1">Home</div>
            <div className="opt-2">&#x2022;</div>
            <div className="opt-3">Watch together</div>
          </div>
          <div className="topi-2">
            <div className="hed-1">Browse</div>
            <div className="topi-l">
              <div className="emir">All</div>
              <div className="emir">On-air</div>
              <div className="emir">Sceduled</div>
              <div className="emir">Waiting</div>
              <div className="emir">Ended</div>
              <div className="kirt">
                <div>
                  <FaThLarge />
                </div>
                <div>My Rooms</div>
              </div>
            </div>
          </div>
        </div>

        <div className="found-l">
          {cachedData.map((ko, index) => (
            <div className="koil" key={index}>
              {/* Display Room Information */}
              <div className="container">
                <div className="background">
                  <img src={ko.poster} alt="Poster" />
                </div>
                <div className="overlay"></div>
                <div className="content">
                  <div className="tag">
                    <div className="epol">{ko.sub ? "SUB" : "DUB"}</div>
                  </div>
                  <img className="poster" src={ko.poster} alt="Poster" />
                  <div className="episode">
                    <div className="epoy">{ko.episode || "N/A"}</div>
                  </div>
                </div>
              </div>

              {/* Additional Room Details */}
              <div className="sec-apt">
                <div>
                  <img
                    className="rando"
                    src={ko.randomImage}
                    alt="Random"
                    style={{ maxWidth: "100px" }}
                  />
                </div>
                <div className="mid0">
                  <div className="an-name">{ko.name || "No Room Name"}</div>
                  <div className="rn-name">{ko.roomName || "No Room Name"}</div>
                  <div className="bott-G">
                    <div className="ott-1">{ko.userName || "Anonymous"}</div>
                    <div className="ott-2">&#x2022;</div>
                    <div className="ott-3">{getTimeDifference(ko)}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
