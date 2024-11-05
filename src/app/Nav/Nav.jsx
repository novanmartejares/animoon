"use client";
import React, { useEffect, useState } from "react";
import NavBar from "@/component/Navbar/Navbar";
import NavSidebar from "@/component/NavigationSidebar/NavSidebar";
import Advertize from "@/component/Advertize/Advertize";
import { usePathname, useParams, useRouter } from "next/navigation";
import Footer from "@/component/Footer/Footer";
import Profilo from "@/component/Profilo/Profilo";
import LoadingSpinner from "@/component/loadingSpinner";
import SignInSignUpModal from "@/component/SignSignup/SignInSignUpModal";
import { SessionProvider } from "next-auth/react";
// import { useRouter } from "next/router";

export default function Nav({ children, session, data }) {
  const params = useParams(); // Fetch the dynamic params
  const pathname = usePathname(); // Get the current URL path
  const [isScrolled, setIsScrolled] = useState(false);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [profiIsOpen, setProfiIsOpen] = useState(false);
  const [logIsOpen, setLogIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Function to control loading state

  const IsLoading = (data) => {
    if (data) {
      if (data === "true-random") {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 10000); // Delay for 10 seconds
      } else {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000); // Delay for 2 seconds
      }
    }
  };

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
    <SessionProvider session={session}>
      <div className="app-container f-poppins">
        {/* Conditionally render NavBar only if not on the homepage */}
        {/* {pathname !== "/" && (
          <NavBar
            isScrolled={isScrolled}
            sidebarIsOpen={sidebarIsOpen}
            setSidebarIsOpen={setSidebarIsOpen}
            setProfiIsOpen={setProfiIsOpen}
            profiIsOpen={profiIsOpen}
            IsLoading={IsLoading}
            setLogIsOpen={setLogIsOpen}
            logIsOpen={logIsOpen}
            session={session}
          />
        )} */}
        <NavBar
          isScrolled={isScrolled}
          sidebarIsOpen={sidebarIsOpen}
          setSidebarIsOpen={setSidebarIsOpen}
          setProfiIsOpen={setProfiIsOpen}
          profiIsOpen={profiIsOpen}
          data={data}
          IsLoading={IsLoading}
          setLogIsOpen={setLogIsOpen}
          logIsOpen={logIsOpen}
          session={session}
        />
        <Profilo
          setProfiIsOpen={setProfiIsOpen}
          profiIsOpen={profiIsOpen}
          IsLoading={IsLoading}
        />
        <NavSidebar
          sidebarIsOpen={sidebarIsOpen}
          setSidebarIsOpen={setSidebarIsOpen}
          IsLoading={IsLoading}
          data={data}
        />
        <Advertize />
        <SignInSignUpModal setLogIsOpen={setLogIsOpen} logIsOpen={logIsOpen} />
        {isLoading ? <LoadingSpinner /> : children}
        <Footer IsLoading={IsLoading} />
      </div>
    </SessionProvider>
  );
}
