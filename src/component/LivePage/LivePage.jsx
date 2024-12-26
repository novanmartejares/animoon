"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { PiBroadcastFill } from "react-icons/pi";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../../firebase";
import "./live.css";
import Link from "next/link";
import Image from "next/image";
import { FaClock, FaEye, FaInfoCircle } from "react-icons/fa";

export default function LivePage(props) {
  const { data: session } = useSession();

  const [cachedData, setCachedData] = useState(null);
  const fetchCachedData = async (id) => {
    try {
      const docRef = doc(collection(db, "liveRooms"), id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setCachedData(data);
        console.log("Cached data:", data);
        return data;
      } else {
        console.log("No cached data found.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching cached data from Firestore:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchCachedData(props.id);
  }, []);

  const getTimeDifference = () => {
    if (!cachedData?.createTime?.seconds) return "N/A";

    const createdTime = cachedData.createTime.seconds * 1000; // Convert seconds to milliseconds
    const currentTime = Date.now();
    const difference = currentTime - createdTime;

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return `- Created ${seconds} seconds ago`;
    if (minutes < 60) return `- Created ${minutes} minutes ago`;
    if (hours < 24) return `- Created ${hours} hours ago`;
    if (days < 30) return `- Created ${days} days ago`;
    if (months < 12) return `- Created ${months} months ago`;
    return `- Created ${years} years ago`;
  };

  function Timer(date, time) {
    const [timeElapsed, setTimeElapsed] = useState("");

    useEffect(() => {
      const startTime = new Date(`${date} ${time}`).getTime();

      const updateTimer = () => {
        const now = Date.now();
        const difference = now - startTime;

        if (difference < 0) {
          setTimeElapsed("Timer not started yet!");
          return;
        }

        const seconds = Math.floor((difference / 1000) % 60);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));

        const formatTime = (value) => (value < 10 ? `0${value}` : value);

        if (days > 0) {
          setTimeElapsed(
            `${formatTime(days)} : ${formatTime(hours)} : ${formatTime(
              minutes
            )} : ${formatTime(seconds)}`
          );
        } else {
          setTimeElapsed(
            `${formatTime(hours)} : ${formatTime(minutes)} : ${formatTime(
              seconds
            )}`
          );
        }
      };

      const timerId = setInterval(updateTimer, 1000);

      // Clean up the interval when the component unmounts
      return () => clearInterval(timerId);
    }, [date, time]);

    return <div>{timeElapsed}</div>;
  }

  function ViewerCounter() {
    const [viewers, setViewers] = useState(0);

    useEffect(() => {
      const viewerId = `viewer_${Date.now()}`;
      const viewerDoc = doc(db, "activeViewers", viewerId);

      const updateViewerCount = async () => {
        // Add the current viewer with a timestamp
        await setDoc(viewerDoc, {
          joinedAt: serverTimestamp(),
        });

        // Remove the viewer on disconnect
        window.addEventListener("beforeunload", async () => {
          await setDoc(viewerDoc, null); // Clean up on page close
        });
      };

      updateViewerCount();

      // Listen for real-time updates to the activeViewers collection
      const unsubscribe = onSnapshot(
        collection(db, "activeViewers"),
        (snapshot) => {
          setViewers(snapshot.size); // Count all active documents
        }
      );

      // Cleanup: remove listener and document on unmount
      return async () => {
        unsubscribe();
        await setDoc(viewerDoc, null);
      };
    }, []);

    return (
      <div>
        <h3>{viewers} viewers</h3>
      </div>
    );
  }

  return (
    <div className="foundati">
      <div>
        <div>
          <div>
            <div className="five-str">
              <div>
                <PiBroadcastFill />
              </div>
              <div>{cachedData?.roomName}</div>
            </div>
            <div className="five-str">
              <div>{props.datal.anime.info.name}</div>
              <div className="opt-2">&#x2022;</div>
              <div>{cachedData?.sub ? "SUB" : "DUB"}</div>
              <div className="opt-2">&#x2022;</div>
              <div>{cachedData?.episode}</div>
            </div>
          </div>
          <div>
            <div className="video-player">
              <div className="hls-container">
                {/* {clickedId === props.epId && props.dataj ? (
                  <ArtPlayer
                    data={props.data}
                    epId={props.epId}
                    anId={props.anId}
                    epNumb={epNumb}
                    bhaiLink={bhaiLink}
                    trutie={trutie}
                    epNum={epiod}
                    selectedServer={selectedServer}
                    onn1={onn1}
                    onn2={onn2}
                    onn3={onn3}
                    getData={getData}
                    err={err}
                    subtitles={subtitles}
                    introd={introd}
                    outrod={outrod}
                    durEp={props.datao.anime.moreInfo.duration}
                    subEp={props.datao.anime.info.stats.episodes.sub}
                    dubEp={props.datao.anime.info.stats.episodes.dub}
                    ratUra={props.datao.anime.info.stats.rating}
                    imgUra={props.datao.anime.info.poster}
                    nameUra={props?.datao?.anime?.info?.name}
                    quality={quality}
                    sub={sub}
                    IsLoading={IsLoading}
                  />
                ) : (
                  <div
                    className="d-flex a-center j-center"
                    style={{ height: "100%" }}
                  >
                    <Image
                      src={loading}
                      style={{
                        display: "block",
                        height: 100,
                        width: 100,
                        margin: "auto",
                      }}
                    />
                  </div>
                )} */}
              </div>
            </div>
          </div>
          <div className="bit-co">
            <div className="biit-1">
              <div>
                <img
                  className="biit-img"
                  src={cachedData?.randomImage}
                  alt=""
                />
              </div>
              <div>
                <div className="user-N">{cachedData?.userName}</div>
                <div className="time-N">{getTimeDifference()}</div>
              </div>
            </div>
            <div className="biit-more">
              <div className="biit-view">
                <div>
                  <FaEye />
                </div>
                <div>{ViewerCounter()}</div>
              </div>
              <div className="biit-time">
                <div>
                  <FaClock />
                </div>
                <div>{Timer(cachedData?.date, cachedData?.time)}</div>
              </div>
            </div>
          </div>

          <div className="kenpa-1">
            <div>
              <img
                className="kenpa-img"
                src={props.datal.anime.info.poster}
                alt=""
              />
            </div>
            <div className="kenpa-soul">
              <div className="kenpa-name">{props.datal.anime.info.name}</div>
              <div className="kenpa-sts">
                <div className="kenpa-sts-1">
                  {props.datal.anime.info.stats.rating}
                </div>
                <div className="kenpa-sts-2">
                  {props.datal.anime.info.stats.quality}
                </div>
                <div className="kenpa-sts-3">
                  {props.datal.anime.info.stats.episodes.sub}
                </div>
                <div className="kenpa-sts-4">
                  {props.datal.anime.info.stats.episodes.dub}
                </div>
                <div className="opt-2 spec">&#x2022;</div>
                <div className="kenpa-sts-6">
                  {props.datal.anime.info.stats.type}
                </div>
                <div className="opt-2">&#x2022;</div>
                <div className="kenpa-sts-8">
                  {props.datal.anime.info.stats.duration}
                </div>
              </div>
              <div className="decro">
                {props.datal.anime.info.description.length < 300
                  ? props.datal.anime.info.description
                  : props.datal.anime.info.description.slice(0, 300)}
              </div>
              <div className="fin-buut">
                <div>
                  <FaInfoCircle />
                </div>
                <div>More detail</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
