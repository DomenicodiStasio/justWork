// Notification.js
import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { MainCtx } from '../../App';

const Notification = ({ id, content, onRemove, url, isClickable }) => {

  const {
    handleMarkNotificationRead
  } = useContext(MainCtx)

  return (

      <div className={`notification-item ${!isClickable?"notification-item-not-clickable": ""}`} >
        <Link style={!isClickable?{pointerEvents:'none'}:{}} to={url} onClick={() => handleMarkNotificationRead(id)} className='notification-text'> <span>{content}</span> </Link>
        <button className='remove-notification-button' onClick={() => onRemove(id)}>
          <FontAwesomeIcon className="remove-notification-icon" icon={faTimes} />
        </button>
      </div>

  );
};

export default Notification;
