"use client";
import React from "react";
import { FaRandom, FaComments, FaBroadcastTower } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter

export default function Actions({ isInSidebar }) {
  const router = useRouter(); // Initialize the router

  const handleRandomClick = () => {
    const randomId = Math.floor(Math.random() * 10000); // Generate random number
    router.push(`/random?rand=${randomId}`); // Push the route manually
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
      <span onClick={handleRandomClick} style={{ cursor: "pointer" }}>
        <FaRandom size={20} />
        <p>Random</p>
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
