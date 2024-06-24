"use client";
import React, { useState, useEffect } from "react";
import "./navbar.css";
import Link from "next/link";
import { FaSearch, FaBars, FaBell, FaAngleRight } from "react-icons/fa";

import Actions from "./Actions";
import SocialLinks from "./SocialLinks";
import logo from "../../../public/logo.png";
import Image from "next/image";
import LazyImage from "@/utils/LazyImage";
import useAnime from "@/hooks/useAnime";
import loading from "../../../public/share.gif";
import LoadingSpinner from "../loadingSpinner";

export default function NavBar(props) {
  const [searchForm, setSearchForm] = useState({ name: "" });
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [floatSearchIsVisible, setFloatSearchIsVisible] = useState(false);
  const setSidebarIsOpen = props.setSidebarIsOpen;
  const pageIsScrolled = props.isScrolled;
  function handleSearchForm(event) {
    const { name, value } = event.target;
    setSearchForm((prev) => ({ ...prev, [name]: value }));
  }
  const hihi = searchForm?.name;
  const [data, setData] = useState([]);

  const { getSuggestSearch } = useAnime();
  let kat = null;
  const fetchLub = async () => {
    let dat = [];
    if (searchForm.name !== "") {
      dat = await getSuggestSearch(searchForm?.name);
    }
    kat = dat;
    console.log(dat);
    setData(dat);
  };

  useEffect(() => {
    fetchLub();
  }, [searchForm?.name]);

  const diljit = (id) => {
    setSearchForm({ name: "" })
    window.location.href = `/${id}`
  }
  const viron = () => {
    setSearchForm({ name: "" })
    window.location.href = `/search?name=${searchForm?.name}`
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setSearchForm({ name: "" });
      hihi !== ""
        ? (window.location.href = `/search?name=${searchForm?.name}`)
        : "";

      //window.location.replace('/watch');
      if (hihi !== "") {
        const { name, value } = e.target;
        setSearchForm((prev) => ({ ...prev, [name]: value }));
      } else {
        ("");
      }
    }
  };
  useEffect(() => {
    function handleChange() {
      setScreenWidth(window.innerWidth);
    }
    const listener = window.addEventListener("resize", handleChange);
    return () => window.removeEventListener(listener, handleChange);
  }, []);
  return (
    <>
      <nav
        className={`navigation-bar a-center d-flex ${
          pageIsScrolled ? "dark" : "transparent"
        } trans-03`}
      >
        <div className="menu-group a-center d-flex">
          <FaBars
            size={20}
            className="burger-icon trans-05"
            onClick={() => setSidebarIsOpen(true)}
          />
          <div className="logo-wrapper a-center d-flex">
            <Link href="/">
              <div style={{ width: "auto", height: "40px" }}>
                <Image
                  width={0}
                  height={0}
                  sizes="3%"
                  style={{
                    width: "auto",
                    height: window.innerWidth < 700 ? "40px" : "50px",
                  }}
                  src={logo}
                  className="logo"
                  alt="logo"
                  onClick={() => scrollTo({ top: 0 })}
                />
              </div>
            </Link>
          </div>
        </div>
        <div className="search-all">
          <div className="search-wrapper">
            <input
              style={
                pageIsScrolled
                  ? {
                      backgroundColor: "var(--grey-dark)",
                      color: "var(--theme)",
                    }
                  : { backgroundColor: "white", color: "black" }
              }
              type="text"
              className="search-text f-poppins  trans-03"
              placeholder="Search anime..."
              name="name"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleKeyPress(e);
                }
              }}
              value={searchForm?.name}
              onChange={(e) => handleSearchForm(e)}
            />

            {searchForm.name !== "" ? (
              <Link href={`/search/${searchForm?.name}`}>
                <FaSearch
                  onClick={() => {
                    window.scrollTo({ top: 0 });
                    setSearchForm({ name: "" });
                  }}
                  className="search-icon search-icons trans-03"
                  size={20}
                  style={
                    pageIsScrolled
                      ? {
                          color: "var(--theme)",
                        }
                      : { color: "black" }
                  }
                />
              </Link>
            ) : (
              <FaSearch
                onClick={() => {
                  window.scrollTo({ top: 0 });
                  setSearchForm({ name: "" });
                }}
                className="search-icon search-icons trans-03"
                size={20}
                style={
                  pageIsScrolled
                    ? {
                        color: "var(--theme)",
                      }
                    : { color: "black" }
                }
              />
            )}

            {/* <FaFilter className="filter-icon search-icons" size={20} color="grey" /> */}
          </div>
          {searchForm.name !== '' ? (
            data && data.suggestions ? (
              <div className="raam-one flex flex-col gap-2">
                {data &&
                  data.suggestions &&
                  data.suggestions.map((i) => (
                    <>
                      <div className="flex gap-2 innerP" onClick={()=> diljit(i.id)}>
                        <div>
                          <img width={50} src={i.poster} alt="" />
                        </div>
                        <div>
                          <div className="goi">
                            {i.name.length < 30
                              ? i.name
                              : i.name.slice(0, 30) + "..."}
                          </div>
                          <div className="uoi">
                            {i.jname.length < 30
                              ? i.jname
                              : i.jname.slice(0, 30) + "..."}
                          </div>
                          <div className="flex gap-1 items-center content-center">
                            <div className="uoi">{i.moreInfo[0]}</div>
                            <div className="dotol">&#x2022;</div>
                            <div className="doi">{i.moreInfo[1]}</div>
                            <div className="dotol">&#x2022;</div>
                            <div className="uoi">{i.moreInfo[2]}</div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                  <div className={`vire`} onClick={viron}>View All Results <FaAngleRight /></div>
              </div>
            ) : (
              <div className="koadna">
                <LoadingSpinner />
              </div>
            )
          ) : (
            ""
          )}
        </div>
        <SocialLinks />
        <Actions isInSidebar={false} />
        <div className="user-profile-nots a-center j-center d-flex trans-c-03">
          {screenWidth < 1300 && (
            <FaSearch
              onClick={() => {
                setFloatSearchIsVisible((prev) => !prev);
              }}
            />
          )}
        </div>
      </nav>
      {floatSearchIsVisible && (
        <div>
          <div className="floating-search-wrapper">
            <input
              type="text"
              className="search-text f-poppins"
              placeholder="Search anime..."
              name="name"
              value={searchForm?.name}
              onChange={(e) => handleSearchForm(e)}
              onKeyDown={(e) => handleKeyPress(e)}
            />
            <Link href={`/search?name=${searchForm?.name}`}>
              <FaSearch
                onClick={() => {
                  window.scrollTo({ top: 0 });
                  setSearchForm({ name: "" });
                  setFloatSearchIsVisible(false);
                }}
                className="search-icon search-icons"
                size={20}
                color="black"
              />
            </Link>
          </div>
          {searchForm.name !== "" ? (
            data && data.suggestions ? (
              <div className="raam flex flex-col gap-2">
                {data &&
                  data.suggestions &&
                  data.suggestions.map((i) => (
                    <>
                      <div className="flex gap-2 innerP" onClick={()=> diljit(i.id)}>
                        <div>
                          <img width={50} src={i.poster} alt="" />
                        </div>
                        <div>
                          <div>
                            {i.name.length < 30
                              ? i.name
                              : i.name.slice(0, 30) + "..."}
                          </div>
                          <div className="uoi">
                            {i.jname.length < 30
                              ? i.jname
                              : i.jname.slice(0, 30) + "..."}
                          </div>
                          <div className="flex gap-1 items-center content-center">
                            <div className="uoi">{i.moreInfo[0]}</div>
                            <div className="dotol">&#x2022;</div>
                            <div className="doi">{i.moreInfo[1]}</div>
                            <div className="dotol">&#x2022;</div>
                            <div className="uoi">{i.moreInfo[2]}</div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                  <div className="vire">View All Results <FaAngleRight /></div>
              </div>
            ) : (
              <div className="loadna">
                <LoadingSpinner />
              </div>
            )
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}
