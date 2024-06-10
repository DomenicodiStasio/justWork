import React from "react";
import user from "../icons/user.png"
import { Link } from 'react-router-dom';

export default function UserPage(props) {
  return (
    <>
      <div className="container-profile ">
        <img src={user}/>
        <span > Mario Rossi </span>
      </div>
      
      <Link className="userpage-link" to="/a&q"> Most asked questions </Link>

      <Link className="userpage-link" to="/chats"> List of all your active chats </Link>

    </>
  )
}