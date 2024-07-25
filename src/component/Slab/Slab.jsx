"use client";
import React, { useEffect, useState } from "react";
import useAnime from "@/hooks/useAnime";
import { useClerk } from "@clerk/nextjs";
import { FaBell, FaCog, FaHeart, FaHistory, FaUser } from "react-icons/fa";
import Link from "next/link";
import "./slab.css";

export default function Slab(props) {
  const { getUsers } = useAnime();
  const [user, setUser] = useState([]);
  const fetchUub = async () => {
    let dat = await getUsers();
    setUser(dat);
    console.log(dat);
  };
  useEffect(() => {
    fetchUub();
  }, []);
  return (
    <div className="allpit">
      <img className="allpit-background" src={props?.imageUrl} alt="pop" />
      <div className="hiik">Hi, {props?.firstName}</div>
      <div className="linkok">
        <Link
          href={"/user/profile"}
          className={`newPo ${props.slabId === "profile" ? "impot" : ""}`}
        >
          <div className="iconix">
            <FaUser />
          </div>
          <div className="namino">Profile</div>
        </Link>
        <Link
          href={"/user/continue-watching"}
          className={`newPo ${
            props.slabId === "continue watching" ? "impot" : ""
          }`}
        >
          <div className="iconix">
            <FaHistory />
          </div>
          <div className="namino">Continue Watching</div>
        </Link>
        <Link
          href={"/user/watch-list"}
          className={`newPo ${props.slabId === "watch list" ? "impot" : ""}`}
        >
          <div className="iconix">
            <FaHeart />
          </div>
          <div className="namino">Watch List</div>
        </Link>
        <Link
          href={"/user/notification"}
          className={`newPo ${props.slabId === "notification" ? "impot" : ""}`}
        >
          <div className="iconix">
            <FaBell />
          </div>
          <div className="namino">Notification</div>
        </Link>
        <Link
          href={"/user/settings"}
          className={`newPo ${props.slabId === "settings" ? "impot" : ""}`}
        >
          <div className="iconix">
            <FaCog />
          </div>
          <div className="namino">Settings</div>
        </Link>
      </div>
    </div>
  );
}
