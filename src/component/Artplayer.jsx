"use client";
import Artplayer, { html } from "artplayer";
import artplayerPluginHlsQuality from "artplayer-plugin-hls-quality";
import Hls from "hls.js";
import React, { useRef, useEffect, useState } from "react";
import "@/component/artplayer.css";

function ArtPlayer(props, { ...rest }) {
  const artRef = useRef(null);
  function getInstance() {
    (art) => console.info(art);
  }
  const [epSource, setEpSource] = useState(null);
  const [kpSource, setKpSource] = useState(null);
  const [uri, setUri] = useState("");
  const [urt, setUrt] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [ingo, setIngo] = useState("");

  useEffect(() => {
    props.dataj.results.streamingInfo.map((i) => {
      if (i?.value?.decryptionResult?.server === "HD-1") {
        if (i?.value?.decryptionResult?.type === props.sub) {
          setIngo("yes");
          setNewUrl(i.value.decryptionResult.link);
        }
      }
    });
    props.data.sources &&
      props.data.sources.map((source) => {
        setUrt(source.url);
      });
    setKpSource(props.data);
    setEpSource(props.datag);
    props.datag &&
      props.datag.sources &&
      props.datag.sources.map((source) => {
        if (source.quality === "1080p") {
          setUri(source.url);
        }
      });
    console.log(props.datag);
  }, [props.data, props.datag]);
  let EngFile = "";
  kpSource &&
    kpSource.tracks &&
    kpSource.tracks.map((i) => {
      if ((i.kind === "captions") & i.default) {
        EngFile = i.file;
      }
    }),
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
  useEffect(() => {
    const art = new Artplayer({
      title: "hahahaha",
      container: ".artplayer-app",
      url: uri,
      type: "m3u8",
      plugins: [
        artplayerPluginHlsQuality({
          // Show quality in control
          control: false,

          // Show quality in setting
          setting: uri ? false : true,

          // Get the resolution text from level
          getResolution: (level) => level.height + "P",

          // I18n
          title: "Quality",
          auto: "Auto",
          default: "1080",
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
          ? epSource.sources.map((source) => ({
              default: source.quality === "1080p",
              html: source.quality,
              url: source.url,
            }))
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
              url: uri ? "" : EngFile ? EngFile : "",
            },
          ],
          onSelect: function (item) {
            art.subtitle.switch(item.url, {
              name: item.html,
            });
            return item.html;
          },
        },
      ],
      subtitle: {
        url: uri ? "" : EngFile ? EngFile : "",
        style: {
          color: "#fff",
          fontSize: "20px",
        },
        encoding: "utf-8",
      },
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
          '<img width="150" heigth="150" src="https://artplayer.org/assets/img/state.svg">',
        indicator:
          '<img width="16" heigth="16" src="https://artplayer.org/assets/img/indicator.svg">',
      },
    });

    if (getInstance && typeof getInstance === "function") {
      getInstance(art);
    }
    const dltr = localStorage.getItem("artplayer_settings");
    if (dltr) {
      let currentT = JSON.parse(dltr).times[!ingo ? uri : newUrl]
        ? JSON.parse(dltr).times[!ingo ? uri : newUrl]
        : 0;
      if (!localStorage.getItem("speciality")) {
        localStorage.setItem("speciality", currentT.toString());
      }
      art.on("ready", () => {
        art.currentTime = currentT;

        if (props.onn1 === "On") {
          art.play();
        } else {
          art.pause();
        }
      });
      if (!uri) {
        if (!art.url) {
          props.dataj.results.streamingInfo.map((i) => {
            if (i?.value?.decryptionResult?.server === "HD-1") {
              if (i?.value?.decryptionResult?.type === props.sub) {
                art.switchUrl(i.value.decryptionResult.link);
                setIngo("yes");
                setNewUrl(i.value.decryptionResult.link);
              }
            }
          });
          console.log("art.switch yehhh!!");
        }
      }
      if (props.gogoServe === "Anify") {
        art.switchUrl(newUrl);
        setIngo("yes");
      }
      art.on("video:timeupdate", () => {
        if (props.onn3 === "On") {
          if (
            (art.currentTime > props.data?.intro?.start) &
            (art.currentTime < props.data?.intro?.end)
          ) {
            art.seek = props.data?.intro?.end;
          }
          if (
            (art.currentTime > props.data?.outro?.start) &
            (art.currentTime < props.data?.outro?.end)
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
    // important /[^a-zA-Z0-9\-_\s]/g,""
    var str = "123^&*^&*^-_ asdasdsad";
    var clean = str.replace(/[^a-zA-Z0-9\-]/g, "");
    console.log(str);
    console.log(clean);
    const dltt = localStorage.getItem("artplayer_settings");
    if (dltt) {
      if (JSON.parse(dltt).times[uri ? uri : newUrl]) {
        if (localStorage.getItem("recent-episodes")) {
          // split the existing values into an array
          let vals = localStorage.getItem("recent-episodes").split(",");

          // if the value has not already been added
          if (!vals.includes(props.epId)) {
            // add the value to the array
            vals.push(props.epId);

            // sort the array

            // join the values into a delimeted string and store it
            localStorage.setItem("recent-episodes", vals.join(","));
          }
        } else {
          // the key doesn't exist yet, add it and the new value
          localStorage.setItem("recent-episodes", props.epId);
        }
      }
    }

    if (dltt) {
      if (JSON.parse(dltt).times[!ingo ? uri : newUrl]) {
        if (localStorage.getItem(props.anId.toString())) {
          console.log(localStorage.getItem(props.anId.toString()));
          // split the existing values into an array
          let vals = localStorage.getItem(props.anId.toString()).split(",");

          localStorage.setItem(`Rewatch-${props.anId.toString()}`, props.epId);

          // if the value has not already been added
          if (!vals.includes(props.epId.toString())) {
            // add the value to the array
            vals.push(props.epId).toString();

            // sort the array

            // join the values into a delimeted string and store it
            localStorage.setItem(props.anId.toString(), vals.join(","));
          }
        } else {
          // the key doesn't exist yet, add it and the new value
          localStorage.setItem(props.anId.toString(), props.epId.toString());
        }
      }
    }

    return () => {
      if (art && art.destroy) {
        art.destroy(false);
      }
    };
  }, [uri, newUrl, props.sub, props.gogoServe]);

  //className=" artplayer-app md:h-[800px] h-[250px] w-full"
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
