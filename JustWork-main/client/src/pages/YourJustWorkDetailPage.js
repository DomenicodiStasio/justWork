import React, { useContext, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DONE, IN_PROGRESS, ON_SITE_LABEL, REJECTED, REMOTE_LABEL, WAITING_INTERVIEW, WAITING_RESULT } from "../constants";
import GoBack from "../components/GoBack/GoBack";
import JobHeaderInfo from "../components/JobInfo/JobHeaderInfo";
import JobBodyInfo from "../components/JobInfo/JobBodyInfo";
import Button from "../components/Button/Button";
import dayjs from "dayjs";
import ProgressBar from "../components/PogressBar/ProgressBar";
import Loader from "../components/Loader/Loader";
import { MainCtx } from "../App";
import ModalFeedback from "../components/ModalFeedback/ModalFeedback";

export default function YourJustWorkDetailPage(props) {

  const {
    applicationLoading,
    justWorkElementsBooked,
    clearApplication,
    handleWaitingResults,
  } = useContext(MainCtx);

  const navigate = useNavigate();

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalDeleteConfirm, setOpenModalDeleteConfirm] = useState(false);
  const [openModalVideoCallInterview, setOpenModalVideoCallInterview] = useState(false);
  const [openModalVideoCallJob, setOpenModalVideoCallJob] = useState(false);

  let { applicationIndex } = useParams();
  const applicationInfo = useMemo(() => {
    if (applicationIndex) {
      return justWorkElementsBooked?.filter(el => el.id === parseInt(applicationIndex))?.[0] || {}
    }
    return {}
  }, [JSON.stringify(justWorkElementsBooked)])

  return (
    <>
      <GoBack />
      {
        applicationLoading ? (
          <Loader />
        ) : (
          applicationInfo && Object.keys(applicationInfo).length > 0 ? (
            <>
              <JobHeaderInfo
                title={applicationInfo.title}
                duration={applicationInfo.duration}
                place={applicationInfo.remote ? REMOTE_LABEL : ON_SITE_LABEL}
              />
              <ProgressBar state={applicationInfo.state} hasInterviewDateTime={!!applicationInfo.interviewDateTime} />
              <JobBodyInfo
                showButtonReadMore
                jobItem={applicationInfo}
              />
              {applicationInfo?.state === DONE && (
                <Button className={"button-in-details"} label={"See feedbacks"} onClick={() => navigate(`/feedback/${applicationInfo.id}`)} />
              )}

              {applicationInfo.state === WAITING_INTERVIEW && !applicationInfo.interviewDateTime && (
                <Button className={"button-in-details"} label={"Book the interview"} onClick={() => navigate(`/book/${applicationInfo.id}`)} />
              )}

              {applicationInfo.state === WAITING_INTERVIEW && dayjs(applicationInfo.interviewDateTime).isSame(dayjs(), "day") && (
                <Button className={"button-in-details"} label={"Join the interview"} onClick={() => setOpenModalVideoCallInterview(true)} />
              )}

              {applicationInfo.state === IN_PROGRESS && applicationInfo.remote && (
                <Button className={"button-in-details"} label={"Start the job"} onClick={() => setOpenModalVideoCallJob(true)} />
              )}

              {applicationInfo.state !== IN_PROGRESS && applicationInfo.state !== DONE && applicationInfo.state !== REJECTED && (
                <Button className={"button-in-details delete-button-application"} label={"Delete the application"} onClick={() => setOpenModalDelete(true)} />
              )}

              {applicationInfo?.state !== DONE && (
                <div className="send-message-detail-page">
                  <span className='send-a-message-link'>
                    Any problem <Link to={`/report-issue/${applicationInfo?.id}`} className='link-message'>Send a message</Link>
                  </span>
                </div>
              )}
            </>
          ) : (
            <span>No application founded</span>
          )
        )
      }


      {openModalDelete &&
        <ModalFeedback
          title={"Do you want to delete the application?"}
          buttonLabel={"Delete"}
          buttonLabelClose={"Don't delete"}
          deleteHandler={() => setOpenModalDelete(false)}
          closeModalHandler={() => { clearApplication(applicationIndex); setOpenModalDelete(false); setOpenModalDeleteConfirm(true); }}
          twobuttons={true}
        />
      }

      {openModalVideoCallInterview &&
        <ModalFeedback
          title={"Do you want to join the interview?"}
          buttonLabel={"Join"}
          buttonLabelClose={"Don't join"}
          deleteHandler={() => setOpenModalVideoCallInterview(false)}
          closeModalHandler={() => { handleWaitingResults(applicationIndex); setOpenModalVideoCallInterview(false);}}
          twobuttons={true}
          redOnLeft
          redirectTo={`/videocall/${applicationIndex}`}
          callOptions
        />
      }

      {openModalVideoCallJob &&
        <ModalFeedback
          title={"Do you want to start the video call?"}
          buttonLabel={"Start"}
          buttonLabelClose={"Don't start"}
          deleteHandler={() => setOpenModalVideoCallJob(false)}
          closeModalHandler={() => {setOpenModalVideoCallJob(false);}}
          twobuttons={true}
          redOnLeft
          redirectTo={`/videocall/${applicationIndex}`}
          callOptions
        />
      }

      {openModalDeleteConfirm &&
        <ModalFeedback
          title={"Success"}
          subtitle={"You've deleted the application!"}
          buttonLabel={"Go to the homepage"}
          closeModalHandler={() => setOpenModalDeleteConfirm(false)}
          redirectTo={"/"}
        />
      }
    </>
  )
}