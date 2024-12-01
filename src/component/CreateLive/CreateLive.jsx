"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import "./createLive.css";
import {
  FaCircle,
  FaClosedCaptioning,
  FaInfoCircle,
  FaPlayCircle,
} from "react-icons/fa";
import { AiFillAudio } from "react-icons/ai";
import { FaCircleCheck } from "react-icons/fa6";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CreateLive = (props) => {
  const localStorageWrapper = () => {
    if (typeof window !== "undefined" && window.localStorage) {
      return {
        getItem: (key) => localStorage.getItem(key),
        setItem: (key, value) => localStorage.setItem(key, value),
        removeItem: (key) => localStorage.removeItem(key),
        clear: () => localStorage.clear(),
      };
    } else {
      // Handle the case when localStorage is not available
      return {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
        clear: () => {},
      };
    }
  };

  // Usage
  const ls = localStorageWrapper();
  const [subIsSelected, setSubIsSelected] = useState(true);
  const [byTime, setByTime] = useState(true);
  const [openCal, setOpenCal] = useState(false);
  const [newTime, setNewTime] = useState(false);
  const [cachedData, setCachedData] = useState(null); // State to store cached data

  const [value, setValue] = useState(
    ls.getItem("calendarValue")
      ? new Date(ls.getItem("calendarValue")) 
      : new Date()
  );

  const hours = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0")
  );

  const [selectedHourIndex, setSelectedHourIndex] = useState(
    ls.getItem("selectedHourIndex")
      ? parseInt(ls.getItem("selectedHourIndex"))
      : 0
  );
  const [selectedMinuteIndex, setSelectedMinuteIndex] = useState(
    ls.getItem("selectedMinuteIndex")
      ? parseInt(ls.getItem("selectedMinuteIndex"))
      : 0
  );

  const handleHourScroll = (direction) => {
    setSelectedHourIndex((prev) =>
      direction === "up"
        ? Math.max(prev - 1, 0)
        : Math.min(prev + 1, hours.length - 1)
    );
    ls.setItem("selectedHourIndex", selectedHourIndex.toString());
  };

  const handleMinuteScroll = (direction) => {
    setSelectedMinuteIndex((prev) =>
      direction === "up"
        ? Math.max(prev - 1, 0)
        : Math.min(prev + 1, minutes.length - 1)
    );
    ls.setItem("selectedMinuteIndex", selectedMinuteIndex.toString());
  };

  const saveObject = async () => {
    const myObject = {
      id: '',
      animeId: props.data.anime.info.id,
      time: hours[selectedHourIndex] + ":" + minutes[selectedMinuteIndex],
      date: value?.toDateString(),
      sub: subIsSelected,
    };

    try {
      const response = await fetch(
        `/api/createLive/${props.data.anime.info.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: myObject }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save object");
      }

      const result = await response.json();
      console.log(result); // { success: true }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchCachedData = async () => {
    try {
      const response = await fetch(
        `/api/createLive/${props.data.anime.info.id}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cached data");
      }

      const data = await response.json();
      setCachedData(data.data); // Set the cached data
      console.log(data); // { data: {...} } or { data: 'No cached data' }
      return data.data;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  useEffect(() => {
    const checkAndSaveObject = async () => {
      const existingData = await fetchCachedData();

      // Only save the object if it doesn't already exist or has changed
      if (
        !existingData ||
        existingData.time !==
          hours[selectedHourIndex] + ":" + minutes[selectedMinuteIndex] ||
        existingData.date !== value ||
        existingData.sub !== subIsSelected
      ) {
        saveObject();
      }
    };

    checkAndSaveObject();
  }, [
    value,
    selectedHourIndex,
    selectedMinuteIndex,
    subIsSelected,
    props.data.anime.info.id,
  ]); // Dependency array updated

  return (
    <div className="kinj">
      <div>
        <div className="flex gap-1 items-center specif">
          <Link href={"/"}>
            <div className="homo">Home</div>
          </Link>
          <div className="dotoi">&#x2022;</div>
          <div className="homo">Watch together</div>
          <div className="doto">&#x2022;</div>
          <div className="namo">Create a new room</div>
        </div>
      </div>
      <div>Create a new room</div>
      <div className="flex">
        <div className="anime-container">
          {/* Blurred Background Image */}
          <div
            className="background-image"
            style={{
              backgroundImage: `
            linear-gradient(rgba(93, 93, 93, 0.701), rgba(93, 93, 93, 0.701)), /* Color overlay */
            url('https://www.transparenttextures.com/patterns/dots.png'), /* Dotted pattern */
            url(${props.data.anime.info.poster}) /* Background image */
          `,
            }}
          ></div>

          {/* Foreground Content */}
          <div className="anime-content">
            <div className="anime-pos">
              <img src={props.data.anime.info.poster} alt="anime poster" />
            </div>
            <div className="anime-namik">{props.data.anime.info.name}</div>
            <div className="third-reich">
              <div className="inner-reich">
                <div className="inner-texi rat">
                  {props.data.anime.info.stats.rating}
                </div>
                <div className="inner-texi qual">
                  {props.data.anime.info.stats.quality}
                </div>
                <div className="inner-texi subE">
                  <div>
                    <FaClosedCaptioning size={14} />{" "}
                  </div>
                  <div>{props.data.anime.info.stats.episodes.sub}</div>
                </div>
                <div className="inner-texi dubE">
                  <div>
                    <AiFillAudio size={14} />{" "}
                  </div>
                  <div>{props.data.anime.info.stats.episodes.dub}</div>
                </div>
              </div>
              <div className="doto">&#x2022;</div>
              <div className="inner-texi">
                {props.data.anime.info.stats.type}
              </div>
              <div className="doto">&#x2022;</div>
              <div className="inner-texi">
                {props.data.anime.info.stats.duration}
              </div>
            </div>
            <div className="descriptol">
              {props.data.anime.info.description.length < 216
                ? props.data.anime.info.description
                : props.data.anime.info.description.slice(0, 216) + "..."}
            </div>
          </div>
        </div>

        <div className="rn-all">
          <div className="rn1">
            <div className="rn-head">
              <div className="col-i">
                <FaInfoCircle />
              </div>
              <div>Room Name</div>
            </div>
            <div className="rn-bott">
              <div className="rn-b1t">
                <input
                  className="rn-input"
                  type="text"
                  defaultValue={`Watch ${props.data.anime.info.name} together`}
                  name="text"
                />
              </div>
              <div className="rn-sug">
                You can change its name or just leave it by default
              </div>
            </div>
          </div>
          <div className="rn1 rn2">
            <div className="rn-head rn-mar">
              <div className="col-i">
                <FaPlayCircle />
              </div>{" "}
              <div>Sources</div>
            </div>
            <div className="rn-bott rn-ti">
              <div className="rn-sugg">
                Chosen source will be played in your room
              </div>
              <div className="rn-b2t">
                <div
                  className={`${subIsSelected ? "subo-col" : "subo"}`}
                  onClick={() => setSubIsSelected(true)}
                >
                  <div>
                    <FaClosedCaptioning size={14} />{" "}
                  </div>
                  <div>SUB</div>
                </div>
                <div
                  className={`${subIsSelected ? "subo" : "subo-col"}`}
                  onClick={() => setSubIsSelected(false)}
                >
                  <div>
                    <AiFillAudio size={14} />{" "}
                  </div>
                  <div>DUB</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rb-all">
          <div className="rb1">
            <div className="upp-bi">
              <div className="upp-bi1" onClick={() => setByTime(true)}>
                <div className={`${byTime ? "subi-col" : "subi"}`}>
                  {byTime ? <FaCircleCheck /> : <FaCircle />}
                </div>
                <div>Start by time</div>
              </div>
              <div className="upp-bi1" onClick={() => setByTime(false)}>
                <div className={`${byTime ? "subi" : "subi-col"}`}>
                  {byTime ? <FaCircle /> : <FaCircleCheck />}
                </div>
                <div>Start manual</div>
              </div>
            </div>
            {byTime ? (
              <div>
                <div className="rn-sugg rn-is">
                  This room will be automatically started, please schedule it
                </div>
                <div
                  className="str-t"
                  onClick={() => setOpenCal(true)}
                  style={{ marginTop: "20px" }}
                >
                  {value
                    ? hours[selectedHourIndex] +
                      ":" +
                      minutes[selectedMinuteIndex] +
                      " " +
                      value.toDateString()
                    : `Start Time`}
                </div>
              </div>
            ) : (
              <div className="rn-sugg rn-is">
                You can start this room whenever you want
              </div>
            )}
          </div>
          <div className="rb1">
            <div className="rby">
              <div>Public</div>
              <div className="rn-sug tyi">
                With OFF, only who has the link can see this room.
              </div>
            </div>
            <div className="upp-bi1">
              <div className="cr1">Create Room</div>
              <div className="cr2">Cancel</div>
            </div>
          </div>
        </div>
      </div>
      {openCal ? (
        <div className="overlay">
          <div className="cal-all">
            <h1>React Calendar</h1>
            <Calendar
              onChange={(newValue) => {
                setValue(newValue); // Update state
                ls.setItem("calendarValue", newValue); // Update localStorage
              }}
              value={value}
            />
            <div className="cal-ut">
              <div className="cal-ut1" onClick={() => setOpenCal(false)}>
                Cancel
              </div>
              <div
                className="cal-ut1"
                onClick={() => setNewTime(true) & setOpenCal(false)}
              >
                OK
              </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              <h2>Selected Date:</h2>
              <p>{value.toDateString()}</p>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {newTime ? (
        <div className="overlay">
          <div className="ti-all">
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <h2>Select Time</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                {/* Hour Selector */}
                <div>
                  <button
                    className="middHo"
                    style={{ marginTop: "20px", marginBottom: "20px" }}
                    onClick={() => handleHourScroll("up")}
                  >
                    ▲
                  </button>
                  <div
                    style={{
                      height: "100px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                    }}
                  >
                    <span className="topHo">
                      {hours[selectedHourIndex - 1] || ""}
                    </span>
                    <span
                      className="middHo"
                      style={{ fontSize: "32px", fontWeight: "bold" }}
                    >
                      {hours[selectedHourIndex]}
                    </span>
                    <span className="topHo">
                      {hours[selectedHourIndex + 1] || ""}
                    </span>
                  </div>
                  <button
                    className="middHo"
                    style={{ marginTop: "20px", marginBottom: "0px" }}
                    onClick={() => handleHourScroll("down")}
                  >
                    ▼
                  </button>
                </div>
                <span style={{ fontSize: "32px", fontWeight: "bold" }}>:</span>
                {/* Minute Selector */}
                <div>
                  <button
                    className="middHo"
                    style={{ marginTop: "20px", marginBottom: "20px" }}
                    onClick={() => handleMinuteScroll("up")}
                  >
                    ▲
                  </button>
                  <div
                    style={{
                      height: "100px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                    }}
                  >
                    <span className="topHo">
                      {minutes[selectedMinuteIndex - 1] || ""}
                    </span>
                    <span
                      className="middHo"
                      style={{ fontSize: "32px", fontWeight: "bold" }}
                    >
                      {minutes[selectedMinuteIndex]}
                    </span>
                    <span className="topHo">
                      {minutes[selectedMinuteIndex + 1] || ""}
                    </span>
                  </div>
                  <button
                    className="middHo"
                    style={{ marginTop: "20px", marginBottom: "0px" }}
                    onClick={() => handleMinuteScroll("down")}
                  >
                    ▼
                  </button>
                </div>
              </div>
              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <h3>
                  Selected Time:{" "}
                  {`${hours[selectedHourIndex]}:${minutes[selectedMinuteIndex]}`}
                </h3>
              </div>
              <div className="cal-ut">
                <div className="cal-ut1" onClick={() => setNewTime(false)}>
                  Cancel
                </div>
                <div className="cal-ut1" onClick={() => setNewTime(false)}>
                  OK
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div>{JSON.stringify(cachedData)}</div>
    </div>
  );
};

export default CreateLive;
