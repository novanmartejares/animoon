"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import "./watch-anime.css";
import RecommendedTopTen from "@/layouts/RecommendedTopTen";
import Share from "@/component/Share/Share";
import Link from "next/link";
import { AiFillAudio } from "react-icons/ai";
import loading from "../../../public/placeholder.gif";
import {
  FaBackward,
  FaClosedCaptioning,
  FaForward,
  FaPlus,
} from "react-icons/fa";
import Comments from "@/component/Comments/Comments";
import { HiOutlineSignal } from "react-icons/hi2";
import ArtPlayer from "@/component/Artplayer";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/component/loadingSpinner";
import Image from "next/image";
export default function WatchAnime(props) {
  const router = useRouter();
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

  const [clickedId, setClickedId] = useState(props.epId);
  const [serverName, setServerName] = useState("Vidstreaming");
  const [descIsCollapsed, setDescIsCollapsed] = useState(true);

  const [subIsSelected, setSubIsSelected] = useState(true);
  const [selectedServer, setSelectedServer] = useState(0);
  const [bhaiLink, setBhaiLink] = useState(
    props.dataj.results?.streamingInfo.find(
      (info) =>
        (info.value?.decryptionResult?.type === "sub" ||
          info.value?.decryptionResult?.type === "raw") &&
        info.value?.decryptionResult?.server === "Vidstreaming"
    )?.value?.decryptionResult?.source.sources[0].file
  );
  const [introd, setIntrod] = useState(
    props.dataj.results?.streamingInfo.find(
      (info) =>
        (info.value.decryptionResult?.type === "sub" ||
          info.value.decryptionResult?.type === "raw") &&
        info.value.decryptionResult.server === "Vidstreaming"
    )?.value.decryptionResult.source.intro
  );
  const [outrod, setOutrod] = useState(
    props.dataj.results?.streamingInfo.find(
      (info) =>
        (info.value.decryptionResult?.type === "sub" ||
          info.value.decryptionResult?.type === "raw") &&
        info.value.decryptionResult.server === "Vidstreaming"
    )?.value.decryptionResult.source.outro
  );
  const [subtitles, setSubtitles] = useState(
    props.dataj.results?.streamingInfo.find(
      (info) =>
        (info.value.decryptionResult?.type === "sub" ||
          info.value.decryptionResult?.type === "raw") &&
        info.value.decryptionResult.server === "Vidstreaming"
    )?.value.decryptionResult.source.tracks
  );
  const [onn1, setOnn1] = useState(
    ls.getItem("Onn1") ? ls.getItem("Onn1") : "Off"
  );
  const [onn2, setOnn2] = useState(
    ls.getItem("Onn2") ? ls.getItem("Onn2") : "Off"
  );
  const [onn3, setOnn3] = useState(
    ls.getItem("Onn3") ? ls.getItem("Onn3") : "Off"
  );
  ls.setItem(`Rewo-${props.anId}`, props.epId);

  let epiod = props.epiod;

  const handleOn1 = () => {
    if (onn1 === "Off") {
      ls.setItem("Onn1", "On");
      ls.setItem("autoPlay", "true");
      setOnn1("On");
    }
    if (onn1 === "On") {
      ls.setItem("Onn1", "Off");
      ls.setItem("autoPlay", "false");
      setOnn1("Off");
    }
  };

  const handleOn2 = () => {
    if (onn2 === "Off") {
      ls.setItem("Onn2", "On");
      ls.setItem("autoNext", "true");
      setOnn2("On");
    }
    if (onn2 === "On") {
      ls.setItem("Onn2", "Off");
      ls.setItem("autoNext", "false");
      setOnn2("Off");
    }
  };

  ls.setItem(`Epnum-${props.anId}`, epiod.toString());

  const getData = (data) => {
    if (data) {
      if (epiod < props.data.episodes.length) {
        setEpNumb(props.data.episodes[epiod].number);
        router.push(`/watch/${props.data.episodes[epiod].episodeId}`);
        setClickedId(props.data.episodes[epiod].episodeId);
      }
    }
  };

  const handleOn3 = () => {
    if (onn3 === "Off") {
      ls.setItem("Onn3", "On");
      ls.setItem("autoSkipIntro", "true");
      setOnn3("On");
    }
    if (onn3 === "On") {
      ls.setItem("Onn3", "Off");
      ls.setItem("autoSkipIntro", "false");
      setOnn3("Off");
    }
  };
  const sub = subIsSelected === true ? "sub" : "dub";
  let uu = [];
  let o = 0;
  for (o > 0; o < props.datao.anime.info.stats.episodes.dub; o++) {
    uu.push(props.data?.episodes[o]);
  }

  /**
   * Based on the inforamtion from useAnimeInfo hook, the episodes array is stored in a variable
   * with 'id' of each episode
   */

  if (ls.getItem(`Watched-${props.anId.toString()}`)) {
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
      ls.setItem(`Watched-${props.anId.toString()}`, vals.join(","));
    }
  } else {
    // the key doesn't exist yet, add it and the new value
    ls.setItem(`Watched-${props.anId.toString()}`, props.epId.toString());
  }

  let episodeList = subIsSelected
    ? props?.data?.episodes?.length > 0
      ? props?.data?.episodes
      : null
    : props.datao.anime.info.stats.episodes.dub > 0
    ? uu
    : null;

  const [epNumb, setEpNumb] = useState(epiod);
  const backward = () => {
    router.push(`/watch/${props.data.episodes[epiod - 2]?.episodeId}`);
    setEpNumb(props.data.episodes[epiod - 2].number);
  };
  const forward = () => {
    router.push(`/watch/${props.data.episodes[epiod]?.episodeId}`);
    setEpNumb(props.data.episodes[epiod].number);
  };

  const episodeButtons = episodeList?.map((el, idx) => {
    return (
      <Link
        href={`/watch/${el.episodeId}`}
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
          ls.getItem(`Watched-${props.anId.toString()}`)
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
        onClick={() => setEpNumb(el.number) & setClickedId(el.episodeId)}
      >
        <div>
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
        </div>
      </Link>
    );
  });

  const err = (data) => {
    if (data) {
      if (serverName === "Vidstreaming") {
        const foundLink = props.dataj.results.streamingInfo.find((info) => {
          const isSubOrRaw =
            info.value.decryptionResult?.type === "sub" ||
            info.value.decryptionResult?.type === "raw";
          const isServerHD2 = info.value.decryptionResult.server === "Vidcloud";

          if (subIsSelected) {
            return isSubOrRaw && isServerHD2;
          } else {
            return info.value.decryptionResult?.type === "dub" && isServerHD2;
          }
        });

        setBhaiLink(foundLink?.value.decryptionResult.source.sources[0].file);
        setSelectedServer(1);
        setServerName("Vidcloud");
      }
    }
  };

  let trutie = clickedId === props.epId ? "yaso yaso" : "";
  useEffect(() => {
    if (trutie) {
      if (props.dataj) {
        setBhaiLink(
          props.dataj.results.streamingInfo.find(
            (info) =>
              (info.value.decryptionResult?.type === "sub" ||
                info.value.decryptionResult?.type === "raw") &&
              info.value.decryptionResult.server === "Vidstreaming"
          )?.value.decryptionResult.source.sources[0].file
        );
        setSubtitles(
          props.dataj.results.streamingInfo.find(
            (info) =>
              (info.value.decryptionResult?.type === "sub" ||
                info.value.decryptionResult?.type === "raw") &&
              info.value.decryptionResult.server === "Vidstreaming"
          )?.value.decryptionResult.source.tracks
        );
        setIntrod(
          props.dataj.results.streamingInfo.find(
            (info) =>
              (info.value.decryptionResult?.type === "sub" ||
                info.value.decryptionResult?.type === "raw") &&
              info.value.decryptionResult.server === "Vidstreaming"
          )?.value.decryptionResult.source.intro
        );
        setOutrod(
          props.dataj.results.streamingInfo.find(
            (info) =>
              (info.value.decryptionResult?.type === "sub" ||
                info.value.decryptionResult?.type === "raw") &&
              info.value.decryptionResult.server === "Vidstreaming"
          )?.value.decryptionResult.source.outro
        );
      }
    }
  }, [trutie]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div style={{ marginTop: "65px" }} className="watch-container">
            <div className="flex gap-1 items-center pecif">
              <Link href={"/"} onClick={handleNavigation}>
                <div className="omo">Home</div>
              </Link>
              <div className="otoi">&#x2022;</div>
              <div className="omo">{props.datao?.anime?.info.stats.type}</div>
              <div className="oto">&#x2022;</div>
              <div className="amo">
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
                    {episodeButtons}
                  </div>
                </div>
                <div className="video-player">
                  <div className="hls-container">
                    {clickedId === props.epId && props.dataj ? (
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
                            <div
                              className="backw"
                              onClick={() =>
                                backward() &
                                setClickedId(
                                  props.data.episodes[epiod - 2]?.episodeId
                                )
                              }
                            >
                              <FaBackward />
                            </div>
                          </Link>
                          <Link
                            href={`/watch/${props.data.episodes[epiod]?.episodeId}`}
                          >
                            <div
                              className="fordw"
                              onClick={() =>
                                forward() &
                                setClickedId(
                                  props.data.episodes[epiod]?.episodeId
                                )
                              }
                            >
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
                          <div className="ino2">{`${
                            props.data?.episodes[epiod]?.isFiller === true
                              ? "Filler"
                              : ""
                          } Episode ${epiod}`}</div>
                          <div className="ino3">
                            If current server doesn't work please try other
                            servers beside.
                          </div>
                        </div>
                        <div className=" flex flex-col serves">
                          <>
                            {props.dataj.results.streamingInfo.filter(
                              (info) =>
                                info.value.decryptionResult?.type !== "raw"
                            ) ? (
                              <>
                                <div
                                  className={`serveSub ${
                                    props.dataj.results.streamingInfo.filter(
                                      (info) =>
                                        info.value.decryptionResult?.type ===
                                        "dub"
                                    )
                                      ? "borderDot"
                                      : ""
                                  } flex gap-5 items-center`}
                                >
                                  <div className="subb flex gap-1 items-center">
                                    <div>SUB</div>
                                    <div>:</div>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {props.dataj.results?.streamingInfo
                                      .filter(
                                        (info) =>
                                          info.value.decryptionResult?.type ===
                                          "sub"
                                      )
                                      .map((no, idx) => (
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
                                            setServerName(
                                              no.value.decryptionResult.server
                                            ) &
                                            setBhaiLink(
                                              no.value.decryptionResult.source
                                                .sources[0].file
                                            ) &
                                            setSubtitles(
                                              no.value.decryptionResult.source
                                                .tracks
                                            ) &
                                            setIntrod(
                                              no.value.decryptionResult.source
                                                .intro
                                            ) &
                                            setOutrod(
                                              no.value.decryptionResult.source
                                                .outro
                                            )
                                          }
                                        >
                                          {no.value.decryptionResult.server}
                                        </div>
                                      ))}
                                    {props.gogoSub ? (
                                      <div
                                        className={`subDub ${
                                          subIsSelected
                                            ? selectedServer === 'gogo'
                                              ? "selected"
                                              : ""
                                            : ""
                                        }`}
                                        onClick={() =>
                                          setSelectedServer('gogo') &
                                          setSubIsSelected(true) &
                                          setServerName(
                                            'GogoCdn'
                                          ) &
                                          setBhaiLink(
                                            props.gogoSub
                                          ) &
                                          setSubtitles(
                                            ''
                                          ) &
                                          setIntrod(
                                            ''
                                          ) &
                                          setOutrod(
                                            ''
                                          )
                                        }
                                      >
                                        GogoCdn
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                                {props.dataj.results.streamingInfo.filter(
                                  (info) =>
                                    info.value.decryptionResult?.type === "dub"
                                ) ? (
                                  <div className="serveSub flex gap-5 items-center">
                                    {" "}
                                    <div className="subb flex gap-1 items-center">
                                      <div>DUB</div>
                                      <div>:</div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                      {props.dataj.results?.streamingInfo
                                        .filter(
                                          (info) =>
                                            info.value.decryptionResult
                                              ?.type === "dub"
                                        )
                                        .map((no, idx) => (
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
                                              setServerName(
                                                no.value.decryptionResult.server
                                              ) &
                                              setBhaiLink(
                                                no.value.decryptionResult.source
                                                  .sources[0].file
                                              ) &
                                              setSubtitles("") &
                                              setIntrod(
                                                no.value.decryptionResult.source
                                                  .intro
                                              ) &
                                              setOutrod(
                                                no.value.decryptionResult.source
                                                  .outro
                                              )
                                            }
                                          >
                                            {no.value.decryptionResult.server}
                                          </div>
                                        ))}
                                        {props.gogoDub ? (
                                      <div
                                        className={`subDub ${
                                          subIsSelected
                                            ? selectedServer === 'gogo'
                                              ? "selected"
                                              : ""
                                            : ""
                                        }`}
                                        onClick={() =>
                                          setSelectedServer('gogo') &
                                          setSubIsSelected(false) &
                                          setServerName(
                                            'GogoCdn'
                                          ) &
                                          setBhaiLink(
                                            props.gogoDub
                                          ) &
                                          setSubtitles(
                                            ''
                                          ) &
                                          setIntrod(
                                            ''
                                          ) &
                                          setOutrod(
                                            ''
                                          )
                                        }
                                      >
                                        GogoCdn
                                      </div>
                                    ) : (
                                      ""
                                    )}
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
                                  {props.dataj.results?.streamingInfo
                                    .filter(
                                      (info) =>
                                        info.value.decryptionResult?.type ===
                                          "raw" || "sub"
                                    )
                                    .map((no, idx) => (
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
                                          setServerName(
                                            no.value.decryptionResult.server
                                          ) &
                                          setBhaiLink(
                                            no.value.decryptionResult.source
                                              .sources[0].file
                                          ) &
                                          setSubtitles(
                                            no.value.decryptionResult.source
                                              .tracks
                                          ) &
                                          setIntrod(
                                            no.value.decryptionResult.source
                                              .intro
                                          ) &
                                          setOutrod(
                                            no.value.decryptionResult.source
                                              .outro
                                          )
                                        }
                                      >
                                        {no.value.decryptionResult.server}
                                      </div>
                                    ))}
                                    {props.gogoSub ? (
                                      <div
                                        className={`subDub ${
                                          subIsSelected
                                            ? selectedServer === 'gogo'
                                              ? "selected"
                                              : ""
                                            : ""
                                        }`}
                                        onClick={() =>
                                          setSelectedServer('gogo') &
                                          setSubIsSelected(true) &
                                          setServerName(
                                            'GogoCdn'
                                          ) &
                                          setBhaiLink(
                                            props.gogoSub
                                          ) &
                                          setSubtitles(
                                            ''
                                          ) &
                                          setIntrod(
                                            ''
                                          ) &
                                          setOutrod(
                                            ''
                                          )
                                        }
                                      >
                                        GogoCdn
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                </div>
                              </div>
                            )}{" "}
                          </>
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
                                <Link
                                  href={`/${sea.id}`}
                                  onClick={handleNavigation}
                                >
                                  <div
                                    className={`season h-[70px] ${
                                      sea.isCurrent === true ? "currento" : ""
                                    }`}
                                  >
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
                        : props?.datao?.anime?.info?.name.slice(0, 50) + "..."}
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
                      Animoon is the best site to watch{" "}
                      {props.datao.anime.info.name} SUB online, or you can even
                      watch {props.datao.anime.info.name} DUB in HD quality. You
                      can also find {props.datao.anime.moreInfo.studios} anime
                      on Animoon website.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Share
            style={{
              paddingInline: 20,
            }}
            ShareUrl={props.ShareUrl}
            arise={props.arise}
          />

          <Comments
            epiod={props.epiod}
            epId={props.epId}
            anId={props.anId}
            firstName={props.firstName}
            userName={props.userName}
            imageUrl={props.imageUrl}
            emailAdd={props.emailAdd}
            IsLoading={IsLoading}
          />

          <RecommendedTopTen
            doIt={"doit"}
            datap={props.datao}
            data={props.datapp}
            isInGrid={"true"}
            IsLoading={IsLoading}
          />
        </div>
      )}
    </>
  );
}
