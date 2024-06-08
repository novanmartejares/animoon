"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import { motion } from "framer-motion";
import useAnimationOnce from "@/hooks/useAnimationOnce";
import { useRef } from "react";
import LoadingSpinner from "@/component/loadingSpinner";

import Share from "@/component/Share/Share";
const DynamicHero = dynamic(() => import("@/component/Hero/hero"), {
  ssr: false,
});
const DynamicTrend = dynamic(() => import("@/component/Trending/Trending"), {
  ssr: false,
});
const DynamicFeature = dynamic(
  () => import("@/component/Featured/Featured"),
  {}
);
const DynamicMain = dynamic(
  () => import("@/component/MainContainer/MainContainer"),
  {}
);

export default function Homeo() {
  const [time, setTime] = useState(new Date());
  const [hours, setHours] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);

    if (localStorage.getItem("first-hour")) {
      // split the existing values into an array
      let vals = localStorage.getItem("first-hour").split(",");

      // if the value has not already been added
      if (!vals.includes(time.getHours().toString())) {
        // add the value to the array
        vals.push(time.getHours().toString());

        // sort the array
        vals.sort();

        // join the values into a delimeted string and store it
        localStorage.setItem("first-hour", vals.join(","));
      }
    } else {
      // the key doesn't exist yet, add it and the new value
      localStorage.setItem("first-hour", time.getHours().toString());
    }
    if (time.getHours()===23 && time.getMinutes === 1) {
      localStorage.removeItem("first-hour")
    }
    setHours(localStorage.getItem("first-hour") ? parseInt(localStorage.getItem("first-hour").split(",")[0]) : 0);

    if (localStorage.getItem("first-minute")) {
      // split the existing values into an array
      let vals = localStorage.getItem("first-minute").split(",");

      // if the value has not already been added
      if (!vals.includes(time.getMinutes().toString())) {
        // add the value to the array
        vals.push(time.getMinutes().toString());

        // sort the array

        // join the values into a delimeted string and store it
        localStorage.setItem("first-minute", vals.join(","));
      }
    } else {
      // the key doesn't exist yet, add it and the new value
      localStorage.setItem("first-minute", time.getMinutes().toString());
    }
    if (time.getHours()===23 && time.getMinutes === 1) {
      localStorage.removeItem("first-minute")
    }

    setMinute(localStorage.getItem("first-minute") ? parseInt(localStorage.getItem("first-minute").split(",")[0]) : 0);

    if (localStorage.getItem("first-second")) {
      // split the existing values into an array
      let vals = localStorage.getItem("first-second").split(",");

      // if the value has not already been added
      if (!vals.includes(time.getSeconds().toString())) {
        // add the value to the array
        vals.push(time.getSeconds().toString());

        // sort the array

        // join the values into a delimeted string and store it
        localStorage.setItem("first-second", vals.join(","));
      }
    } else {
      // the key doesn't exist yet, add it and the new value
      localStorage.setItem("first-second", time.getSeconds().toString());
    }
    if (time.getHours()===23 && time.getMinutes === 1) {
      localStorage.removeItem("first-second")
    }
    setSecond(localStorage.getItem("first-second") ? parseInt(localStorage.getItem("first-second").split(",")[0]) : 0);
  }, []);
  const hour = time.getHours();
  const min = time.getMinutes();
  const sec = time.getSeconds();
  const ref = useRef(null);
  if (
    (
      second < 35
        ? ((hours<18 ? (hour === hours + 6) : hour === 21 ) && min === minute && sec === second + 20)
        : ((hours<18 ? (hour === hours + 6) : hour === 21 ) && min === minute && sec === 20)
    )
      ? (second < 35
        ? ((hours<18 ? (hour === hours + 6) : hour === 21 ) && min === minute && sec === second + 20)
        : ((hours<18 ? (hour === hours + 6) : hour === 21 ) && min === minute && sec === 20))
      : (second < 35
      ? ((hours<18 ? (hour === hours + 6) : hour === 21 ) &&
        (minute < 60 ? min === minute + 1 : min === 1) &&
        sec === second + 20)
      : ((hours<18 ? (hour === hours + 6) : hour === 21 ) && min === minute && sec === 20))
  ) {
    window.location.reload();
  }

  const isInView = useAnimationOnce(ref);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ x: [-window.innerWidth / 2, 0], opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <DynamicHero hours={hours} minute={minute} hour={hour} min={min} />
      <DynamicTrend hours={hours} minute={minute} hour={hour} min={min} />
      <Share />
      <DynamicFeature hours={hours} minute={minute} hour={hour} min={min}/>
      <DynamicMain hours={hours} minute={minute} hour={hour} min={min}/>
    </motion.div>
  );
}
