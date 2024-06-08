import React from "react";
import Genre from "../Genre/Genre";
import TopTenAnime from "@/component/TopTen/TopTenAnime";
export default function MainSidebar(props) {
  let hour = props.hour
  let min = props.min
  let hours = props.hours
  let minute = props.minute
  return (
    <div className="d-flex-fd-column">
      <Genre isInNavbar={false} hours={hours} minute={minute} hour={hour} min={min} />
      <TopTenAnime hours={hours} minute={minute} hour={hour} min={min} />
    </div>
  );
}