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
        delay={idx * 0.05}
        collectionName={props.collectionName}
      />
    );
  });
  const startS = () => {
    window.location.href = props.fiki
      ? `/grid?name=${props.filterName}&heading=${props.collectionName}&page=${props.totalPages}`
      : `/genre?id=${props.filterName}&name=${props.filterName}&page=${props.totalPages}`;
  };
  const startM = () => {
    window.location.href = props.fiki
      ? `/grid?name=${props.filterName}&heading=${props.collectionName}&page=${
          props.page ? parseInt(props.page) + 1 : 2
        }`
      : `/genre?id=${props.filterName}&name=${props.filterName}&page=${
          props.page ? parseInt(props.page) + 1 : 2
        }`;
  };
  const sukuna = () => {
    window.location.href = props.fiki
      ? `/grid?name=${props.filterName}&heading=${props.collectionName}&page=${
          parseInt(props.page) - 1
        }`
      : `/genre?id=${props.filterName}&name=${props.filterName}&page=${
          parseInt(props.page) - 1
        }`;
  };
  const satoru = () => {
    window.location.href = props.fiki
      ? `/grid?name=${props.filterName}&heading=${props.collectionName}`
      : `/genre?id=${props.filterName}&name=${props.filterName}`;
  };
  const startO = () => {
    window.location.href = `/grid?name=${props.filterName}&heading=${props.collectionName}`;
  };
  const startDi = (ii) => {
    window.location.href = props.fiki
      ? ii === 1
        ? `/grid?name=${props.filterName}&heading=${props.collectionName}`
        : `/grid?name=${props.filterName}&heading=${props.collectionName}&page=${ii}`
      : ii === 1
      ? `/genre?id=${props.filterName}&name=${props.filterName}`
      : `/genre?id=${props.filterName}&name=${props.filterName}&page=${ii}`;
  };
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
            onClick={() => window.scrollTo({ top: 0 }) & startO()}
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
            <div className="pagin-tile" onClick={() => satoru()}>
              <FaAngleDoubleLeft />
            </div>
          ) : (
            ""
          )}
          {props.page ? (
            <div className="pagin-tile" onClick={() => sukuna()}>
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
              onClick={() => startDi(ii)}
            >
              {ii}
            </div>
          ))}
          {parseInt(props.page) !== props.totalPages ? (
            <div className="pagin-tile" onClick={() => startM()}>
              <FaAngleRight />
            </div>
          ) : (
            ""
          )}
          {parseInt(props.page) !== props.totalPages ? (
            <div className="pagin-tile" onClick={() => startS()}>
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
