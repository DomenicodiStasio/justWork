import React, { useState, useRef, useContext, useEffect } from 'react';
import Webcam from 'react-webcam';
import { AiFillAudio, AiOutlineAudio, AiFillVideoCamera, AiOutlineVideoCamera, AiTwotonePhone } from 'react-icons/ai';
import ModalFeedback from "../components/ModalFeedback/ModalFeedback";
import { MainCtx } from "../App";
import { useNavigate, useParams } from "react-router-dom";

export default function VideocallPage(props) {

  let { applicationIndex, isAudioOnParam, isVideoOnParam } = useParams();
  const webcamRef = useRef(null);
  const [isAudioOn, setAudioOn] = useState(isAudioOnParam === "true");
  const [isVideoOn, setVideoOn] = useState(isVideoOnParam === "true");

  const navigate = useNavigate();

  const {
    handleWaitingResults,
    handleStateInProgress,
  } = useContext(MainCtx);

  const handleToggleAudio = () => {
    setAudioOn((prevAudio) => !prevAudio);
  };

  const handleToggleVideo = () => {
    setVideoOn((prevVideo) => !prevVideo);
  };

  const handleCloseCall = () => {
    handleStateInProgress(applicationIndex);
    navigate(`/detail/${applicationIndex}`);
  };

  const videoConstraints = {
    width: "100%",
    height: "100%",
    facingMode: 'user', // Usa la fotocamera frontale se disponibile
  };

  return (
    <>
    
    <div className='video-call-container'>
      <>
      <img
        src="https://media.istockphoto.com/id/1129638598/it/foto/uomo-daffari-in-giacca-e-cravatta-che-guarda-la-telecamera-fare-videoconferenza-conferenza.jpg?s=1024x1024&w=is&k=20&c=hGv5Gav2rUjOBvumXozT0HhKHq_iXKNw2aoczNwDNkc="
        alt="Interviewer"
        className='video-image company-user'
      />
      {isVideoOn==true ? <Webcam
        audio={isAudioOn}
        video={isVideoOn.toString()}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        className='video-image guest-user'
      /> : <div className='video-image-container'>
          <div className='user-placeholder'>
            <span className='user-placeholder-label'>You</span>
          </div>
        </div>}
      <div className='button-video-call-container'>
        <button className='mx-3' onClick={handleToggleAudio} style={{ background: 'transparent', borderRadius: '50%', border: 'none', cursor: 'pointer' }}>
          {isAudioOn==true ? <AiFillAudio size={30} color="white" /> : <AiOutlineAudio size={30} color="white" />}
        </button>
        <button className='mx-3' onClick={handleToggleVideo} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
          {isVideoOn==true ? <AiFillVideoCamera size={30} color="white" /> : <AiOutlineVideoCamera size={30} color="white" />}
        </button>
        <button className='mx-3' onClick={handleCloseCall} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
          <AiTwotonePhone size={30} color="red" />
        </button>
      </div>
      </>
    </div>
    
    </>
  )
}