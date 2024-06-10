import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const Chat = ({ id, title}) => {
  return (

      <div className={`chat-item`} >
        <Link to={`/chats/${id}`} className='chat-text'> <span>{title}</span> </Link>
      </div>

  );
};

export default Chat;
