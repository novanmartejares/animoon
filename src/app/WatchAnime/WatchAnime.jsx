"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import "./watch-anime.css";
import RecommendedTopTen from "@/layouts/RecommendedTopTen";
import Share from "@/component/Share/Share";
import LoadingSpinner from "@/component/loadingSpinner";
import { easeOut, motion } from "framer-motion";

import Error from "@/component/AnimeNotFound/Error";

import ArtPlayer from "@/component/Artplayer";
import Link from "next/link";
import Image from "next/image";
import { AiFillAudio } from "react-icons/ai";
import {
  FaBackward,
  FaClosedCaptioning,
  FaForward,
  FaPlus,
} from "react-icons/fa";
import useAnime from "@/hooks/useAnime";
import { BsFillSkipForwardFill, BsSkipBackwardFill } from "react-icons/bs";
import { HiOutlineSignal } from "react-icons/hi2";
import { useRouter } from "next/navigation";
export default function WatchAnime(props) {
  const router = useRouter();
  const [descIsCollapsed, setDescIsCollapsed] = useState(true);

  /**
   * Since custom hook cannot be used inside of use Effect,
   * variables are initialized outside of useEffect
   * when the custom hooks returns the processed data from API it triggers the change in variable's value
   * Hence triggers the useEffect which then stores the value of the varibale in state.
   */

  /**
   * When the value of the variables changes, the useEffect is triggered a state is initialized
   * When the user changes the Server or Episode the component is re-rendered and the state is updated
   *
   * Without states the page would reload everything from the start the useEffect checks if the states already have a value
   * if yes then it does not re-render the component or does not change the state
   */

  const [subIsSelected, setSubIsSelected] = useState(true);
  const [subInfo, setSubInfo] = useState({});
  const [dubInfo, setDubInfo] = useState({});
  const [selectedServer, setSelectedServer] = useState(0);
  const [serverId, setServerId] = useState("4");
  const [selectedEpisode, setSelectedEpisode] = useState(0);
  const [quality, setQuality] = useState("default");
  const [data, setData] = useState([]);
  const [datag, setDatag] = useState([]);
  const [fatag, setFatag] = useState([]);
  const [gogoServe, setGogoServe] = useState("GogoCdn");
  const [onn1, setOnn1] = useState(
    localStorage.getItem("Onn1") ? localStorage.getItem("Onn1") : "Off"
  );
  const [onn2, setOnn2] = useState(
    localStorage.getItem("Onn2") ? localStorage.getItem("Onn2") : "Off"
  );
  const [onn3, setOnn3] = useState(
    localStorage.getItem("Onn3") ? localStorage.getItem("Onn3") : "Off"
  );
  localStorage.setItem(`Rewo-${props.anId}`, props.epId);

  let epiod = 0;
  let i = 0;
  for (i > 0; i < props.data.episodes.length; i++) {
    if (props.data?.episodes[i].episodeId.includes(props?.epis?.toString())) {
      epiod = props.data.episodes[i].number;
    }
  }

  /**
   * fetches servers from the API based on the user's selection of SUB ior DUB
   */

  const handleOn1 = () => {
    if (onn1 === "Off") {
      localStorage.setItem("Onn1", "On");
      setOnn1("On");
    }
    if (onn1 === "On") {
      localStorage.setItem("Onn1", "Off");
      setOnn1("Off");
    }
  };

  const handleOn2 = () => {
    if (onn2 === "Off") {
      localStorage.setItem("Onn2", "On");
      setOnn2("On");
    }
    if (onn2 === "On") {
      localStorage.setItem("Onn2", "Off");
      setOnn2("Off");
    }
  };

  localStorage.setItem(`Epnum-${props.anId}`, epiod.toString());

  const getData = (data) => {
    if (data) {
      if (epiod < props.data.episodes.length) {
        router.push(`/watch/${props.data.episodes[epiod].episodeId}`);
      }
    }
  };

  const handleOn3 = () => {
    if (onn3 === "Off") {
      localStorage.setItem("Onn3", "On");
      setOnn3("On");
    }
    if (onn3 === "On") {
      localStorage.setItem("Onn3", "Off");
      setOnn3("Off");
    }
  };

  const servers = subIsSelected
    ? props?.datal?.sub?.length > 0
      ? props?.datal?.sub
      : props?.datal?.raw?.length > 0
      ? props?.datal?.raw
      : null
    : props?.datal?.dub?.length > 0
    ? props?.datal?.dub
    : null;

  let uu = [];
  let o = 0;
  for (o > 0; o < props.datao.anime.info.stats.episodes.dub; o++) {
    uu.push(props.data?.episodes[o]);
  }

  /**
   * Based on the inforamtion from useAnimeInfo hook, the episodes array is stored in a variable
   * with 'id' of each episode
   */

  if (localStorage.getItem(`Watched-${props.anId.toString()}`)) {
    // split the existing values into an array
    let vals = localStorage
      .getItem(`Watched-${props.anId.toString()}`)
      .split(",");

    // if the value has not already been added
    if (!vals.includes(props.epId.toString())) {
      // add the value to the array
      vals.push(props.epId).toString();

      // sort the array

      // join the values into a delimeted string and store it
      localStorage.setItem(`Watched-${props.anId.toString()}`, vals.join(","));
    }
  } else {
    // the key doesn't exist yet, add it and the new value
    localStorage.setItem(
      `Watched-${props.anId.toString()}`,
      props.epId.toString()
    );
  }

  let episodeList = subIsSelected
    ? props?.data?.episodes?.length > 0
      ? props?.data?.episodes
      : null
    : props.datao.anime.info.stats.episodes.dub > 0
    ? uu
    : null;

  /**
   * based on the values of selectedServer and selectedEpisode state the hook fetches the sources from the API
   * these sources are then used to play the video and include links to video files of different quality
   */

  /**
   * Creates an array of qualities available for an episode
   */

  /**
   * when the custom hook fetches search results from the API it changes the values of
   * subData and dubData variables
   *
   * when the value of these variables change the useEffect is triggered and the state is updated
   *
   * Checks if the state is empty and if the custom hook has returned the data from the API
   *
   * if the state already has the data it does not change the state(prevents re-rendering on change of episode or server)
   */

  /**
   * Checks if subAnime or dubAnime is available
   * In some cases only sub in available and in other only dub
   *
   * if subAnime is available then it sets the subIsSelected state to true
   * if dubAnime is available then it sets the subIsSelected state to false
   *
   */

  // Server and episode buttons to change the respective item
  const serverButtons = servers?.map((el, idx) => {
    return (
      <span
        className={`server-tile ${selectedServer === idx ? "selected" : ""}`}
        key={el?.serverId}
        onClick={() => setSelectedServer(idx) & setServerId(el?.serverId)}
      >
        {el?.serverName}
      </span>
    );
  });

  const isDatag = ["GogoCdn", "Anify"];

  useEffect(() => {
    setSelectedEpisode(epiod - 1);
  }, []);

  const changeEpi = (id) => {
    window.location.href = `/watch/${id}`;
  }

  const episodeButtons = episodeList?.map((el, idx) => {
    return (
      <span
        className={`${
          episodeList.length <= 24 ? "episode-tile" : `episode-tile-blocks`
        } ${idx === epiod - 1 ? "selected" : ""} ${
          episodeList.length <= 24
            ? episodeList.length % 2 === 0
              ? idx % 2 === 0
                ? ""
                : "evenL"
              : idx % 2 === 0
              ? "evenL"
              : ""
            : `${el.isFiller ? "fillero" : "evenL"}`
        } ${
          localStorage.getItem(`Watched-${props.anId.toString()}`)
            ? localStorage
                .getItem(`Watched-${props.anId.toString()}`)
                .split(",")
                .includes(el.episodeId)
              ? "idk"
              : "common"
            : "common"
        }`}
        key={el.id}
        style={
          episodeList.length <= 24
            ? { minWidth: "100%", borderRadius: 0 }
            : null
        }
        onClick={() => setSelectedEpisode(epiod - 1) & changeEpi(el.episodeId)}
      >
        <Link href={`/watch/${el.episodeId}`} as={`/watch/${el.episodeId}`}>
          {episodeList.length <= 24 ? (
            <div className="eptile">
              {" "}
              <div className="epnumb">{el.number}</div>{" "}
              <div className="eptit">
                {el.title.length < 20
                  ? el.title
                  : el.title.slice(0, 20) + "..."}
              </div>
            </div>
          ) : (
            el.number
          )}
        </Link>
      </span>
    );
  });
  const { getZoroStream, getEpisodeGogo, getEpisodesAnify, getZoroBroStream } =
    useAnime();
  const sub = subIsSelected === true ? "sub" : "dub";
  const fetchLub = async () => {
    const dat = await getZoroStream(props.epId, serverId, sub);
    setData(dat);
  };

  useEffect(() => {
    fetchLub();
  }, [props.epId, serverId, sub, epiod]);

  console.log(props.dataj);

  const fetchUub = async () => {
    try {
      const gogoId = subIsSelected
        ? "/" +
          (
            props.jname
              .replace(":", "")
              .toLocaleLowerCase()
              .replaceAll(" ", "-") + `-episode-${epiod}`
          ).replace(/[^a-zA-Z0-9\-]/g, "")
        : "/" +
          (
            props.jname
              .replace(":", "")
              .toLocaleLowerCase()
              .replaceAll(" ", "-") + `-dub-episode-${epiod}`
          ).replace(/[^a-zA-Z0-9\-]/g, "");
      const dat = await getEpisodeGogo(gogoId);
      setDatag(dat);
    } catch (error) {
      console.error(error); // You might send an exception to your error tracker like AppSignal
      setDatag([]);
    }
  };

  useEffect(() => {
    fetchUub();
  }, [subIsSelected, selectedEpisode, epiod]);
  const fetchNub = async () => {
    try {
      const gogoId = subIsSelected
        ? "/" +
          (
            props.jname
              .replace(":", "")
              .toLocaleLowerCase()
              .replaceAll(" ", "-") + `-episode-${epiod}`
          ).replace(/[^a-zA-Z0-9\-]/g, "")
        : "/" +
          (
            props.jname
              .replace(":", "")
              .toLocaleLowerCase()
              .replaceAll(" ", "-") + `-dub-episode-${epiod}`
          ).replace(/[^a-zA-Z0-9\-]/g, "");
      console.log(gogoId);
      const dat = await getEpisodesAnify(gogoId);
      setFatag(dat);
    } catch (error) {
      console.error(error); // You might send an exception to your error tracker like AppSignal
      setFatag([]);
    }
  };

  useEffect(() => {
    fetchNub();
  }, [subIsSelected, selectedEpisode, epiod]);

  return (
    <>
      {props.epis ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ x: [window.innerWidth / 2, 0], opacity: 1 }}
          transition={{ duration: 0.7, ease: easeOut }}
        >
          {props?.data?.episodes.length > 0 ? (
            <div style={{ marginTop: "65px" }} className="watch-container">
              <div className="flex gap-1 items-center specif">
                <div className="homo">Home</div>
                <div className="dotoi">&#x2022;</div>
                <div className="homo">
                  {props.datao?.anime?.info.stats.type}
                </div>
                <div className="doto">&#x2022;</div>
                <div className="namo">
                  Watching {props.datao?.anime?.info?.name}
                </div>
              </div>
              <div className="d-flex new-con">
                <img
                  className="watch-container-background"
                  src={props.datao?.anime?.info?.poster}
                  alt="pop"
                />
                <div className="media-center d-flex">
                  <div
                    className={`${
                      episodeList?.length <= 24
                        ? "episode-container"
                        : "episode-container-blocks"
                    }`}
                  >
                    <p>List of Episodes:</p>
                    <div
                      className={`${
                        episodeList?.length <= 24
                          ? "episode-tiles-wrapper"
                          : "episode-tiles-wrapper-blocks"
                      } d-flex a-center`}
                    >
                      {episodeList?.length > 0 ? (
                        episodeButtons
                      ) : (
                        <LoadingSpinner />
                      )}
                    </div>
                  </div>
                  <div className="video-player">
                    <div className="hls-container">
                      {props.datai?.sources?.length > 0 || datag ? (
                        <ArtPlayer
                          data={data}
                          datag={gogoServe === "GogoCdn" ? datag : fatag}
                          isGogo={props.isGogo}
                          epId={props.epId}
                          anId={props.anId}
                          onn1={onn1}
                          onn2={onn2}
                          onn3={onn3}
                          getData={getData}
                          dataj={props.dataj}
                          sub={sub}
                        />
                      ) : (
                        <div
                          className="d-flex a-center j-center"
                          style={{ height: "100%" }}
                        >
                          <img
                            src=""
                            style={{
                              display: "block",
                              height: 100,
                              width: 100,
                              margin: "auto",
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <div className="server-container d-flex-fd-column">
                      <div className="server-tile-wrapper d-flex-fd-column">
                        <div className="flex items-center allum">
                          <div className="flex gap-x-3 flex-wrap">
                            <div className="flex gap-2">
                              <div className="autoo flex gap-1">
                                <span>Auto</span>
                                <span>Play</span>
                              </div>
                              <div
                                onClick={handleOn1}
                                className={`ress ${
                                  onn1 === "On" ? "ressOn" : "ressOff"
                                }`}
                              >
                                {onn1}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <div className="autoo flex gap-1">
                                <span>Auto</span>
                                <span>Next</span>
                              </div>
                              <div
                                onClick={handleOn2}
                                className={`ress ${
                                  onn2 === "On" ? "ressOn" : "ressOff"
                                }`}
                              >
                                {onn2}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <div className="autoo flex gap-1">
                                <span>Auto</span>
                                <span>Skip</span>
                                <span>OP/ED</span>
                              </div>
                              <div
                                onClick={handleOn3}
                                className={`ress ${
                                  onn3 === "On" ? "ressOn" : "ressOff"
                                }`}
                              >
                                {onn3}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-3 items-center">
                            <Link
                              href={`/watch/${
                                props.data.episodes[epiod - 2]?.episodeId
                              }`}
                            >
                              <div className="backw">
                                <FaBackward />
                              </div>
                            </Link>
                            <Link
                              href={`/watch/${props.data.episodes[epiod]?.episodeId}`}
                            >
                              <div className="fordw">
                                <FaForward />
                              </div>
                            </Link>
                            <div className="plusa">
                              <FaPlus />
                            </div>
                            <div className="signo">
                              <HiOutlineSignal />
                            </div>
                          </div>
                        </div>
                        <div className="flex compIno">
                          <div className="flex flex-col items-center epIno containIno flex-wrap">
                            <div className="ino1">You are watching</div>
                            <div className="ino2">{`Episode ${epiod}`}</div>
                            <div className="ino3">
                              If current server doesn't work please try other
                              servers beside.
                            </div>
                          </div>
                          <div className=" flex flex-col serves">
                            {!props.datag &&
                            !props.datag.sources &&
                            props.datag.sources.length < 1 ? (
                              <>
                                {props.datal.sub ? (
                                  <>
                                    <div
                                      className={`serveSub ${
                                        props.datal.dub.length > 0
                                          ? "borderDot"
                                          : ""
                                      } flex gap-5 items-center`}
                                    >
                                      <div className="subb flex gap-1 items-center">
                                        <div>SUB</div>
                                        <div>:</div>
                                      </div>
                                      <div className="flex flex-wrap gap-2">
                                        {props.datal.sub.map((no, idx) => (
                                          <div
                                            className={`subDub ${
                                              subIsSelected
                                                ? selectedServer === idx
                                                  ? "selected"
                                                  : ""
                                                : ""
                                            }`}
                                            onClick={() =>
                                              setServerId(el.serverId) &
                                              setSelectedServer(idx) &
                                              setSubIsSelected(true)
                                            }
                                          >
                                            {no.serverName}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                    {props.datal.dub.length > 0 ? (
                                      <div className="serveSub flex gap-5 items-center">
                                        {" "}
                                        <div className="subb flex gap-1 items-center">
                                          <div>DUB</div>
                                          <div>:</div>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                          {data.dub.map((no, idx) => (
                                            <div
                                              className={`subDub ${
                                                !subIsSelected
                                                  ? selectedServer === idx
                                                    ? "selected"
                                                    : ""
                                                  : ""
                                              }`}
                                              onClick={() =>
                                                setServerId(el.serverId) &
                                                setSelectedServer(idx) &
                                                setSubIsSelected(false)
                                              }
                                            >
                                              {no.serverName}
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                ) : (
                                  <div className="serveSub flex gap-5 items-center">
                                    {" "}
                                    <div className="subb flex gap-1 items-center">
                                      <div>RAW</div>
                                      <div>:</div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                      {props.datal.raw.map((no, idx) => (
                                        <div
                                          className={`subDub ${
                                            !subIsSelected
                                              ? selectedServer === idx
                                                ? "selected"
                                                : ""
                                              : ""
                                          }`}
                                          onClick={() =>
                                            setServerId(el.serverId) &
                                            setSelectedServer(idx) &
                                            setSubIsSelected(false)
                                          }
                                        >
                                          {no.serverName}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}{" "}
                              </>
                            ) : (
                              <>
                                <div
                                  className={`serveSub ${
                                    props.datal.dub.length > 0
                                      ? "borderDot"
                                      : ""
                                  } flex gap-5 items-center`}
                                >
                                  {" "}
                                  <div className="subb flex gap-1 items-center">
                                    <div>SUB</div>
                                    <div>:</div>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {isDatag.map((no, idx) => (
                                      <div
                                        className={`subDub ${
                                          subIsSelected
                                            ? selectedServer === idx
                                              ? "selected"
                                              : ""
                                            : ""
                                        }`}
                                        onClick={() =>
                                          setSelectedServer(idx) &
                                          setSubIsSelected(true) &
                                          setGogoServe(no)
                                        }
                                      >
                                        {no}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                {props.datal.dub.length > 0 ? (
                                  <div className="serveSub flex gap-5 items-center">
                                    {" "}
                                    <div className="subb flex gap-1 items-center">
                                      <div>DUB</div>
                                      <div>:</div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                      {isDatag.map((no, idx) => (
                                        <div
                                          className={`subDub ${
                                            !subIsSelected
                                              ? selectedServer === idx
                                                ? "selected"
                                                : ""
                                              : ""
                                          }`}
                                          onClick={() =>
                                            setSelectedServer(idx) &
                                            setSubIsSelected(false) &
                                            setGogoServe(no)
                                          }
                                        >
                                          {no}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </>
                            )}
                          </div>
                        </div>

                        {props.datao.seasons.length > 0 ? (
                          <>
                            <div className="seasonal-advice">
                              Watch more seasons of this anime:
                            </div>
                            <div className="seasonal">
                              {props?.datao?.seasons?.map((sea) => (
                                <>
                                  <Link href={`/${sea.id}`}>
                                    <div className="season h-[70px]">
                                      <img
                                        className="seasonal-background"
                                        src={sea.poster}
                                        alt="pop"
                                      />
                                      {sea.title.length < 15
                                        ? sea.title
                                        : sea.title.slice(0, 15) + "..."}
                                    </div>
                                  </Link>
                                </>
                              ))}
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="current-anime-details ">
                  <img
                    className="details-container-background"
                    src={props.datao.anime.info.poster || "NA"}
                    alt="pop"
                  />
                  <div className="anime-details d-flex-fd-column">
                    <img
                      className="anime-details-poster"
                      src={props.datao.anime.info.poster || "NA"}
                      alt="pop"
                    />

                    <div className="anime-details-content d-flex-fd-column">
                      <h1
                        style={{ textAlign: "center" }}
                        className={
                          props?.datao?.anime?.info?.name.length < 30
                            ? `title-large`
                            : `title-large-long`
                        }
                      >
                        {props?.datao?.anime?.info?.name.length < 50
                          ? props?.datao?.anime?.info?.name
                          : props?.datao?.anime?.info?.name.slice(0, 50) +
                            "..."}
                      </h1>

                      <div className="flex m-auto gap-2 items-center">
                        <div className="flex gap-1">
                          {" "}
                          <div className="rat">
                            {props.datao.anime.info.stats.rating}
                          </div>
                          <div className="qual">
                            {props.datao.anime.info.stats.quality}
                          </div>
                          <div className="subE">
                            <FaClosedCaptioning size={14} />{" "}
                            {props.datao.anime.info.stats.episodes.sub ||
                              "Unknown"}
                          </div>
                          {props.datao.anime.info.stats.episodes.dub ? (
                            <div className="dubE">
                              {" "}
                              <AiFillAudio size={14} />{" "}
                              {props.datao.anime.info.stats.episodes.dub ||
                                "Unknown"}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="doto">&#x2022;</div>
                        <div className="typo">
                          {props.datao.anime.info.stats.type}
                        </div>
                        <div className="doto">&#x2022;</div>
                        <div className="duran">
                          {props.datao.anime.moreInfo.duration}
                        </div>
                      </div>

                      <p className="descp">
                        {descIsCollapsed
                          ? props.datao.anime.info.description?.slice(0, 150) +
                            "..."
                          : props.datao.anime.info.description}
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => setDescIsCollapsed((prev) => !prev)}
                        >
                          [ {descIsCollapsed ? "More" : "Less"} ]
                        </span>
                      </p>
                      <p>
                        AniMoon is the best site to watch{" "}
                        {props.datao.anime.info.name} SUB online, or you can
                        even watch {props.datao.anime.info.name} DUB in HD
                        quality. You can also find{" "}
                        {props.datao.anime.moreInfo.studios} anime on AniMoon
                        website.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : !props.datao ? (
            <Error />
          ) : (
            <LoadingSpinner />
          )}

          <Share
            style={{
              paddingInline: 20,
            }}
          />

          <RecommendedTopTen doIt={"doit"} datap={props.datao} />
        </motion.div>
      ) : (
        ""
      )}
    </>
  );
}
