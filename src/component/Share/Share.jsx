import React from "react";
import "./Share.css";
import share from "../../../public/share.gif";
import Image from "next/image";

export default function Share(props) {
  return (
    <div className="share-app d-flex a-center f-poppins" style={props?.style}>
      <Image width={50} height={50} src={share} alt="share" />
      <div>
        <p className="primary">Share AniMoon</p>
        <p className="secoi">to your friends</p>
      </div>
    </div>
  );
}
