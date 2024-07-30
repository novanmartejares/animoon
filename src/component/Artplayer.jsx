"use client";
import Artplayer, { html } from "artplayer";
import artplayerPluginHlsQuality from "artplayer-plugin-hls-quality";
import artplayerPluginChapter from "artplayer-plugin-chapter";
import Hls from "hls.js";
import React, { useRef, useEffect, useState } from "react";
import "@/component/artplayer.css";
import useAnime from "@/hooks/useAnime";

function ArtPlayer(props, { ...rest }) {
  const artRef = useRef(null);
  function getInstance() {
    (art) => console.info(art);
  }
  const { getAnimeInfo } = useAnime();
  const [epSource, setEpSource] = useState(null);
  const [kpSource, setKpSource] = useState(null);
  const [dpSource, setDpSource] = useState(null);
  const [uri, setUri] = useState("");
  const [urt, setUrt] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [ingo, setIngo] = useState("");

  useEffect(() => {
    if (props.dataj && props.dataj.results) {
      props.dataj.results.streamingInfo.forEach((i) => {
        if (
          i?.value?.decryptionResult?.server === "HD-1" &&
          i?.value?.decryptionResult?.type === props.sub
        ) {
          setIngo("yes");
          setNewUrl(i.value.decryptionResult.link);
        }
      });
    }
    setDpSource(props.dataj);

    if (props.data.sources) {
      props.data.sources.forEach((source) => {
        setUrt(source.url);
      });
    }
    setKpSource(props.data);
    setEpSource(props.datag);

    if (props.datag && props.datag.sources) {
      props.datag.sources.forEach((source) => {
        if (source.quality === "1080p") {
          setUri(source.url);
        }
      });
    }
  }, [props.data, props.datag, props.dataj]);

  console.log("1", props.Kaid);
  let EngFile = "";
  if (kpSource && kpSource.tracks) {
    kpSource.tracks.forEach((i) => {
      if (i.kind === "captions" && i.default) {
        EngFile = i.file;
      }
    });
  }
  console.log(uri);

  function playM3u8(video, url, art) {
    if (Hls.isSupported()) {
      if (art.hls) art.hls.destroy();
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
      art.hls = hls;
      art.on("destroy", () => hls.destroy());
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
    } else {
      art.notice.show = "Unsupported playback format: m3u8";
    }
  }

  let FinalUrl = uri;
  if (!FinalUrl) {
    setTimeout(() => {
      FinalUrl = newUrl;
    }, 5000);
  }
  if (props.gogoServe === "Anify") {
    FinalUrl = newUrl;
  }

  function setPlat() {
    localStorage.setItem(`newW-${props.epId}`, FinalUrl);
  }
  if (!localStorage.getItem(`newFa-${props.epId}`)) {
    setTimeout(setPlat, 10000);
  }
  localStorage.setItem(`subEp-${props.anId}`, props.subEp);
  localStorage.setItem(`dubEp-${props.anId}`, props.dubEp);
  localStorage.setItem(`epNumo-${props.anId}`, props.epNum);
  localStorage.setItem(`subLang-${props.anId}`, props.sub);
  localStorage.setItem(`subEp-${props.epId}`, props.sub);
  localStorage.setItem(`imgUra-${props.anId}`, props.imgUra);
  localStorage.setItem(`ratUra-${props.anId}`, props.ratUra);
  localStorage.setItem(`dura-${props.anId}`, props.durEp);
  localStorage.setItem(`nameUra-${props.anId}`, props.nameUra);
  localStorage.setItem(`subLang`, props.sub);

  console.log("1000$", FinalUrl);
  const dltt = localStorage.getItem("artplayer_settings");
  const obj = {};
  obj.anId = props.anId;
  obj.epId = props.epId;
  obj.epNum = props.epNum;
  obj.sub = props.sub;
  obj.duration = dltt
    ? JSON.parse(dltt).times[localStorage.getItem(`newW-${props.epId}`)]
      ? JSON.parse(dltt).times[localStorage.getItem(`newW-${props.epId}`)]
      : ""
    : "";

  const m3u8 = localStorage.getItem("recent-episodes")
    ? localStorage.getItem("recent-episodes").split(",")
    : [];
  if (m3u8) {
    m3u8.forEach((mm) => {
      console.log(
        "raam raam",
        localStorage.getItem(`newW-${mm}`)
          ? localStorage.getItem(`newW-${mm}`)
          : ""
      );
    });
  }

  if (dltt) {
    if (JSON.parse(dltt).times[uri ? uri : newUrl]) {
      if (localStorage.getItem("recent-episodes")) {
        let vals = localStorage.getItem("recent-episodes").split(",");
        if (!vals.includes(props.epId)) {
          vals.push(props.epId);
          localStorage.setItem("recent-episodes", vals.join(","));
        }
      } else {
        localStorage.setItem("recent-episodes", props.epId);
      }
    }
  }

  if (localStorage.getItem("Recent-animes")) {
    let vals = localStorage.getItem("Recent-animes").split(",");
    if (vals.includes(props.anId)) {
      vals = vals.filter((val) => val !== props.anId);
    }
    vals.unshift(props.anId);
    localStorage.setItem("Recent-animes", vals.join(","));
  } else {
    localStorage.setItem("Recent-animes", props.anId);
  }

  if (dltt) {
    if (JSON.parse(dltt).times[!ingo ? uri : newUrl]) {
      if (localStorage.getItem(props.anId.toString())) {
        console.log(localStorage.getItem(props.anId.toString()));
        let vals = localStorage.getItem(props.anId.toString()).split(",");
        localStorage.setItem(`Rewatch-${props.anId.toString()}`, props.epId);
        if (!vals.includes(props.epId.toString())) {
          vals.push(props.epId.toString());
          localStorage.setItem(props.anId.toString(), vals.join(","));
        }
      } else {
        localStorage.setItem(props.anId.toString(), props.epId.toString());
      }
    }
  }
  const quality = (epSource && epSource.sources)
  ? (() => {
      // Map the sources to the format required by Artplayer
      const sources = epSource.sources.map(source => ({
        default: false,
        html: source.quality,
        url: source.url,
      }));

      // Helper function to set default quality
      const setDefaultQuality = (quality) => {
        const qualitySource = sources.find(source => source.html === quality);
        if (qualitySource) {
          qualitySource.default = true;
          return true;
        }
        return false;
      };

      // Set the default quality in the order of preference
      if (!setDefaultQuality("1080p")) {
        if (!setDefaultQuality("720p")) {
          if (!setDefaultQuality("480p")) {
            setDefaultQuality("360p");
          }
        }
      }

      return sources;
    })()
  : [];

  useEffect(() => {
    const art = new Artplayer({
      title: "hahahaha",
      container: ".artplayer-app",
      url: quality.find(q => q.default)?.url || FinalUrl,
      type: "m3u8",
      plugins: [
        artplayerPluginHlsQuality({
          control: false,
          setting: uri ? false : true,
          getResolution: (level) => level.height + "P",
          title: "Quality",
          auto: "Auto",
        }),

      ],
      customType: {
        m3u8: playM3u8,
      },
      volume: 3,
      isLive: false,
      muted: false,
      autoplay: false,
      autoOrientation: true,
      pip: true,
      autoSize: false,
      lock: true,
      autoMini: false,
      screenshot: true,
      setting: true,
      loop: false,
      flip: true,
      playbackRate: true,
      aspectRatio: true,
      fullscreen: true,
      fullscreenWeb: false,
      subtitleOffset: false,
      miniProgressBar: false,
      mutex: true,
      backdrop: true,
      playsInline: true,
      autoPlayback: true,
      airplay: true,
      theme: "#F5316F",
      whitelist: ["*"],
      moreVideoAttr: {
        crossOrigin: "anonymous",
      },
      quality:
        epSource && epSource.sources
          ? quality
          : [],

      settings: [
        {
          width: 200,
          html: "Subtitle",
          tooltip: "English",
          icon: '<img width="22" heigth="22" src="https://artplayer.org/assets/img/subtitle.svg">',
          selector: [
            {
              html: "Display",
              tooltip: "Show",
              switch: true,
              onSwitch: function (item) {
                item.tooltip = item.switch ? "Hide" : "Show";
                art.subtitle.show = !item.switch;
                return !item.switch;
              },
            },
            {
              default: true,
              html: "English",
              url: EngFile,
              switch: true,
              onSwitch: function (item) {
                art.subtitle.switch(item.url, {
                  name: "English",
                  type: "vtt",
                  encoding: "utf-8",
                });
                return item.switch;
              },
            },
          ],
          onSelect: function (item) {
            console.log("Subtitle: ", item.html);
            return item.html;
          },
        },
        {
          html: "More",
          width: 250,
          selector: [
            {
              default: true,
              html: "720P",
              url: uri,
            },
            {
              html: "1080P",
              url: uri,
            },
          ],
          onSelect: function (item) {
            art.switchQuality(item.url);
            return item.html;
          },
        },
      ],
      highlight: [
        {
          time: parseInt(props.data?.intro?.start),
          text: "Opening Start",
        },
        {
          time: parseInt(props.data?.intro?.end),
          text: "Opening End",
        },
        {
          time: parseInt(props.data?.outro?.start),
          text: "Ending Start",
        },
        {
          time: parseInt(props.data?.outro?.end),
          text: "Ending End",
        },
      ],
      icons: {
        loading: '<img src="https://artplayer.org/assets/img/ploading.gif">',
        state:
          '<img width="150" height="150" src="https://artplayer.org/assets/img/state.svg">',
        indicator:
          '<img width="16" height="16" src="https://artplayer.org/assets/img/indicator.svg">',
      },
    });

    if (getInstance && typeof getInstance === "function") {
      getInstance(art);
    }

    const dltr = localStorage.getItem("artplayer_settings");
    if (dltr) {
      let currentT = JSON.parse(dltr).times[
        localStorage.getItem(`newW-${props.epId}`)
      ]
        ? JSON.parse(dltr).times[localStorage.getItem(`newW-${props.epId}`)]
        : 0;
      art.on("ready", () => {
        art.currentTime = currentT;
        localStorage.setItem(`duran-${props.anId}`, art.duration);
        if (props.onn1 === "On") {
          art.play();
        } else {
          art.pause();
        }
      });
      art.on("video:timeupdate", () => {
        if (props.onn3 === "On") {
          if (
            art.currentTime > props.data?.intro?.start &&
            art.currentTime < props.data?.intro?.end
          ) {
            art.seek = props.data?.intro?.end;
          }
          if (
            art.currentTime > props.data?.outro?.start &&
            art.currentTime < props.data?.outro?.end
          ) {
            art.seek = props.data?.outro?.end;
          }
        }
      });
      art.on("subtitleUpdate", (text) => {
        art.template.$subtitle.innerHTML = text;
      });
      art.on("resize", () => {
        art.subtitle.style({
          fontSize: art.height * 0.05 + "px",
        });
      });
      art.on("video:ended", () => {
        if (props.onn2 === "On") {
          props.getData("YES");
        }
      });
    }

    return () => {
      if (art && art.destroy) {
        art.destroy(false);
      }
    };
  }, [uri, newUrl, props.sub, props.gogoServe, props.Kaid]);

  return (
    <>
      <div
        className="artplayer-app md:h-[800px] h-[250px] w-full absolute top-0 left-0"
        {...rest}
      ></div>
    </>
  );
}

export default ArtPlayer;
