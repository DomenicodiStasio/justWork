import React from "react";

export default function Chip(props) {
  const {
    label = ""
  } = props;

  return (
    <div className="chip-container">
      <span className="chip-label">
        {label}
      </span>
    </div>
  )
}