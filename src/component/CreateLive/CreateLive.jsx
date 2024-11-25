"use client";
import Link from "next/link";
import React, { useState } from "react";
import "./createLive.css";
import {
  FaCircle,
  FaClosedCaptioning,
  FaInfoCircle,
  FaPlayCircle,
} from "react-icons/fa";
import { AiFillAudio } from "react-icons/ai";
import { FaCircleCheck } from "react-icons/fa6";

const CreateLive = (props) => {
  const [subIsSelected, setSubIsSelected] = useState(true);
  const [byTime, setByTime] = useState(true);

  return (
    <div className="kinj">
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
      <div className="flex">
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

        <div className="rn-all">
          <div className="rn1">
            <div className="rn-head">
              <div className="col-i">
                <FaInfoCircle />
              </div>
              <div>Room Name</div>
            </div>
            <div className="rn-bott">
              <div className="rn-b1t">
                <input
                  className="rn-input"
                  type="text"
                  placeholder={`Watch ${props.data.anime.info.name} together`}
                  name="text"
                />
              </div>
              <div className="rn-sug">
                You can change its name or just leave it by default
              </div>
            </div>
          </div>
          <div className="rn1 rn2">
            <div className="rn-head rn-mar">
              <div className="col-i">
                <FaPlayCircle />
              </div>{" "}
              <div>Sources</div>
            </div>
            <div className="rn-bott rn-ti">
              <div className="rn-sugg">
                Chosen source will be played in your room
              </div>
              <div className="rn-b2t">
                <div
                  className={`${subIsSelected ? "subo-col" : "subo"}`}
                  onClick={() => setSubIsSelected(true)}
                >
                  <div>
                    <FaClosedCaptioning size={14} />{" "}
                  </div>
                  <div>SUB</div>
                </div>
                <div
                  className={`${subIsSelected ? "subo" : "subo-col"}`}
                  onClick={() => setSubIsSelected(false)}
                >
                  <div>
                    <AiFillAudio size={14} />{" "}
                  </div>
                  <div>DUB</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rb-all">
          <div className="rb1">
            <div className="upp-bi">
              <div className="upp-bi1" onClick={() => setByTime(true)}>
                <div className={`${byTime ? "subi-col" : "subi"}`}>{byTime ? <FaCircleCheck /> : <FaCircle />}</div>
                <div>Start by time</div>
              </div>
              <div className="upp-bi1" onClick={() => setByTime(false)}>
                <div className={`${byTime ? "subi" : "subi-col"}`}>{byTime ? <FaCircle /> : <FaCircleCheck />}</div>
                <div>Start manual</div>
              </div>
            </div>
            <div className="rn-sugg">
              This room will be automatically started, please schedule it
            </div>
            <div className="str-t">Start Time</div>
          </div>
          <div className="rb1">
            <div className="rby">
              <div>Public</div>
              <div className="rn-sug tyi">With OFF, only who has the link can see this room.</div>
            </div>
            <div className="upp-bi1">
              <div className="cr1">Create Room</div>
              <div className="cr2">Cancel</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLive;
