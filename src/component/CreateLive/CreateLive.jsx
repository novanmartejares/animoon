import Link from "next/link";
import React from "react";
import "./createLive.css";
import { FaClosedCaptioning } from "react-icons/fa";
import { AiFillAudio } from "react-icons/ai";

const CreateLive = (props) => {
  return (
    <div>
      <div>
        <div className="flex gap-1 items-center specif">
          <Link href={"/"}>
            <div className="homo">Home</div>
          </Link>
          <div className="dotoi">&#x2022;</div>
          <div className="homo">Watch together</div>
          <div className="doto">&#x2022;</div>
          <div className="namo">Create a new room</div>
        </div>
      </div>
      <div>Create a new room</div>
      <div>
        <div className="anime-container">
          {/* Blurred Background Image */}
          <div
            className="background-image"
            style={{
              backgroundImage: `
            linear-gradient(rgba(93, 93, 93, 0.701), rgba(93, 93, 93, 0.701)), /* Color overlay */
            url('https://www.transparenttextures.com/patterns/dots.png'), /* Dotted pattern */
            url(${props.data.anime.info.poster}) /* Background image */
          `,
            }}
          ></div>

          {/* Foreground Content */}
          <div className="anime-content">
            <div className="anime-pos">
              <img src={props.data.anime.info.poster} alt="anime poster" />
            </div>
            <div className="anime-namik">{props.data.anime.info.name}</div>
            <div className="third-reich">
              <div className="inner-reich">
                <div className="inner-texi rat">
                  {props.data.anime.info.stats.rating}
                </div>
                <div className="inner-texi qual">
                  {props.data.anime.info.stats.quality}
                </div>
                <div className="inner-texi subE">
                  <div>
                    <FaClosedCaptioning size={14} />{" "}
                  </div>
                  <div>{props.data.anime.info.stats.episodes.sub}</div>
                </div>
                <div className="inner-texi dubE">
                  <div>
                    <AiFillAudio size={14} />{" "}
                  </div>
                  <div>{props.data.anime.info.stats.episodes.dub}</div>
                </div>
              </div>
              <div className="doto">&#x2022;</div>
              <div className="inner-texi">
                {props.data.anime.info.stats.type}
              </div>
              <div className="doto">&#x2022;</div>
              <div className="inner-texi">
                {props.data.anime.info.stats.duration}
              </div>
            </div>
            <div className="descriptol">
              {props.data.anime.info.description.length < 216
                ? props.data.anime.info.description
                : props.data.anime.info.description.slice(0, 216) + "..."}
            </div>
          </div>
        </div>

        <div>
          <div></div>
          <div></div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default CreateLive;
