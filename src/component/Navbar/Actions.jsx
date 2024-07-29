"use client";
import React, { useEffect, useState } from "react";
import { FaRandom, FaComments, FaBroadcastTower } from "react-icons/fa";
import Link from "next/link";
import useAnime from "@/hooks/useAnime";
export default function Actions({ isInSidebar }) {
  const handleClick1 = () => {
    window.location.href = `/random?rand=0`;
  };
  return (
    <div
      className="nav-actions f-poppins text-light trans-c-03 grid items-center"
      style={
        isInSidebar
          ? {
              display: "flex",
              background: "var(--dark)",
              marginInline: "0px",
              borderRadius: "0px",
            }
          : {}
      }
    >
      <span>
        <Link href="/working" className="anchor">
          <FaBroadcastTower size={20} />
          <p>Watch2gether</p>
        </Link>
      </span>
      <span>
        <div onClick={handleClick1}>
          <FaRandom size={20} />
          <p>Random</p>
        </div>
      </span>
      {!isInSidebar && (
        <span>
          <Link href="/working" className="anchor">
            <FaComments size={20} />
            <p>Community</p>
          </Link>
        </span>
      )}
    </div>
  );
}
