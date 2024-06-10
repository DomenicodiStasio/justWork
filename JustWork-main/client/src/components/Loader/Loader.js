import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import noScroll from "no-scroll";
import React, { useEffect } from "react";

export default function Loader(props) {
  const {
    text = "Loading..."
  } = props;

  useEffect(() => {
    noScroll.on();

    return () => noScroll.off();
  }, []);

  return (
    <div className="loader-container">
      <div className="spinner">
        <FontAwesomeIcon icon={faSpinner}/>
      </div>
      <span className="loader-text">{text}</span>
    </div>
  )
}