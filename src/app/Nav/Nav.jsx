'use client'
import React, { useState, useEffect, Suspense } from "react";
import NavBar from "@/component/Navbar/Navbar";
import NavSidebar from "@/component/NavigationSidebar/NavSidebar";
import Advertize from '@/component/Advertize/Advertize'
import Footer from "@/component/Footer/Footer";
import { easeOut, motion } from "framer-motion";
import LoadingSpinner from "@/component/loadingSpinner";
export default function Nav({children}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

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
      />
      <NavSidebar
        sidebarIsOpen={sidebarIsOpen}
        setSidebarIsOpen={setSidebarIsOpen}
      />
      <Advertize />
      <Suspense fallback={<LoadingSpinner />}>
        {children}
      </Suspense>

      <Footer />
    </motion.div>
  );
}