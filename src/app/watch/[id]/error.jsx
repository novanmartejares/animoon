"use client";
import React from "react";
import Error from "@/component/SpecialErr/SpecialErr";

const error = () => {
  window.location.reload();
  return (
    <div>
      <Error />
    </div>
  );
};

export default error;
