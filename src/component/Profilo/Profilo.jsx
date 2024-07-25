import React, { useEffect, useState } from "react";
import "./profilo.css";
import {
  FaArrowRight,
  FaBell,
  FaCog,
  FaHeart,
  FaHistory,
  FaUser,
} from "react-icons/fa";
import useAnime from "@/hooks/useAnime";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";

export default function Profilo(props) {
  const { getUsers } = useAnime();
  const { signOut } = useClerk()
  const [user, setUser] = useState([]);
  const fetchUub = async () => {
    let dat = await getUsers();
    setUser(dat);
  };
  useEffect(() => {
    fetchUub();
  }, []);
  return (
    <div
      className="profi"
      style={{ zIndex: props.profiIsOpen ? 100 : -1 }}
      onClick={() => props.setProfiIsOpen(false)}
    >
      <div
        className="profi-list"
        style={{
          transform: props.profiIsOpen
            ? "translateX(-260px)"
            : "translateX(250px)",
        }}
      >
        <div className="logA logAC">{props?.firstName}</div>
        <div className="logA logAB">
          {props.emailAdd}
        </div>
        <Link href={'/user/profile'} className="profD">
          <FaUser />
          Profile
        </Link>
        <Link href={'/user/continue-watching'} className="profD">
          <FaHistory />
          Continue Watching
        </Link>
        <Link href={'/user/watch-list'} className="profD">
          <FaHeart />
          Watch List
        </Link>
        <Link href={'/user/notification'} className="profD">
          <FaBell />
          Notification
        </Link>
        <Link href={'/user/settings'} className="profD">
          <FaCog />
          Settings
        </Link>

        <div className="logD" onClick={() => signOut({redirectUrl: '/'})}>
          Logout
          <FaArrowRight />
        </div>
      </div>
    </div>
  );
}
