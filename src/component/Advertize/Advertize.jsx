import React, { useEffect, useState } from "react";
import "./advertize.css";

const Advertize = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
    if (
      ((parseInt(localStorage.getItem("openT")) + 30 > 60
        ? parseInt(localStorage.getItem("openT")) - 60
        : parseInt(localStorage.getItem("openT")) + 30) ===
        time.getMinutes()) &
      (time.getSeconds === 1)
    ) {
      setAdver("true");
    }
    if (localStorage.getItem("openD")) {
      if (parseInt(localStorage.getItem("openD")) !== time.getDate()) {
        setAdver("true");
      }
    }
    if (localStorage.getItem("openH")) {
      if (parseInt(localStorage.getItem("openH")) !== time.getHours()) {
        setAdver("true");
      }
    }
  }, [time.getMinutes(),time.getDate(),time.getHours()]);
  const [adver, setAdver] = useState(
    localStorage.getItem("truth") ? localStorage.getItem("truth") : "true"
  );

  function Newtab() {
    localStorage.setItem("openT", time.getMinutes().toString());
    localStorage.setItem("openD", time.getDate().toString());
    localStorage.setItem("openH", time.getHours().toString());
    localStorage.setItem("truth", "false");
    window.open(
      "https://www.highcpmgate.com/hnq4sfr7se?key=fa60dc3aeeb0a08aa0476e80986ad233"
    );
  }

  return (
    <div
      className="Advertize"
      style={{ zIndex: adver === "true" ? 100 : -1 }}
      onClick={() => setAdver("false") & Newtab()}
    ></div>
  );
};

export default Advertize;
