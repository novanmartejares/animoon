import React, { useEffect, useState } from "react";
import "./content-list.css";
import { FaChevronRight, FaClosedCaptioning, FaStar } from "react-icons/fa";
import Link from "next/link";
import { useInView } from "framer-motion";
import LazyImage from "../../utils/LazyImage";
import { AiFillAudio } from "react-icons/ai";
import MouseOverCard from "../Card/MouseOverCard";
export default function ContentList(props) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const list = props?.data?.map((el, idx) => {
    return (
      <li key={el.id} className="d-flex a-center">
        <LazyImage
          src={el.poster || el.images.webp.image_url}
          alt="poster"
          isAnimated={false}
        />

        <div className="anime-details d-flex-fd-column">
          <span className="title">
            <Link
              href={`/${el.id}`}
              className="trans-03"
              onClick={() => window.scrollTo({ top: 0 })}
            >
              {el.name || el.title}
            </Link>
          </span>
          <div className="episode-info d-flex f-ubuntu">
            <span className="episode-count">
              <FaClosedCaptioning size={14} />
              {el.episodes.sub || "?"}
            </span>{" "}
            {el.episodes.dub ? (
              <span className="episode-count-dub d-flex a-center j-center">
                <AiFillAudio size={14} />
                {el.episodes.dub || "?"}
              </span>
            ) : (
              ""
            )}
            <div className="dot"></div>
            <div className="show-type">{el.type}</div>
          </div>
        </div>
      </li>
    );
  });
  return (
    <div ref={ref} className="category-container d-flex-fd-column">
      <h4>{props.heading}</h4>
      <ul>{list}</ul>
      <Link
        href={`/grid?name=${props.filterName}&heading=${props.heading}`}
        className="view-more-link"
        onClick={() => window.scrollTo({ top: 0 })}
      >
        View More
        <FaChevronRight size={14} />
      </Link>
    </div>
  );
}
