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
import {
  FaClock,
  FaClosedCaptioning,
  FaCopy,
  FaEye,
  FaInfoCircle,
} from "react-icons/fa";
import Comments from "@/component/Comments/Comments";
import copy from "copy-to-clipboard";
import Chat from "@/component/Chat/Chat";
import CountdownTimer from "@/component/CountDown/CountDown";
import { AiFillAudio } from "react-icons/ai";

export default function LivePage(props) {
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const IsLoading = (data) => {
    if (data) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, [20000]);
    }
  };
  const handleNavigation = () => {
    IsLoading(true);
  };
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
          setTimeElapsed("Not started yet!");
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

    return timeElapsed;
  }

  const message = Timer(cachedData?.date, cachedData?.time);

  console.log("Message", message);

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

  const [subIsSelected, setSubIsSelected] = useState(() => {
    const isDubSelected = ls.getItem("subordub") === "false";
    // Check if dub episodes exist in `props.datao`
    const hasDubEpisodes = props.datao?.anime?.info?.stats?.episodes?.dub > 0;

    // Check if dub data exists in `props.dataStr`
    const hasDubData = props.dataStr?.dub?.length > 0;

    // Return the initial state
    if (isDubSelected) {
      if (hasDubEpisodes && hasDubData) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  });

  const [selectedServer, setSelectedServer] = useState(0);
  const [bhaiLink, setBhaiLink] = useState(() => {
    const isDubSelected = ls.getItem("subordub") === "false";

    // If props.dataj is empty, use props.dubPri for dub or props.subPri for sub
    // Check if dub episodes exist in `props.datao`
    const hasDubEpisodes = props.datao?.anime?.info?.stats?.episodes?.dub > 0;

    // Check if dub data exists in `props.dataStr`
    const hasDubData = props.dataStr?.dub?.length > 0;

    // Handle Dub selection
    if (isDubSelected) {
      if (hasDubEpisodes && hasDubData) {
        // Check if there's a dub available in props.dataj
        const dubLink = props.dataStr?.dub[0]?.url + "&autoPlay=1&oa=0&asi=1";

        // If not found in dataj, fallback to gogoDub
        if (dubLink) {
          return dubLink;
        }
      } else {
        const subLink = props.dataStr?.sub[0]?.url + "&autoPlay=1&oa=0&asi=1";

        // If not found in dataj, fallback to gogoSub
        if (subLink) {
          return subLink;
        }
      }
    }
    // Handle Sub/Raw selection
    else {
      const subLink = props.dataStr?.sub[0]?.url + "&autoPlay=1&oa=0&asi=1";

      // If not found in dataj, fallback to gogoSub
      if (subLink) {
        return subLink;
      }
    }

    // Default to an empty string if nothing is found
    return "";
  });

  const copyText = () => {
    const textToCopy = "https://example.com";
    copy(textToCopy);
    alert("Text copied to clipboard!");
  };

  return (
    <div className="foundati">
      <div className="inen">
        <div>
          <div className="al-33">
            <div className="five-str five-stn">
              <div className="kilO">
                <PiBroadcastFill size={20} />
              </div>
              <div>{cachedData?.roomName}</div>
            </div>
            <div className="five-str five-22">
              <div className="opt-11">{props.datal?.anime?.info?.name}</div>
              <div className="opt-2">&#x2022;</div>
              <div className="opt-22">
                <div>
                  <FaClosedCaptioning size={14} />
                </div>
                <div className="oppt-22">{cachedData?.sub ? "SUB" : "DUB"}</div>
              </div>
              <div className="opt-2">&#x2022;</div>
              <div className="opt-33">{cachedData?.episode}</div>
            </div>
          </div>
          <div>
            <div className="video-player">
              <div className="hls-container">
                {message === "Not started yet!" ? (
                  <div className="timl-P">
                    <img
                      src={props.datal.anime?.info?.poster}
                      alt="Background"
                      className="background-image"
                    />
                    <div className="content">
                      <div className="timl-1">The show will start in</div>
                      <div className="timl-2">
                        <CountdownTimer
                          targetDate={cachedData?.date}
                          targetTime={cachedData?.time}
                        />
                      </div>
                      <div className="timl-3">
                        <div className="timl-31">Share live to friends</div>
                        <div className="timl-32">
                          <div className="timl-321">
                            https://hianime.to/watch2gether...
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src={bhaiLink}
                    frameBorder="0"
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture" // Features for interactivity
                    allowFullScreen // Enable fullscreen mode
                    width="100%" // Full width
                    height="100%" // Full height
                    style={{
                      border: "none", // Remove border
                      display: "block", // Ensure proper layout
                      zIndex: 150, 
                    }}
                    loading="lazy" // Improve performance by deferring loading
                    sandbox="allow-scripts allow-same-origin allow-presentation" // Security controls
                    title="Video Player" // Accessible title for the iframe
                  ></iframe>
                )}
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

          <div className="chatC">
            <Chat liveId={props.id} session={session} />
          </div>

          <div className="kenpa-1">
            <div>
              <img
                className="kenpa-img"
                src={props.datal.anime?.info?.poster}
                alt=""
              />
            </div>
            <div className="kenpa-soul">
              <div className="kenpa-name">{props.datal.anime?.info?.name}</div>
              <div className="kenpa-sts">
                <div className="kenpa-sts-1">
                  {props.datal.anime?.info?.stats.rating}
                </div>
                <div className="kenpa-sts-2">
                  {props.datal.anime?.info?.stats.quality}
                </div>
                <div className="kenpa-sts-3">
                  <div>
                    <FaClosedCaptioning />
                  </div>
                  <div>{props.datal.anime?.info?.stats.episodes.sub}</div>
                </div>
                <div className="kenpa-sts-4">
                  <div>
                    <AiFillAudio />
                  </div>
                  <div>{props.datal.anime?.info?.stats.episodes.dub}</div>
                </div>
                <div className="opt-2 spec">&#x2022;</div>
                <div className="kenpa-sts-6">
                  {props.datal.anime?.info?.stats.type}
                </div>
                <div className="opt-2">&#x2022;</div>
                <div className="kenpa-sts-8">
                  {props.datal.anime?.info?.stats.duration}
                </div>
              </div>
              <div className="decro">
                {props.datal.anime?.info?.description.length < 300
                  ? props.datal.anime?.info?.description
                  : props.datal.anime?.info?.description.slice(0, 300)}
              </div>
              <div className="decrol">
                {props.datal.anime?.info?.description.length < 100
                  ? props.datal.anime?.info?.description
                  : props.datal.anime?.info?.description.slice(0, 100)}
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
      <div className="chatB">
        <Chat liveId={props.id} session={session} />
      </div>
    </div>
  );
}
