import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function FilterComponent(props) {
  const {
    label,
    isSelected = false,
    onClick = () => {}
  } = props;

  return (
    <button
      aria-pressed={isSelected}
      className="filter-button"
      onClick={onClick}
    >
      {label}
      {isSelected && <FontAwesomeIcon className="remove-filter-icon" icon={faXmark}/>}
    </button>
  )
}