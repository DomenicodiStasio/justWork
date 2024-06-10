const APIURL = new URL('http://localhost:3001/');

async function getAllApplications() {
  const response = await fetch(new URL('applications', APIURL));
  const applicationJson = await response.json();
  if (response.ok) {
    return applicationJson;
  } else {
    throw applicationJson;
  }
}

async function getAppointmentsDate(applicationId) {
  const response = await fetch(new URL(`appointments-date/${applicationId}`, APIURL));
  const appointmentJson = await response.json();
  if (response.ok) {
    return appointmentJson;
  } else {
    throw appointmentJson;
  }
}

async function getNotifications() {
  const response = await fetch(new URL('notifications', APIURL));
  const notificationsJson = await response.json();
  if (response.ok) {
    return notificationsJson.map(el => {return {...el, isClickable: el.read}});
  } else {
    throw notificationsJson;
  }
}

async function getChats() {
  const response = await fetch(new URL('chats', APIURL));
  const chatsJson = await response.json();
  if (response.ok) {
    return chatsJson;
  } else {
    throw chatsJson;
  }
}

async function applyApplication(applicationId) {
  const response = await fetch(new URL('applyApplication', APIURL), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: applicationId
    }),
  })
  const updateResult = await response.json();
  if (response.ok && updateResult.result === "ok") {
    return updateResult;
  } else {
    throw updateResult;
  }
}

async function applicationDone(applicationId, feedbacks) {
  const response = await fetch(new URL('applicationDone', APIURL), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: applicationId,
      feedbacks: feedbacks
    }),
  })
  const updateResult = await response.json();
  if (response.ok && updateResult.result === "ok") {
    return updateResult;
  } else {
    throw updateResult;
  }
}

async function createFeedback(applicationId, feedbacks) {
  const response = await fetch(new URL('createFeedback', APIURL), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: applicationId,
      feedbacks: feedbacks
    }),
  })
  const updateResult = await response.json();
  if (response.ok && updateResult.result === "ok") {
    return updateResult;
  } else {
    throw updateResult;
  }
}

async function inProgressApplication(applicationId, startDateTime, endDateTime) {
  const response = await fetch(new URL('inProgressApplication', APIURL), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: applicationId,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
    }),
  })
  const updateResult = await response.json();
  if (response.ok && updateResult.result === "ok") {
    return updateResult;
  } else {
    throw updateResult;
  }
}


async function deleteApplication(id_application) {
  const response = await fetch(new URL('deleteApplication', APIURL), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id_application
    }),
  })
  const updateResult = await response.json();
  if (response.ok && updateResult.result === "ok") {
    return updateResult;
  } else {
    throw updateResult;
  }
}

async function changeStateApplication(applicationId, state) {
  const response = await fetch(new URL('changeStateApplication', APIURL), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: applicationId,
      state: state,
    }),
  })
  const updateResult = await response.json();
  if (response.ok && updateResult.result === "ok") {
    return updateResult;
  } else {
    throw updateResult;
  }
}

async function bookInterview(applicationId, dateTime) {
  const response = await fetch(new URL('bookInterview', APIURL), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: applicationId,
      dateTime: dateTime,
    }),
  })
  const updateResult = await response.json();
  if (response.ok && updateResult.result === "ok") {
    return updateResult;
  } else {
    throw updateResult;
  }
}

async function markNotificationRead(id) {
  const response = await fetch(new URL('markNotificationRead', APIURL), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
    }),
  })
  const updateResult = await response.json();
  if (response.ok && updateResult.result === "ok") {
    return updateResult;
  } else {
    throw updateResult;
  }
}

async function updateChat(id, answer) {
  const response = await fetch(new URL('chat', APIURL), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id,
      answer: answer,
    }),
  })
  const updateResult = await response.json();
  if (response.ok && updateResult.result === "ok") {
    return updateResult;
  } else {
    throw updateResult;
  }
}

async function deleteNotification(id_application, state_aplication) {
  return new Promise((resolve, reject) => {
    fetch(new URL(`notification/${id_application}/${state_aplication}`, APIURL), {
      method: 'DELETE',
      credentials: 'include',
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        reject(null);
      }
    }).catch(() => { reject(null) });
  });
}

async function createNotification(id_application, state_aplication, url, text) {
  let response = await fetch(new URL('notification', APIURL), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id_application: id_application,
      state_aplication: state_aplication,
      url: url,
      text: text,
    }),
  });
  if (response.ok) {
    const notification = await response.json();
    return notification;
  } else {
    const errDetail = await response.json();
    throw errDetail.message;
  }
}

async function createChat(message, title) {
  let response = await fetch(new URL('chat', APIURL), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      question: message
    }),
  });
  if (response.ok) {
    const notification = await response.json();
    return notification;
  } else {
    const errDetail = await response.json();
    throw errDetail.message;
  }
}

async function insertInterviewAppointments(applicationId, dates = []) {
  let response = await fetch(new URL('appointments-date', APIURL), {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      application_id: applicationId,
      dates: dates,
    }),
  });
  if (response.ok) {
    const notification = await response.json();
    return notification;
  } else {
    const errDetail = await response.json();
    throw errDetail.message;
  }
}

export {
  getAllApplications,
  applyApplication,
  getNotifications,
  deleteNotification,
  createNotification,
  changeStateApplication,
  markNotificationRead,
  insertInterviewAppointments,
  getAppointmentsDate,
  deleteApplication,
  bookInterview,
  inProgressApplication,
  getChats,
  createChat,
  updateChat,
  applicationDone,
  createFeedback,
};