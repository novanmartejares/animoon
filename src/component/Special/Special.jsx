"use client";
import React, { useEffect, useRef } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

const VideoPlayer = ({ videoSrc, subtitleTracks }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const player = new Plyr(videoRef.current, {
      captions: { active: true, update: true },
    });

    return () => {
      player.destroy();
    };
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        className="plyr__video-embed"
        controls
        crossOrigin="anonymous"
      >
        <source src={videoSrc} type="application/x-mpegURL" />
        {subtitleTracks.map((track, index) => (
          <track
            key={index}
            kind="subtitles"
            src={track.src}
            srclang={track.srclang}
            label={track.label}
            default={track.default}
          />
        ))}
      </video>
    </div>
  );
};

export default VideoPlayer;
