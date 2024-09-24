import React from "react";
import "./content-list.css";
import { FaChevronRight, FaClosedCaptioning } from "react-icons/fa";
import Link from "next/link";
import { AiFillAudio } from "react-icons/ai";
export default function ContentList(props) {
  const handleNavigation = () => {
    props.IsLoading(true);
  };

  const list = props?.data?.map((el, idx) => {
    return (
      <li key={el.id} className="d-flex a-center">
        <img
          src={el.poster}
          alt="poster"
          isAnimated={false}
        />

        <div className="anime-details d-flex-fd-column">
          <span className="title">
            <Link
              href={`/${el.id}`}
              className="trans-03"
            >
              { el.name.length > 50 ? el.name.slice(0,50) + '...' : el.name || '' }
            </Link>
          </span>
          <div className="episode-info d-flex f-ubuntu">
            <span className="episode-count">
              <FaClosedCaptioning size={14} />
              {el.episodes?.sub || "?"}
            </span>{" "}
            {el.episodes?.dub ? (
              <span className="episode-count-dub d-flex a-center j-center">
                <AiFillAudio size={14} />
                {el.episodes?.dub || "?"}
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
    <div className="category-container d-flex-fd-column">
      <h4>{props.heading}</h4>
      <ul>{list}</ul>
      <Link
        href={`/grid?name=${props.filterName}&heading=${props.heading}`}
        prefetch
        className="view-more-link"
        onClick={handleNavigation}
      >
        View More
        <FaChevronRight size={14} />
      </Link>
    </div>
  );
}
