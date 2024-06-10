import React from "react";

export default function Button(props) {
  const {
    label,
    onClick = () => {},
    className = ""
  } = props;

  return (
    <button className={`custom-button ${className}`} onClick={() => onClick()}>
      {label}
    </button>
  )
}