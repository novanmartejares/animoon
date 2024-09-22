"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaSearch, FaBars, FaAngleRight } from "react-icons/fa";

import Actions from "./Actions";
import SocialLinks from "./SocialLinks";
import logo from "../../../public/logo.png";
import Image from "next/image";
import useAnime from "@/hooks/useAnime";
import "./navbar.css";
import { useRouter } from "next/router";

export default function NavBar(props) {
  const router = useRouter()
  const handleNavigation = () => {
    props.IsLoading(true);
  };
  const [searchForm, setSearchForm] = useState({ name: "" });
  const [floatSearchIsVisible, setFloatSearchIsVisible] = useState(false);

  const pageIsScrolled = props.isScrolled;
  const [data, setData] = useState([]);

  const { getSuggestSearch } = useAnime();

  const fetchLub = async () => {
    if (searchForm.name !== "") {
      const dat = await getSuggestSearch(searchForm.name);
      setData(dat);
    }
  };

  useEffect(() => {
    fetchLub();
  }, [searchForm.name]);

  const handleSearchForm = (event) => {
    const { name, value } = event.target;
    setSearchForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && searchForm.name !== "") {
      handleSearchClick();
    }
  };

  const handleSearchClick = () => {
    if (searchForm.name !== "") {
      setSearchForm({ name: "" });
      router.push(`/search?name=${searchForm?.name}`)
    }
  };

  const handleProfileClick = () => {
    props.setProfiIsOpen(true);
  };

  const handleSidebarClick = () => {
    props.setSidebarIsOpen(true);
  };

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
            onClick={handleSidebarClick}
          />
          <div className="logo-wrapper a-center d-flex">
            <Link href="/" passHref onClick={handleNavigation}>
              <div style={{ width: "auto", height: "40px" }}>
                <Image
                  width={0}
                  height={0}
                  sizes="3%"
                  style={{
                    width: "auto",
                  }}
                  src={logo}
                  className="logo"
                  alt="logo"
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
              className="search-text f-poppins trans-03"
              placeholder="Search anime..."
              name="name"
              value={searchForm.name}
              onChange={handleSearchForm}
              onKeyDown={handleKeyPress}
            />
            <FaSearch
              onClick={handleSearchClick}
              className="search-icon search-icons trans-03"
              size={20}
              style={
                props.isScrolled
                  ? { color: "var(--theme)" }
                  : { color: "black" }
              }
            />
          </div>
          {searchForm.name !== "" && data.suggestions ? (
            <div className="raam-one flex flex-col gap-2">
              {data.suggestions.map((i) => (
                <Link key={i.id} href={`/${i.id}`} passHref onClick={handleNavigation}>
                  <div
                    onClick={() => setSearchForm({ name: "" })}
                    className="suggestion-item flex gap-2"
                  >
                    <img width={50} src={i.poster} alt={i.name} />
                    <div>
                      <div className="goi">
                        {i.name.length < 30
                          ? i.name
                          : `${i.name.slice(0, 30)}...`}
                      </div>
                      <div className="uoi">
                        {i.jname.length < 30
                          ? i.jname
                          : `${i.jname.slice(0, 30)}...`}
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
                </Link>
              ))}
              <Link href={`/search?name=${searchForm.name}`} passHref onClick={handleNavigation}>
                <div
                  className="vire flex items-center gap-2"
                  onClick={() => setSearchForm({ name: "" })}
                >
                  View All Results <FaAngleRight />
                </div>
              </Link>
            </div>
          ) : null}
        </div>
        <SocialLinks />
        <Actions isInSidebar={false} IsLoading={props.IsLoading}/>
        <div className="righty">
          <div className="user-profile-nots a-center j-center d-flex trans-c-03">
            <div className="floating">
              <FaSearch
                onClick={() => setFloatSearchIsVisible((prev) => !prev)}
              />
            </div>{" "}
          </div>
          {props.imageUrl ? (
            <img
              src={props.imageUrl}
              className="profile-ico"
              onClick={handleProfileClick}
              alt="user"
            />
          ) : (
            <Link href="/sign-in" passHref onClick={handleNavigation}>
              <div className="Lognn">LogIn</div>
            </Link>
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
            value={searchForm.name}
            onChange={handleSearchForm}
            onKeyDown={handleKeyPress}
          />
          <FaSearch
            onClick={handleSearchClick}
            className="search-icon search-icons"
            size={20}
            color="black"
          />
          {searchForm.name !== "" && data.suggestions ? (
            <div className="raam flex flex-col gap-2">
              {data.suggestions.map((i) => (
                <Link key={i.id} href={`/${i.id}`} passHref onClick={handleNavigation}>
                  <div
                    onClick={() => setSearchForm({ name: "" })}
                    className="suggestion-item flex gap-2"
                  >
                    <img width={50} src={i.poster} alt={i.name} />
                    <div>
                      <div>{i.name}</div>
                      <div className="uoi">
                        {i.jname.length < 30
                          ? i.jname
                          : `${i.jname.slice(0, 30)}...`}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
              <Link href={`/search?name=${searchForm.name}`} passHref onClick={handleNavigation}>
                <div
                  className="vire flex items-center gap-2"
                  onClick={() => setSearchForm({ name: "" })}
                >
                  View All Results <FaAngleRight />
                </div>
              </Link>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}
