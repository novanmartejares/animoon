import React from "react";
import Card from "../Card/Card";
import "./main-container.css";
import Link from "next/link";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
  FaChevronRight,
} from "react-icons/fa";
export default function AnimeCollection(props) {
  const cards = props?.data?.map((data, idx) => {
    return (
      <Card
        key={data.id}
        data={data}
        collectionName={props.collectionName}
      />
    );
  });

  let useArr = [];
  if (props.page) {
    if (parseInt(props.page) >= 3) {
      useArr = [
        parseInt(props.page) - 2,
        parseInt(props.page) - 1,
        parseInt(props.page),
        parseInt(props.page) + 1,
        parseInt(props.page) + 2,
      ];
    }
    if (parseInt(props.page) < 3) {
      useArr = [1, 2, 3];
    }
    if (parseInt(props.page) >= parseInt(props.totalPages) - 2) {
      useArr = [
        parseInt(props.totalPages) - 2,
        parseInt(props.totalPages) - 1,
        parseInt(props.totalPages),
      ];
    }
    if (parseInt(props.page) < parseInt(props.totalPages) - 2) {
      useArr = [
        parseInt(props.page) - 2,
        parseInt(props.page) - 1,
        parseInt(props.page),
        parseInt(props.page) + 1,
        parseInt(props.page) + 2,
      ];
    }
  } else {
    useArr = [1, 2, 3];
  }
  if (parseInt(props.page) === 2) {
    useArr = [1, 2, 3];
  }
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
          >
            View More
            <FaChevronRight size={14} />
          </Link>
        )}
      </div>

      <div className="card-wrapper d-flex a-center j-center">{cards}</div>
      {props.totalPages > 1 ? (
        <div className="paginA">
          {props.page ? (
            <div className="pagin-tile" >
              <FaAngleDoubleLeft />
            </div>
          ) : (
            ""
          )}
          {props.page ? (
            <div className="pagin-tile">
              <FaAngleLeft />
            </div>
          ) : (
            ""
          )}
          {useArr.map((ii) => (
            <div
              className={`pagin-tile ${
                props.page
                  ? ii === parseInt(props.page)
                    ? "pagin-colo"
                    : ""
                  : ii === 1
                  ? "pagin-colo"
                  : ""
              }`}
              
            >
              {ii}
            </div>
          ))}
          {parseInt(props.page) !== props.totalPages ? (
            <div className="pagin-tile">
              <FaAngleRight />
            </div>
          ) : (
            ""
          )}
          {parseInt(props.page) !== props.totalPages ? (
            <div className="pagin-tile">
              <FaAngleDoubleRight />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
