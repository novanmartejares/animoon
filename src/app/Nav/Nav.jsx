"use client";
import React, { useState, useEffect } from "react";
import NavBar from "@/component/Navbar/Navbar";
import NavSidebar from "@/component/NavigationSidebar/NavSidebar";
import Advertize from "@/component/Advertize/Advertize";
import { usePathname, useParams } from "next/navigation";
import Footer from "@/component/Footer/Footer";
import Profilo from "@/component/Profilo/Profilo";
import LoadingSpinner from "@/component/loadingSpinner";

export default function Nav({ children, imageUrl, firstName, emailAdd }) {
  const params = useParams(); // Fetch the dynamic params
  const pathname = usePathname(); // Get the current URL path
  const [isScrolled, setIsScrolled] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [profiIsOpen, setProfiIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Function to control loading state
  const IsLoading = (data) => {
    if (data) {
      if (data === "true-random") {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 10000); // Delay for 2 seconds
      } else {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000); // Delay for 2 seconds
      }
    }
  };

  // Handle scroll to set isScrolled state
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollPosition > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="app-container f-poppins">
      <NavBar
        isScrolled={isScrolled}
        sidebarIsOpen={sidebarIsOpen}
        setSidebarIsOpen={setSidebarIsOpen}
        imageUrl={imageUrl}
        setProfiIsOpen={setProfiIsOpen}
        profiIsOpen={profiIsOpen}
        IsLoading={IsLoading}
      />
      <Profilo
        setProfiIsOpen={setProfiIsOpen}
        profiIsOpen={profiIsOpen}
        firstName={firstName}
        emailAdd={emailAdd}
        IsLoading={IsLoading}
      />
      <NavSidebar
        sidebarIsOpen={sidebarIsOpen}
        setSidebarIsOpen={setSidebarIsOpen}
        IsLoading={IsLoading}
      />
      <Advertize />
      {isLoading ? <LoadingSpinner /> : children}
      <Footer IsLoading={IsLoading} />
    </div>
  );
}
