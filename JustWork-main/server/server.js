'use strict';

const express = require('express');
const morgan = require('morgan');
const { check, validationResult, body } = require('express-validator');
const dao = require('./dao');
const cors = require('cors');
const session = require('express-session');

// init express
const app = new express();
const port = 3001;

// set-up the middlewares
app.use(morgan('dev'));
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

// set up the session
app.use(session({
  secret: 'codice segreto per esame piano studi',
  resave: false,
  saveUninitialized: false
}));

//API's
app.get("/applications", (req, res) => {
  dao.listApplications()
    .then(applications => res.json(applications))
    .catch(() => res.status(500).end());
})

app.get("/notifications", (req, res) => {
  dao.listNotifications()
    .then(notifications => res.json(notifications))
    .catch(() => res.status(500).end());
})

app.get("/chats", (req, res) => {
  dao.listChats()
    .then(chats => res.json(chats))
    .catch(() => res.status(500).end());
})

app.put('/applyApplication', async (req, res) => {

  try {
    await dao.applyApplication(req.body.id);
    res.status(200).json({
      result: "ok"
    });
  } catch (err) {
    res.status(500).json({ result: "ko" });
  }

});

app.put('/applicationDone', async (req, res) => {

  try {
    await dao.applicationDone(req.body.id, req.body.feedbacks);
    res.status(200).json({
      result: "ok"
    });
  } catch (err) {
    res.status(500).json({ result: "ko" });
  }

});

app.put('/createFeedback', async (req, res) => {

  try {
    await dao.createFeedback(req.body.id, req.body.feedbacks);
    res.status(200).json({
      result: "ok"
    });
  } catch (err) {
    res.status(500).json({ result: "ko" });
  }

});

app.put('/inProgressApplication', async (req, res) => {

  try {
    await dao.inProgressApplication(req.body.id, req.body.startDateTime, req.body.endDateTime);
    res.status(200).json({
      result: "ok"
    });
  } catch (err) {
    res.status(500).json({ result: "ko" });
  }

});

app.put('/changeStateApplication', async (req, res) => {

  try {
    await dao.changeStateApplication(req.body.id, req.body.state);
    res.status(200).json({
      result: "ok"
    });
  } catch (err) {
    res.status(500).json({ result: "ko" });
  }

});

app.put('/deleteApplication', async (req, res) => {

  try {
    await dao.deleteApplication(req.body.id);
    res.status(200).json({
      result: "ok"
    });
  } catch (err) {
    res.status(500).json({ result: "ko" });
  }

});

app.put('/bookInterview', async (req, res) => {

  try {
    await dao.bookInterview(req.body.id, req.body.dateTime);
    res.status(200).json({
      result: "ok"
    });
  } catch (err) {
    res.status(500).json({ result: "ko" });
  }

});


app.put('/markNotificationRead', async (req, res) => {

  try {
    await dao.markNotificationRead(req.body.id);
    res.status(200).json({
      result: "ok"
    });
  } catch (err) {
    res.status(500).json({ result: "ko" });
  }

});

app.put('/chat', async (req, res) => {

  try {
    await dao.insertAnsewer(req.body.id, req.body.answer);
    res.status(200).json({
      result: "ok"
    });
  } catch (err) {
    res.status(500).json({ result: "ko" });
  }

});

app.delete("/notification/:id_application/:state_aplication", async (req, res) => {
  try {
    await dao.deleteNotification(req.params.id_application, req.params.state_aplication);
    res.status(204).end();
  } catch (err) {
    res.status(503).end();
  }
})

app.post('/notification', async (req, res) => {

  try {
    const notification = await dao.createNotification(req.body.id_application, req.body.state_aplication, req.body.url, req.body.text);
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ result: "ko", error: `Internal Server Error` });
  }
});

app.post('/chat', async (req, res) => {

  try {
    const chat = await dao.createChat(req.body.title, req.body.question);
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json({ result: "ko", error: `Internal Server Error` });
  }
});

app.post('/appointments-date', async (req, res) => {

  try {
    const datesFormatted = [];
    req.body.dates?.forEach(date => {
      const dateFounded = datesFormatted?.filter(el =>
        el.application_id === req.body.application_id &&
        el.day === date?.date) || [];
      if (!dateFounded || dateFounded?.length === 0) {
        date?.times?.forEach(time => {
          datesFormatted.push({
            application_id: req.body.application_id,
            day: date?.date,
            slot: time,
          })
        })
      } else {
        date?.times?.forEach(time => {
          if (dateFounded?.filter(dateTime => dateTime?.slot === time)?.length === 0) {
            datesFormatted.push({
              application_id: req.body.application_id,
              day: date?.date,
              slot: time,
            })
          }
        })
      }
    })
    await dao.createAppointmentsDate(datesFormatted);
    res.status(201).json({
      result: "ok",
    });
  } catch (err) {
    res.status(500).json({ result: "ko", error: `Internal Server Error` });
  }
});

app.get('/appointments-date/:application_id', (req, res) => {
  dao.listAppointmentsDate(req.params.application_id)
    .then(appointmentsDate => res.json(appointmentsDate))
    .catch(() => res.status(500).end());
});

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});