import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from 'react-webcam';
import { AiFillAudio, AiOutlineAudio, AiFillVideoCamera, AiOutlineVideoCamera, AiTwotonePhone } from 'react-icons/ai';

import noScroll from "no-scroll";
import Button from "../Button/Button"

export default function ModalFeedback(props) {
  const webcamRef = useRef(null);
  const [isAudioOn, setAudioOn] = useState(false);
  const [isVideoOn, setVideoOn] = useState(false);

  const handleToggleAudio = () => {
    setAudioOn((prevAudio) => !prevAudio);
  };

  const handleToggleVideo = () => {
    setVideoOn((prevVideo) => !prevVideo);
  };

  const navigate = useNavigate();
  const {
    closeModalHandler = () => { },
    buttonLabel,
    title,
    subtitle,
    redirectTo, // new prop for redirection
    twobuttons = false,
    buttonLabelClose,
    deleteHandler = () => {},
    redOnLeft = false,
    callOptions = false
  } = props;

  const videoConstraints = {
    width: "100%",
    height: "100%",
    facingMode: 'user', // Usa la fotocamera frontale se disponibile
  };

  const history = useNavigate();

  useEffect(() => {
    noScroll.on();

    return () => noScroll.off();
  }, [])

  const handleCloseModal = () => {
    if(callOptions){
      if (redirectTo) {
        // Redirect the user when closing the modal
        navigate(redirectTo+`/${isAudioOn}/${isVideoOn}`);
      }
      // Close the modal
      closeModalHandler();
    }else{
      if (redirectTo) {
        // Redirect the user when closing the modal
        navigate(redirectTo);
      }
      // Close the modal
      closeModalHandler();
    }
    
  };

  return (
    /*   <div className="modal-overlay">
        <div className="custom-modal">
          <span>{title}</span>
          {subtitle && <p>{subtitle}</p>}
          <button type="button" onClick={() => closeModalHandler()}>{buttonLabel}</button>
        </div>
      </div> */

    <div className="modal-overlay">
      <div className="custom-modal">
        <span className="modal-title">{title}</span>
        {subtitle && <p>{subtitle}</p>}
        {callOptions && (
        <div className="video-preview-container">
        {isVideoOn ? <Webcam
        audio={isAudioOn}
        video={isVideoOn.toString()}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className='video-image-call'
      /> : <div className='video-image-container-call'>
          <div className='user-placeholder'>
            <span className='user-placeholder-label'>You</span>
          </div>
        </div>}
      <div className='button-video-call-container-call'>
        <button className='mx-3' onClick={handleToggleAudio} style={{ background: 'transparent', borderRadius: '50%', border: 'none', cursor: 'pointer' }}>
          {isAudioOn ? <AiFillAudio size={30} color="black" /> : <AiOutlineAudio size={30} color="black" />}
        </button>
        <button className='mx-3' onClick={handleToggleVideo} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
          {isVideoOn ? <AiFillVideoCamera size={30} color="black" /> : <AiOutlineVideoCamera size={30} color="black" />}
        </button>
      </div>
      </div>
        )
      }

        <div className={twobuttons?"two-buttons-container":""}>
          {twobuttons && <Button className={twobuttons && redOnLeft?"delete-button-application":""} label={buttonLabelClose} onClick={deleteHandler} />}
          <Button className={twobuttons && !redOnLeft?"delete-button-application":""} label={buttonLabel} onClick={handleCloseModal} />
        </div>

      </div>
    </div>
  )
}