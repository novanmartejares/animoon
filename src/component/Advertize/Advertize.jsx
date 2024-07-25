"use client";
import React, { useEffect, useState } from "react";
import "./advertize.css";

const Advertize = () => {
  const [time, setTime] = useState(new Date());
  const [adver, setAdver] = useState(
    localStorage.getItem("truth") ? localStorage.getItem("truth") : "true"
  );

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);

    const openT = parseInt(localStorage.getItem("openT")) || 0;
    const openD = parseInt(localStorage.getItem("openD")) || 0;
    const openH = parseInt(localStorage.getItem("openH")) || 0;

    const currentMinutes = time.getMinutes();
    const currentDate = time.getDate();
    const currentHours = time.getHours();

    const targetMinutes = (openT + 5) % 60;

    const isSameDate = openD === currentDate;
    const isSameHour = openH === currentHours;
    const isMinutesConditionMet =
      openT > 55
        ? !isSameHour
        : currentMinutes > targetMinutes;

    console.log(
      `Current Minutes: ${currentMinutes}, Target Minutes: ${targetMinutes}`
    );
    console.log(`Open Date: ${openD}, Current Date: ${currentDate}`);
    console.log(`Open Hour: ${openH}, Current Hour: ${currentHours}`);
    console.log(`Minutes Condition Met: ${isMinutesConditionMet}`);

    if (isSameDate && isSameHour && !isMinutesConditionMet) {
      setAdver("false");
    } else {
      setAdver("true");
    }

    return () => clearInterval(interval);
  }, [time]);

  function Newtab() {
    localStorage.setItem("openT", time.getMinutes().toString());
    localStorage.setItem("openD", time.getDate().toString());
    localStorage.setItem("openH", time.getHours().toString());
    localStorage.setItem("truth", "false");
    window.open(
      "https://www.highrevenuenetwork.com/hnq4sfr7se?key=fa60dc3aeeb0a08aa0476e80986ad233"
    );
  }

  return (
    <div
      className="Advertize"
      style={{ zIndex: adver === "true" ? 100 : -1 }}
      onClick={() => {
        setAdver("false");
        Newtab();
      }}
    ></div>
  );
};

export default Advertize;
