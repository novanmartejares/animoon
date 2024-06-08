'use client'
import React from "react";

import AnimeCollection from "@/component/MainContainer/AnimeCollectionJikan";
import Genre from "@/component/Genre/Genre";
import TopTenAnime from "@/component/TopTen/TopTenAnime";
import LoadingSpinner from "@/component/loadingSpinner";
import Error from "@/component/AnimeNotFound/Error";
import { motion } from "framer-motion";
export default function SearchResults(props) {

  return (
    <motion.div
      className=" main-container d-flex  "
      style={
        window.innerWidth < 1081 ? { flexDirection: "column-reverse" } : {}
      }
      initial={{ opacity: 0 }}
      animate={{ x: [window.innerWidth / 2, 0], opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="sidebar-wrapper d-flex-fd-column">
        <Genre />
        <TopTenAnime />
      </div>
      <div className="collections-wrapper">
        {!props.el ? (
          <LoadingSpinner />
        ) : props.el.data?.length < 1 ? (
          <Error />
        ) : (
          <AnimeCollection collectionName="Search Results" data={props.el.data} />
        )}
      </div>
    </motion.div>
  );
}

