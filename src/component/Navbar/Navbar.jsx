"use client";
import React, { useState, useEffect } from "react";
import "./navbar.css";
import Link from "next/link";
import { FaSearch, FaBars, FaBell } from "react-icons/fa";

import Actions from "./Actions";
import SocialLinks from "./SocialLinks";
import logo from "../../../public/logo.png";
import Image from "next/image";
import LazyImage from "@/utils/LazyImage";

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
  console.log(searchForm);
  const hihi = searchForm?.name;
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
                    height: window.innerWidth < 700 ? "30px" : "40px",
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
        <div className="search-wrapper">
          <input
            style={
              pageIsScrolled
                ? { backgroundColor: "var(--grey-dark)", color: "var(--theme)" }
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
      )}
    </>
  );
}
