import './App.css';
import React, { createContext, useEffect, useMemo, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import Homepage from './pages/Homepage';
import NavigationBar from './components/NavigationBar/NavigationBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import YourJustWorkListPage from './pages/YourJustWorkListPage';
import NotificationPage from './pages/NotificationPage';
import UserPage from './pages/UserPage';
import ApplyPage from './pages/ApplyPage';
import MessageForm from './pages/SendMessagePage';
import Feedbacks from './pages/Feedbacks';
import BookAppointment from './pages/BookAppointment';
import YourJustWorkDetailPage from './pages/YourJustWorkDetailPage';
import MostAskedQuestion from './pages/MostAskedQuestions';
import ChatsList from './pages/ChatsList';
import ChatPage from './pages/ChatPage';
import VideocallPage from './pages/VideocallPage';
import { createNotification, getAllApplications, getNotifications, changeStateApplication, markNotificationRead, insertInterviewAppointments, deleteApplication, bookInterview, inProgressApplication, getChats, createChat, updateChat, applicationDone, createFeedback } from './API';
import { DONE, IN_PROGRESS, REJECTED, WAITING_INTERVIEW, WAITING_RESULT } from './constants';
import dayjs from 'dayjs';


export const MainCtx = createContext({});

function App() {
  return (
    <Router>
      <App2 />
    </Router>
  );
}

function App2() {

  const [applicationsList, setApplicationsList] = useState([]);
  const [applicationLoading, setApplicationLoading] = useState(true);
  const [notificationsLoading, setNotificationsLoading] = useState(true);
  const [notificationsList, setNotificationsList] = useState([]);
  const [chatsList, setChatsList] = useState([]);
  const [chatsLoading, setChatsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const idRejected = 1;
  const idRejectedAfterInterview = 2;
  const startDateTimeAdd = 1;
  const endDateTimeAdd = 11;

  const {
    justWorkElements,
    justWorkElementsBooked
  } = useMemo(() => {
    let justWorkElements = [];
    let justWorkElementsBooked = [];
    if (applicationsList) {
      justWorkElements = applicationsList.filter(el => !el.state)
      justWorkElementsBooked = applicationsList.filter(el => !!el.state)
    }

    return {
      justWorkElements,
      justWorkElementsBooked
    }
  }, [JSON.stringify(applicationsList)])

  const clearApplication = (id) => {
    deleteApplication(id)
    setNotificationsList(prevState => prevState.filter(prevNotification => prevNotification.id_application !== parseInt(id)));
    setApplicationsList(prevState => prevState.map(
      prevApplication => {
        if (prevApplication.id === parseInt(id)) {
          return { ...prevApplication, state: "", interviewDateTime: "", applicationDate: "" }
        }
        return prevApplication;
      }
    ))
  }

  const notifyInterviewCall = (id, applicationTitle) => {
    const notification = {
      id_application: id,
      state_application: id === idRejected ? REJECTED : WAITING_INTERVIEW,
      url: id === idRejected ? `/detail/${id}` : `/book/${id}`,
      text: id === idRejected ? `Sorry! Your application for ${applicationTitle} has been rejected.` :
        `You've been accepted for ${applicationTitle}! Click here to book the interview.`,
      isClickable: true,
    }
    setTimeout(() => {
      createNotification(
        notification.id_application,
        notification.state_application,
        notification.url,
        notification.text
      ).then(response => setNotificationsList(prevstate => [...prevstate, {id: response, ...notification}]));
      if (id === idRejected) {
        setApplicationsList(prevState => prevState.map(el => {
          if (el.id === id) {
            return {
              ...el,
              state: REJECTED,
            }
          }
          return el;
        }))
        changeStateApplication(id, REJECTED);
      } else {
        setApplicationsList(prevState => prevState.map(el => {
          if (el.id === id) {
            return {
              ...el,
              state: WAITING_INTERVIEW,
            }
          }
          return el;
        }))
        changeStateApplication(id, WAITING_INTERVIEW);
        const dates = [
          {
            date: dayjs().format("YYYY/MM/DD"),
            times: [
              dayjs().add(1, "hour").format("HH:mm"),
              dayjs().add(2, "hour").format("HH:mm"),
              dayjs().add(3, "hour").format("HH:mm"),
            ]
          }, {
            date: dayjs().add(1, "day").format("YYYY/MM/DD"),
            times: [
              "09:00",
              "10:00",
              "17:00"
            ]
          }, {
            date: dayjs().add(3, "day").format("YYYY/MM/DD"),
            times: [
              "09:00",
              "10:00",
            ]
          }
        ]

        insertInterviewAppointments(id, dates);

      }
    }
      , 2000)
  }

  const handleWaitingResults = (id) => {
    changeStateApplication(id, WAITING_RESULT);
    setApplicationsList(prevState => prevState.map(
      prevApplication => {
        if (prevApplication.id === parseInt(id)) {
          return { ...prevApplication, state: WAITING_RESULT }
        }
        return prevApplication;
      }
    ))
  }

  const handleMarkNotificationRead = (id) => {
    markNotificationRead(id);
    setNotificationsList(prevState => prevState.map(notification => {
      if (notification.id === id) {
        return {
          ...notification,
          isClickable: false,
        }
      }
      return notification;
    }))
  }

  const handleBookAppointment = (id, date, time) => {
    bookInterview(id, `${date} ${time}`);
    setNotificationsList(prevState => prevState.map(prevNotification => {
      if (prevNotification.id_application === parseInt(id) && prevNotification.state_application === WAITING_INTERVIEW) {
        return { ...prevNotification, isClickable: 0 }
      }
      return prevNotification
    }));
    setApplicationsList(prevState => prevState.map(prevApplication => {
      if (prevApplication.id === parseInt(id)) {
        return { ...prevApplication, interviewDateTime: `${date} ${time}` }
      }
      return prevApplication;
    }))
  }

  const handleNewFeedback = (id) => {
    const feedbacks = JSON.parse(justWorkElementsBooked.find((application) => application.id === parseInt(id))?.feedbacks || JSON.stringify([])) 
    if (feedbacks?.length === 1) {
      feedbacks.push({
        text: "Working with our team member has been a pleasure due to their exceptional collaboration skills. From day one, they seamlessly integrated into our company culture, quickly grasping the core values and goals. Their dedication to their role is evident in their proactive approach to challenges, and their ability to find innovative solutions has greatly contributed to the team's success.\n\nThis team member possesses the ability to foster a positive and collaborative work environment. They effectively communicate ideas and translate complex concepts into user-friendly designs. Their professional demeanor and commitment to meeting deadlines have not only met but exceeded our expectations. Their meticulous attention to detail ensures the quality of their work, and their collaborative spirit has fostered a positive and productive team environment. We truly appreciate their unwavering dedication, and their contributions have played a significant role in the success of our projects and the overall cohesion of our team.",
        author: "John Smith",
        date: dayjs().format("YYYY/MM/DD"),
      })
    } else if (feedbacks?.length === 2) {
      feedbacks.push({
        text: "Working with our team member was a truly positive experience; their dedication, professionalism, and collaborative spirit significantly contributed to the success of our project. Their effective communication and innovative approach made them a valuable asset to the team",
        author: "John Doe",
        date: dayjs().format("YYYY/MM/DD"),
      })
    } else if (feedbacks?.length === 3) {
      feedbacks.push({
        text: "Great job on the project! Your attention to detail and creativity are truly commendable.",
        author: "Sam",
        date: dayjs().format("YYYY/MM/DD"),
      })
    } else {
      feedbacks.push({
        text: "Alex not only excels in his role but also provides valuable insights and constructive feedback. His willingness to share ideas and suggestions has proven instrumental in refining our projects. Alex's commitment to continuous improvement and his proactive approach to offering suggestions make him a valuable asset to our  team.",
        author: "Bill Odell",
        date: dayjs().format("YYYY/MM/DD"),
      })
    }
        const notification = {
          url: `/feedback/${id}`,
          text: "You received a new company feedback!",
          isClickable: true,
        }
        setTimeout(() => {
          createFeedback(parseInt(id), JSON.stringify(feedbacks));

          setApplicationsList(prevState => prevState.map(el => {
            if (el.id === parseInt(id)) {
              return {
                ...el,
                feedbacks: JSON.stringify(feedbacks),
              }
            }
            return el;
          }))

          createNotification(
            notification.id_application,
            notification.state_application,
            notification.url,
            notification.text
          ).then(response => setNotificationsList(prevstate => [...prevstate, {id: response, ...notification}]));
        }, 3000)
  }

  const reportIssue = (message) => {
    const lastIndex = [...chatsList]?.sort((chat1, chat2) => chat1.id - chat2.id)?.pop();
    createChat(message, `Chat ${lastIndex?.id + 1 || 1}`)
      .then(response => {
        setChatsList(prevstate => {
          return [...prevstate, response]});
        const notification = {
          url: `/chats/${response.id}`,
          text: "The company sent you a message!",
          isClickable: true,
        }
        setTimeout(() => {
          updateChat(response?.id, "Hi, we will update you very soon!");
          setChatsList(prevstate => prevstate.map(prevChat => {
            if (prevChat.id === response.id) {
              return {
                ...prevChat,
                answer: "Hi, we will update you very soon!",
              }
            }
            return prevChat;
          }))
          createNotification(
            notification.id_application,
            notification.state_application,
            notification.url,
            notification.text
          ).then(response => setNotificationsList(prevstate => [...prevstate, {id: response, ...notification}]));
        }, 3000)
      })
  }

  const handleStateInProgress = (id) => {
      const applicationRejectedAfterInterview = applicationsList?.find(application => application.id === idRejectedAfterInterview)
      const applicationInProgressAfterInterview = applicationsList?.find(
        application => application.id !== idRejectedAfterInterview && application.id !== idRejected
      )
      if (applicationRejectedAfterInterview && applicationRejectedAfterInterview?.state === WAITING_RESULT && (applicationRejectedAfterInterview?.id == parseInt(id) || !id)) {
        const notification = {
          id_application: applicationRejectedAfterInterview.id,
          state_application: REJECTED,
          url: `/detail/${applicationRejectedAfterInterview?.id}`,
          text: `Sorry! Your application for ${applicationRejectedAfterInterview?.title} has been rejected.`,
          isClickable: true,
        }
        setTimeout(() => {
          createNotification(
            notification.id_application,
            notification.state_application,
            notification.url,
            notification.text
          ).then(response => setNotificationsList(prevstate => [...prevstate, {id: response, ...notification}]));
          setApplicationsList(prevState => prevState.map(el => {
            if (el.id === applicationRejectedAfterInterview?.id) {
              return {
                ...el,
                state: REJECTED,
              }
            }
            return el;
          }))
          changeStateApplication(applicationRejectedAfterInterview?.id, REJECTED);
        }
          , 2000)
      }
      if (applicationInProgressAfterInterview && applicationInProgressAfterInterview?.state === WAITING_RESULT && (applicationInProgressAfterInterview?.id === parseInt(id) || !id)) {
        const notification = {
          id_application: applicationInProgressAfterInterview.id,
          state_application: IN_PROGRESS,
          url: `/detail/${applicationInProgressAfterInterview?.id}`,
          text: `You've been accepted for ${applicationInProgressAfterInterview?.title}! Start your job now.`,
          isClickable: true,
        }
        setTimeout(() => {
          createNotification(
            notification.id_application,
            notification.state_application,
            notification.url,
            notification.text
          ).then(response => setNotificationsList(prevstate => [...prevstate, {id: response, ...notification}]));
          const startDateTime = `${dayjs().add(startDateTimeAdd, "day").format("YYYY/MM/DD")} 09:00`;
          const endDateTime = `${dayjs().add(endDateTimeAdd, "day").format("YYYY/MM/DD")} 18:00`;
          setApplicationsList(prevState => prevState.map(el => {
            if (el.id === applicationInProgressAfterInterview?.id) {
              return {
                ...el,
                state: IN_PROGRESS,
                startDateTime: startDateTime,
                endDateTime: endDateTime
              }
            }
            return el;
          }))
          inProgressApplication(applicationInProgressAfterInterview?.id, startDateTime, endDateTime);
        }
          , 2000)
    }

    if (applicationInProgressAfterInterview && applicationInProgressAfterInterview?.state === IN_PROGRESS && (applicationInProgressAfterInterview?.id === parseInt(id) || !id)) {
      const notification = {
        id_application: applicationInProgressAfterInterview.id,
        state_application: DONE,
        url: `/detail/${applicationInProgressAfterInterview?.id}`,
        text: `You've completed the job ${applicationInProgressAfterInterview?.title}! You should now see company feedback.`,
        isClickable: true,
      }
      setTimeout(() => {
        createNotification(
          notification.id_application,
          notification.state_application,
          notification.url,
          notification.text
        ).then(response => setNotificationsList(prevstate => [...prevstate, {id: response, ...notification}]));
        const startDateTime = `${dayjs().add(startDateTimeAdd, "day").format("YYYY/MM/DD")} 09:00`;
        const endDateTime = `${dayjs().add(endDateTimeAdd, "day").format("YYYY/MM/DD")} 18:00`;

        const feedbacks = 
        JSON.stringify([{
          text: "One of our standout team members possesses exceptional adaptability to our workflow. They quickly grasp the company's values and goals, showcasing dedication to their role. Their professional approach and commitment to meeting deadlines have not only met but exceeded our expectations. We appreciate their unwavering dedication to our team.",
          author: "Anonymous",
          date: dayjs().format("YYYY/MM/DD"),
        }])



        setApplicationsList(prevState => prevState.map(el => {
          if (el.id === applicationInProgressAfterInterview?.id) {
            return {
              ...el,
              state: DONE,
              feedbacks: feedbacks
            }
          }
          return el;
        }))
        applicationDone(applicationInProgressAfterInterview?.id, feedbacks);
      }
        , 2000)
  }
  }

  useEffect(() => {
    getAllApplications()
      .then(el => setApplicationsList(el))
      .finally(() => setApplicationLoading(false));
  }, []);

  useEffect(() => {
    getNotifications()
      .then(el => setNotificationsList(el))
      .finally(() => setNotificationsLoading(false));
  }, []);

  useEffect(() => {
    getChats()
      .then(el => setChatsList(el))
      .finally(() => setChatsLoading(false));
  }, []);

  useEffect(() => {
    // TO DO: change the logic when the user close the call
    if (applicationsList.length > 0 && isFirstLoad) {
      setIsFirstLoad(false)
      handleStateInProgress()
    }
  }, [JSON.stringify(applicationsList)])

  return (
    <div className='app-container'>
      <MainCtx.Provider
        value={{
          applicationLoading,
          justWorkElementsBooked,
          justWorkElements,
          setApplicationsList,
          notificationsLoading,
          notificationsList,
          setNotificationsList,
          notifyInterviewCall,
          handleMarkNotificationRead,
          clearApplication,
          handleBookAppointment,
          handleWaitingResults,
          handleStateInProgress,
          chatsList,
          chatsLoading,
        }}>
        <main className='main-container'>
          <Routes>
            {/* to insert route */}
            <Route
              path="/"
              element={
                <Homepage
                />
              }
            />
            <Route
              path="/your-just-work"
              element={
                <YourJustWorkListPage
                />
              }
            />
            <Route
              path="/notification"
              element={
                <NotificationPage
                />
              }
            />
            <Route
              path="/account"
              element={
                <UserPage
                />
              }
            />
            <Route
              path="/apply/:applicationIndex"
              element={
                <ApplyPage
                />
              }
            />
            <Route
              path="/ask-more-availability"
              element={
                <MessageForm
                  title={"Tell the company when you are available"}
                />
              }
            />
            <Route
              path="/report-issue/:applicationIndex"
              element={
                <MessageForm
                  title={"Tell the company what's the issue"}
                  goDetailPage
                  reportIssue={reportIssue}
                />
              }
            />
            <Route
              path="/ask-feedback/:applicationIndex"
              element={
                <MessageForm
                  title={"Ask the company for more feedback"}
                  goDetailPage
                  reportIssue={handleNewFeedback}
                  isFeedback
                />
              }
            />
            <Route
              path="/feedback/:applicationIndex"
              element={
                <Feedbacks
                />
              }
            />
            <Route
              path="/detail/:applicationIndex"
              element={
                <YourJustWorkDetailPage />
              }
            />
            <Route
              path="/book/:applicationIndex"
              element={
                <BookAppointment
                />
              }
            />
            <Route
              path="/videocall/:applicationIndex/:isAudioOnParam/:isVideoOnParam"
              element={
                <VideocallPage />
              }
            />
            <Route
              path="/a&q"
              element={
                <MostAskedQuestion />
              }
            />
            <Route
              path="/chats"
              element={
                <ChatsList />
              }
            />
            <Route
              path="/chats/:chatIndex"
              element={
                <ChatPage />
              }
            />
          </Routes>
        </main>
        <NavigationBar isNotificationReadable={notificationsList?.filter(notification => notification.isClickable)?.length > 0} />
      </MainCtx.Provider>
    </div>
  );
}

export default App;
