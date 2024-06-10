// NotificationPage.js
import React, { useContext, useState } from 'react';
import Notification from '../components/Notifications.js/Notification';
import GoBack from '../components/GoBack/GoBack';
import { MainCtx } from '../App';
import Loader from '../components/Loader/Loader';
import { deleteNotification } from '../API';

const NotificationPage = () => {

  const {
    notificationsList,
    notificationsLoading,
    setNotificationsList,
  } = useContext(MainCtx);

  const handleRemoveNotification = (id) => {
    setNotificationsList((prevNotifications) => prevNotifications.filter((notification) => notification.id !== id));
    deleteNotification(id);
  };

  return (
    <>
      <h1 className="page-title">Notifications</h1>
      {notificationsLoading ? (
        <Loader/>
      ) : (
        notificationsList?.length === 0 ? (
          <span>No notifications</span>
        ) : (
          notificationsList.map((notification) => (
            <Notification
              key={notification.id}
              id={notification.id}
              content={notification.text}
              onRemove={handleRemoveNotification}
              url={notification.url}
              isClickable={notification.isClickable}
            />
          ))
        )
      )}
    </>
  );
};

export default NotificationPage;
