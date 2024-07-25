"use client";
import React from "react";
import { FaKey, FaUser } from "react-icons/fa";
import "./profito.css";

export default function Profito(props) {
  const timestampMs = props.joined;

  // Create a new Date object
  const date = new Date(timestampMs);

  // Get the date and time in a more readable format
  const dated = date.getDate();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthi = month[date.getMonth()];
  const year = date.getFullYear();

  return (
    <div className="comAll">
      <div className="profile-header">
        <FaUser /> Edit Profile
      </div>
      <div className="profile-content">
        <div className={`rofile-image`}>
          <img src={props.imageUrl} className="profile-img" alt="Profile" />
        </div>

        <div className="profile-details">
          <div className="profile-field">
            <div className="field-label">EMAIL ADDRESS</div>
            <input
              className="field-input"
              type="text"
              placeholder={props.emailAdd}
              name="email"
            />
          </div>
          <div className="profile-field">
            <div className="field-label">YOUR NAME</div>
            <input
              className="field-input"
              type="text"
              placeholder={props.firstName}
              name="name"
            />
          </div>
          <div className="profile-field">
            <div className="field-label">JOINED</div>
            <div className="field-value">
              {dated + "-" + monthi + "-" + year}
            </div>
          </div>
          <div className="paske">
            <FaKey />
            Change Password
          </div>
          <div className="save-button">Save</div>
        </div>

        <div className={`profile-image`}>
          <img src={props.imageUrl} className="profile-img" alt="Profile" />
        </div>
      </div>
    </div>
  );
}
