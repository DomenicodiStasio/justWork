import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function GoBack(props) {
  const navigate = useNavigate();

  return (
    <div className="go-back-container">
      <button onClick={() => navigate(-1)} className="go-back-button">
        <FontAwesomeIcon icon={faArrowLeft}/>
      </button>
    </div>
  )
}