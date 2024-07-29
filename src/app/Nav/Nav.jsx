"use client";
import React, { useState, useEffect, Suspense } from "react";
import NavBar from "@/component/Navbar/Navbar";
import NavSidebar from "@/component/NavigationSidebar/NavSidebar";
import Advertize from "@/component/Advertize/Advertize";
import Footer from "@/component/Footer/Footer";
import { easeOut, motion } from "framer-motion";
import LoadingSpinner from "@/component/loadingSpinner";
import Profilo from "@/component/Profilo/Profilo";
import jwtDecode from "jwt-decode"; // Make sure to install jwt-decode

export default function Nav({ children, imageUrl, firstName, emailAdd }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [profiIsOpen, setProfiIsOpen] = useState(false);

  // Function to check token expiration
  const isTokenExpired = (token) => {
    if (!token) return true;
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  };

  // Function to refresh token
  const refreshToken = async () => {
    try {
      // Call your refresh token API endpoint
      const response = await fetch("/api/refresh-token", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token); // Store the new token
      }
    } catch (error) {
      console.error("Failed to refresh token", error);
    }
  };

  // Periodically check token validity
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isTokenExpired(token)) {
      refreshToken();
    }

    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (isTokenExpired(token)) {
        refreshToken();
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      if (scrollPosition > 0 && isScrolled === false) {
        setIsScrolled(true);
      } else if (scrollPosition === 0) {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  return (
    <motion.div
      className="app-container f-poppins"
      animate={{ y: [-window.innerHeight / 4, 10, 0] }}
      transition={{ duration: 0.3, ease: easeOut }}
    >
      <NavBar
        isScrolled={isScrolled}
        sidebarIsOpen={sidebarIsOpen}
        setSidebarIsOpen={setSidebarIsOpen}
        imageUrl={imageUrl}
        setProfiIsOpen={setProfiIsOpen}
        profiIsOpen={profiIsOpen}
      />
      <Profilo
        setProfiIsOpen={setProfiIsOpen}
        profiIsOpen={profiIsOpen}
        firstName={firstName}
        emailAdd={emailAdd}
      />
      <NavSidebar
        sidebarIsOpen={sidebarIsOpen}
        setSidebarIsOpen={setSidebarIsOpen}
      />
      <Advertize />
      <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
      <Footer />
    </motion.div>
  );
}
