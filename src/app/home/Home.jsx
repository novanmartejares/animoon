"use client";
import React, { useState } from "react";
import Share from "@/component/Share/Share";
import Hero from "@/component/Hero/hero";
import Trending from "@/component/Trending/Trending";
import Featured from "@/component/Featured/Featured";
import MainContainer from "@/component/MainContainer/MainContainer";
import LoadingSpinner from "@/component/loadingSpinner";
import Script from "next/script";

const Home = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const IsLoading = (data) => {
    if (data) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 20000); // Adjust the timeout as needed
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Hero data={props.data.spotlightAnimes} IsLoading={IsLoading} />
          {/* <Henpro/> */}
          
          {/* Banner Ad Section */}
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <Script
              id="ad-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  atOptions = {
                    'key': '3e5c0db0e54f3f6872ff8546641e31c0',
                    'format': 'iframe',
                    'height': 60,
                    'width': 468,
                    'params': {}
                  };
                `,
              }}
            />
            <Script
              src="//disgustingmad.com/3e5c0db0e54f3f6872ff8546641e31c0/invoke.js"
              strategy="afterInteractive"
            />
          </div>

          <Trending data={props.data.trendingAnimes} IsLoading={IsLoading} />
          <Share ShareUrl={props.ShareUrl} />
          <Featured
            IsLoading={IsLoading}
            dataComp={props.dataComp}
            dataAir={props.dataAir}
            dataFav={props.dataFav}
            dataPopu={props.dataPopu}
          />
          <MainContainer
            data={props.data}
            dataNew={props.dataNew}
            IsLoading={IsLoading}
          />
        </div>
      )}
    </>
  );
};

export default Home;
