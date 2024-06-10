import React from "react";
import Chip from "../Chip/Chip";

export default function JobHeaderInfo(props) {
  const {
    title = "",
    duration = "",
    place = "",
  } = props;

  return (
    <div className="job-header-info-container">
      <h1 className="job-header-title page-title">{title}</h1>
      <div className="chips-container-job-header-info">
        <Chip label={duration}/>
        <Chip label={place}/>
      </div>
    </div>
  )
}