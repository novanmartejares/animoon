"use client";
import React from "react";

import AnimeCollection from "@/component/MainContainer/AnimeCollectionJikan";
import Genre from "@/component/Genre/Genre";
import TopTenAnime from "@/component/TopTen/TopTenAnime";
import LoadingSpinner from "@/component/loadingSpinner";
import Error from "@/component/AnimeNotFound/Error";
import { motion } from "framer-motion";
import "./az.css";

export default function SearchResults(props) {
  return (
    <motion.div
      className="contA"
      style={
        window.innerWidth < 1081 ? { flexDirection: "column-reverse" } : {}
      }
      initial={{ opacity: 0 }}
      animate={{ x: [window.innerWidth / 2, 0], opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="collections-W">
        {!props.el ? (
          <LoadingSpinner />
        ) : props.el?.length < 1 ? (
          <Error />
        ) : (
          <AnimeCollection
            collectionName="Sort By Letters"
            data={props.el}
            sort={props.sort}
            page={props.page}
            para={props.para}
          />
        )}
      </div>
    </motion.div>
  );
}
