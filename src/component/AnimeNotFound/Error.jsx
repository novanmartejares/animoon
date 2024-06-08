import React from "react";
import "./error.css";
import errorP from '../../../public/error.gif'
import Image from "next/image";
export default function Error() {
  return (
    <div
      style={{ marginTop: "65px" }}
      className="gogoanime-error d-flex-fd-column a-center j-center"
    >
      <Image src={errorP} alt="error"/>
      <h2>Sorry, we couldn't find the anime you requested.</h2>
    </div>
  );
}