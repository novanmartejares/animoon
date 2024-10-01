import React from "react";
import "./henpro.css";

const Henpro = () => {
  return (
    <div className="center-container">
      <a
        href="http://henpro.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="link-background" // Add a class for background styling
      >
        <div className="visiClu">
          <div>Click to visit</div>
          <div className="henClu">Henpro</div>
        </div>

        <div className="ciciClu">
          <div>The Best Site to watch</div>
          <div className="henClu">Hentai</div>
          <div>animes free in 1080p</div>
        </div>
      </a>
    </div>
  );
};

export default Henpro;
