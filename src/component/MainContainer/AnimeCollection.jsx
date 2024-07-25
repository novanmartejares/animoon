import React from "react";
import Card from "../Card/Card";
import "./main-container.css";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";
export default function AnimeCollection(props) {
  const cards = props?.data?.map((data, idx) => {
    return (
      <Card
        key={data.id}
        data={data}
        delay={idx * 0.05}
        collectionName={props.collectionName}
      />
    );
  });
  const startO = () => {
    window.location.href = `/grid?name=${props.filterName}&heading=${props.heading}`;
  };
  return (
    <div className="anime-collection-wrapper">
      <div className="heddR">
        <h2 className="heddH2">{props.collectionName}</h2>{" "}
        {props.isInGrid ? (
          ""
        ) : (
          <Link
            href={`/grid?name=${props.filterName}&heading=${props.collectionName}`}
            className="view-more-linkop"
            onClick={() => window.scrollTo({ top: 0 }) & startO()}
          >
            View More
            <FaChevronRight size={14} />
          </Link>
        )}
      </div>

      <div className="card-wrapper d-flex a-center j-center">{cards}</div>
    </div>
  );
}
