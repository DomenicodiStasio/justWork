// Feedbacks.js
import React, {useContext, useMemo} from 'react';
import { BrowserRouter as Router, useNavigate, useParams } from 'react-router-dom';
import FeedbackPDF from '../components/Feedbacks/FeedbackPDF';
import '../components/Feedbacks/FeedbackPDF.css';
import Button from '../components/Button/Button';
import GoBack from '../components/GoBack/GoBack';
import Loader from "../components/Loader/Loader";
import { MainCtx } from "../App";


const Feedbacks = () => {
  const {
    applicationLoading,
    justWorkElementsBooked
  } = useContext(MainCtx);

  const navigate = useNavigate(); 
  let { applicationIndex } = useParams();

  const handleAskForMoreFeedbacks = () => {
    navigate(`/ask-feedback/${applicationIndex}`);
  };
  
  const feedbacks = useMemo(() => {
    if (applicationIndex) {
      return JSON.parse(justWorkElementsBooked?.filter(el => el.id === parseInt(applicationIndex))?.[0]?.feedbacks || JSON.stringify("")) || []
    }
    return []
  }, [JSON.stringify(justWorkElementsBooked), applicationIndex])

  return (
    <>
      <GoBack/>
      <h1 className="page-title">Your Feedbacks</h1>
      {
        applicationLoading ? (
          <Loader/>
        ) : (
          justWorkElementsBooked && feedbacks.length > 0 ? (
            <>
              <FeedbackPDF feedbacks={feedbacks} style={{ marginTop: '30px' }} />
              <Button label={"Ask for More Feedbacks"} onClick={handleAskForMoreFeedbacks}> </Button>
            </>
          ) : (
            <span>You don't have any feedback from companies!</span>
          )
        )
      }
    </>
  );
};

export default Feedbacks;

  
