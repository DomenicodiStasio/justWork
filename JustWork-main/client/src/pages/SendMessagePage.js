import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ON_SITE_LABEL, REMOTE_LABEL, justWorkElements } from "../constants";
import GoBack from "../components/GoBack/GoBack";
import JobHeaderInfo from "../components/JobInfo/JobHeaderInfo";
import ModalFeedback from "../components/ModalFeedback/ModalFeedback";
import { useNavigate } from "react-router-dom";



const MessageForm = (props) => {
  const {
    title,
    goDetailPage = false,
    reportIssue = () => {},
    isFeedback = false
  } = props;
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  let { applicationIndex } = useParams();

  const handleMessageSent = (e) => {
    e.preventDefault();

    // Verifica se il messaggio è vuoto o contiene solo spazi bianchi
    if (message.trim() === '') {
      console.log('Il messaggio non può essere vuoto.');
      setShowError(true);
      return; // Termina la funzione se il messaggio è vuoto
    }

    setShowConfirmationModal(true);
  };

  const handleSend = () => {
    setShowConfirmationModal(false);
    setShowModal(true);
    // aggiungere qui la logica per l'invio del messaggio al server o ad altre azioni.
    console.log('Messaggio inviato:', message);
    reportIssue(isFeedback ? applicationIndex : message)
  }


  const closeModal = () => {
    // Chiudi il modal e reimposta lo stato
    setShowModal(false);
    setMessage('');
  };

  const redirectTo = () => {
    if (goDetailPage) {
      return `/detail/${applicationIndex}`
    } else {
      return "/";
    }
  }

  const getCloseButton = () => {
    if (goDetailPage) {
      return "Go to the detail page";
    }

    return "Go to the homepage";
  }

  useEffect(() => {
    if (showError) {
      setShowError(false);
    }
  }, [message])

  return (
    <>
      <GoBack />
      <h1 className='page-title'>{title}</h1>
      <form className='send-message-form' onSubmit={handleMessageSent}>

        <textarea className="send-message-textarea"
          value={message}
          placeholder="Write here..."
          onChange={(e) => setMessage(e.target.value)}
        />

        {showError && (
          <span className='error-form'>The message should not be empty</span>
        )}

        <button className='send-message-button' type="submit">Send</button>
      </form>

      {showModal && (
        // <ModalFeedback closeModalHandler={closeModal} buttonLabel={"Close"} title={"Message sent correctly!"}/>
        <ModalFeedback
          closeModalHandler={closeModal}
          buttonLabel={getCloseButton()}
          title={"Message sent correctly!"}
          redirectTo={redirectTo()} // Specify the route you want to redirect to
        />
      )}

      {showConfirmationModal && (
        <ModalFeedback
          closeModalHandler={handleSend}
          deleteHandler={() => {setShowConfirmationModal(false)}}
          buttonLabel={"Send"}
          title={"Do you want to send the message?"}
          twobuttons
          buttonLabelClose={"Don't send"}
          redOnLeft
        />
      )}
    </>
  );
};
export default MessageForm;
