import React from "react";
import Card from "../Card/CardJikan";
import "./main-container.css";
import Link from "next/link";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
export default function AnimeCollection(props) {
  function getAlphabets() {
    const alphabets = [];
    const startChar = "A".charCodeAt(0);
    const endChar = "Z".charCodeAt(0);
    for (let i = startChar; i <= endChar; i++) {
      alphabets.push(String.fromCharCode(i));
    }
    const links = alphabets.map((el) => {
      return (
        <Link
          href={`/a-z/alpha?sort=${el}`}
          key={el}
          className={`alphabet-jile ${
            props.sort === el ? "alpha-selected" : ""
          }`}
        >
          {el}
        </Link>
      );
    });
    return [...links];
  }

  const links = getAlphabets();

  const cards = props?.data.results.data?.map((data, idx) => {
    return (
      <Card
        key={data.data_id}
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
    if (parseInt(props.page) >= parseInt(props.data.results.totalPages) - 2) {
      useArr = [
        parseInt(props.data.results.totalPages) - 2,
        parseInt(props.data.results.totalPages) - 1,
        parseInt(props.data.results.totalPages),
      ];
    }
    if (parseInt(props.page) < parseInt(props.data.results.totalPages) - 2) {
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
      <div className="backI">
        <Link href={"/"} className="homiK">
          Home
        </Link>
        <div className="colY">&#x2022;</div>
        <div className="colY">A-Z List</div>
      </div>
      <div className="heddR">
        <h2 className="heddH9">{props.collectionName}</h2>{" "}
      </div>
      <div className="alphabet-jist d-flex">
        <Link href={"/a-z/all"}>
          <div
            className={`alphabet-jile ${props.sort ? "" : "alpha-selected"}`}
          >
            All
          </div>
        </Link>
        <Link href={"/a-z/other?sort=other"}>
          <div
            className={`alphabet-jile ${
              props.sort === "other" ? "alpha-selected" : ""
            }`}
          >
            #
          </div>
        </Link>
        <Link href={"/a-z/0-9?sort=0-9"}>
          <div
            className={`alphabet-jile ${
              props.sort === "0-9" ? "alpha-selected" : ""
            }`}
          >
            0-9
          </div>
        </Link>
        {links}
      </div>

      <div className="card-wrapper d-flex a-center j-center"> {cards}</div>
      {props.data.results.totalPages > 1 ? (
        <div className="paginA">
          {props.page ? (
            <Link
              href={
                props.sort
                  ? `/a-z/${props.para}?sort=${props.sort}`
                  : `/a-z/${props.para}`
              }
              className="pagin-tile"
            >
              <FaAngleDoubleLeft />
            </Link>
          ) : (
            ""
          )}
          {props.page ? (
            <Link
              href={
                props.sort
                  ? `/a-z/${props.para}?sort=${props.sort}&page=${
                      parseInt(props.page) - 1
                    }`
                  : `/a-z/${props.para}?page=${parseInt(props.page) - 1}`
              }
              className="pagin-tile"
            >
              <FaAngleLeft />
            </Link>
          ) : (
            ""
          )}
          {useArr.map((ii) => (
            <Link
              href={
                props.sort
                  ? ii === 1
                    ? `/a-z/${props.para}?sort=${props.sort}`
                    : `/a-z/${props.para}?sort=${props.sort}&page=${ii}`
                  : ii === 1
                  ? "/a-z/all"
                  : `/a-z/all?page=${ii}`
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
            >
              {ii}
            </Link>
          ))}
          {parseInt(props.page) !== props.data.results.totalPages ? (
            <Link
              href={
                props.sort
                  ? `/a-z/${props.para}?sort=${props.sort}&page=${
                      props.page ? parseInt(props.page) + 1 : 2
                    }`
                  : `/a-z/${props.para}?page=${
                      props.page ? parseInt(props.page) + 1 : 2
                    }`
              }
              className="pagin-tile"
            >
              <FaAngleRight />
            </Link>
          ) : (
            ""
          )}
          {parseInt(props.page) !== props.data.results.totalPages ? (
            <Link
              href={
                props.sort
                  ? `/a-z/${props.para}?sort=${props.sort}&page=${props.data.results.totalPages}`
                  : `/a-z/${props.para}?page=${props.data.results.totalPages}`
              }
              className="pagin-tile"
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
