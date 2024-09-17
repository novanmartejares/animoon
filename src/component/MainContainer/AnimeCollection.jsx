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
  const handleNavigation = () => {
    props.IsLoading(true);
  };
  const cards = props?.data?.map((data, idx) => {
    return (
      <Card key={data.id} data={data} collectionName={props.collectionName} IsLoading={props.IsLoading}/>
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
            onClick={handleNavigation}
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
            <Link
              href={
                props.fiki
                  ? `/grid?name=${props.filterName}&heading=${props.collectionName}`
                  : `/genre?id=${props.filterName}&name=${props.filterName}`
              }
              className="pagin-tile"
              onClick={handleNavigation}
            >
              <FaAngleDoubleLeft />
            </Link>
          ) : (
            ""
          )}
          {props.page ? (
            <Link
              href={
                props.fiki
                  ? `/grid?name=${props.filterName}&heading=${
                      props.collectionName
                    }&page=${parseInt(props.page) - 1}`
                  : `/genre?id=${props.filterName}&name=${
                      props.filterName
                    }&page=${parseInt(props.page) - 1}`
              }
              className="pagin-tile"
              onClick={handleNavigation}
            >
              <FaAngleLeft />
            </Link>
          ) : (
            ""
          )}
          {useArr.map((ii) => (
            <Link
              href={
                props.fiki
                  ? ii === 1
                    ? `/grid?name=${props.filterName}&heading=${props.collectionName}`
                    : `/grid?name=${props.filterName}&heading=${props.collectionName}&page=${ii}`
                  : ii === 1
                  ? `/genre?id=${props.filterName}&name=${props.filterName}`
                  : `/genre?id=${props.filterName}&name=${props.filterName}&page=${ii}`
              }
              className={`pagin-tile ${
                props.page
                  ? ii === parseInt(props.page)
                    ? "pagin-colo"
                    : ""
                  : ii === 1
                  ? "pagin-colo"
                  : ""
              }`}
              onClick={handleNavigation}
            >
              {ii}
            </Link>
          ))}
          {parseInt(props.page) !== props.totalPages ? (
            <Link
              href={
                props.fiki
                  ? `/grid?name=${props.filterName}&heading=${
                      props.collectionName
                    }&page=${props.page ? parseInt(props.page) + 1 : 2}`
                  : `/genre?id=${props.filterName}&name=${
                      props.filterName
                    }&page=${props.page ? parseInt(props.page) + 1 : 2}`
              }
              className="pagin-tile"
              onClick={handleNavigation}
            >
              <FaAngleRight />
            </Link>
          ) : (
            ""
          )}
          {parseInt(props.page) !== props.totalPages ? (
            <Link
              href={
                props.fiki
                  ? `/grid?name=${props.filterName}&heading=${props.collectionName}&page=${props.totalPages}`
                  : `/genre?id=${props.filterName}&name=${props.filterName}&page=${props.totalPages}`
              }
              className="pagin-tile"
              onClick={handleNavigation}
            >
              <FaAngleDoubleRight />
            </Link>
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
