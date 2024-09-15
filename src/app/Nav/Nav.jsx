"use client";
import React, { useState, useEffect } from "react";
import NavBar from "@/component/Navbar/Navbar";
import NavSidebar from "@/component/NavigationSidebar/NavSidebar";
import Advertize from "@/component/Advertize/Advertize";
import Footer from "@/component/Footer/Footer";
import Profilo from "@/component/Profilo/Profilo";

export default function Nav({ children, imageUrl, firstName, emailAdd }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [profiIsOpen, setProfiIsOpen] = useState(false);

  // Function to check token expiration

  // Function to refresh token

  // Periodically check token validity

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
    <div className="app-container f-poppins">
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
      {children}
      <Footer />
    </div>
  );
}
