'use strict';

const sqlite = require('sqlite3');
const dayjs = require('dayjs');

const DONE = "DONE";
const IN_PROGRESS = "IN_PROGRESS";
const WAITING_RESULT = "WAITING_RESULT";
const WAITING_INTERVIEW = "WAITING_INTERVIEW";
const EVALUATING_APPLICATION = "EVALUATING_APPLICATION";
const REJECTED = "REJECTED";

const db = new sqlite.Database('justwork.db', (err) => {
  if (err) throw err;
});

exports.listApplications = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM applications';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
};

exports.listAppointmentsDate = (application_id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM application_date WHERE application_id = ?';
    db.all(sql, [application_id], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
};

exports.listNotifications = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM notifications';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
};

exports.listChats = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM chats';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
};

exports.applyApplication = (applicationId) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE applications SET state = "${EVALUATING_APPLICATION}", applicationDate = "${dayjs().format("YYYY/MM/DD")}" where id = ? `;
    db.run(sql, [applicationId], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(null);
    });
  });
};

exports.applicationDone = (applicationId, feedbacks) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE applications SET state = "${DONE}", feedbacks = ? where id = ? `;
    db.run(sql, [feedbacks, applicationId], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(null);
    });
  });
};

exports.createFeedback = (applicationId, feedbacks) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE applications SET feedbacks = ? where id = ? `;
    db.run(sql, [feedbacks, applicationId], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(null);
    });
  });
};

exports.changeStateApplication = (applicationId, state) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE applications SET state = ? where id = ? `;
    db.run(sql, [state, applicationId], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(null);
    });
  });
};

exports.markNotificationRead = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE notifications SET read = 0 where id = ? `;
    db.run(sql, [id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(null);
    });
  });
};

exports.inProgressApplication = (applicationId, startDateTime, endDateTime) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE applications SET state = "${IN_PROGRESS}", startDateTime = ?, endDateTime = ? where id = ? `;
    db.run(sql, [startDateTime, endDateTime, applicationId], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(null);
    });
  });
};

exports.insertAnsewer = (id, answer) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE chats SET answer = ? where id = ? `;
    db.run(sql, [answer, id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(null);
    });
  });
};

exports.bookInterview = (applicationId, dateTime) => {
  const book = new Promise((resolve, reject) => {
    const sql = `UPDATE applications SET interviewDateTime = ? where id = ? `;
    db.run(sql, [dateTime, applicationId], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(null);
    });
  });
  const markNotificationRead = new Promise((resolve, reject) => {
    const sql = `UPDATE notifications SET read = 0 where id_application = ? AND state_application = "${WAITING_INTERVIEW}"`;
    db.run(sql, [applicationId], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(null);
    });
  });
  return Promise.all([book, markNotificationRead]).then(() => (
    Promise.resolve(null)
  )).catch((err) => Promise.reject(err))
};

exports.deleteApplication = (applicationId) => {
  const updateApplication = new Promise((resolve, reject) => {
    const sql = `UPDATE applications SET state = "", applicationDate="", interviewDateTime="" where id = ? `;
    db.run(sql, [applicationId], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(null);
    });
  });
  const deleteApplicationDate = new Promise((resolve, reject) => {
    const sql = `DELETE FROM application_date WHERE application_id = ? `;
    db.run(sql, [applicationId], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(null);
    });
  });
  const deleteNotificationse = new Promise((resolve, reject) => {
    const sql = `DELETE FROM notifications WHERE id_application = ? `;
    db.run(sql, [applicationId], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(null);
    });
  });
  return Promise.all([updateApplication, deleteApplicationDate, deleteNotificationse]).then(() => (
    Promise.resolve(null)
  )).catch((err) => Promise.reject(err))
};


exports.deleteNotification = (applicationId, stateApplication) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM notifications WHERE id_application = ? AND state_application = ?';
    db.run(sql, [applicationId, stateApplication], (err) => {
      if (err) {
        reject(err);
        return;
      } else
        resolve(null);
    });
  });
}

exports.createNotification = (id_application, state_application, url, text) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT into notifications(id_application, state_application, text, url, read) VALUES (?,?,?,?,1)';
    db.run(sql, [id_application, state_application, text, url], function (err) {
      if (err) {
        reject(err);
        return;
      } else
        resolve(this.lastID);
    });
  });
}

exports.createChat = (title, question) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT into chats(id, title, question) VALUES (NULL, ?,?)';
    db.run(sql, [title, question], function (err) {
      if (err) {
        reject(err);
        return;
      } else
        resolve({id: this.lastID, title: title, question: question, answer: null});
    });
  });
}

exports.createAppointmentsDate = (dates) => {
  const datesToWait = dates?.map((date) => {
    return new Promise(async (resolve, reject) => {
      const sql = 'INSERT INTO application_date(application_id, day, slot) VALUES (?, ?, ?);';
      db.run(sql, [date.application_id, date.day, date.slot], function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(null);
      });
    });
  });
  return Promise.all(datesToWait).then(() => (
    Promise.resolve(null)
  )).catch((err) => Promise.reject(err))
}