import React, { useContext, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EVALUATING_APPLICATION, ON_SITE_LABEL, REMOTE_LABEL } from "../constants";
import GoBack from "../components/GoBack/GoBack";
import JobHeaderInfo from "../components/JobInfo/JobHeaderInfo";
import JobBodyInfo from "../components/JobInfo/JobBodyInfo";
import Button from "../components/Button/Button";
import ModalFeedback from "../components/ModalFeedback/ModalFeedback";
import { MainCtx } from "../App";
import Loader from "../components/Loader/Loader";
import { applyApplication } from "../API";
import dayjs from "dayjs";

export default function ApplyPage(props) {

  const {
    applicationLoading,
    justWorkElements,
    setApplicationsList,
    notifyInterviewCall,
  } = useContext(MainCtx);

  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  let { applicationIndex } = useParams();
  const applicationInfo = useMemo(() => {
    if (applicationIndex) {
      return justWorkElements.filter(el => el.id === parseInt(applicationIndex))?.[0] || {}
    }
    return {}
  }, [JSON.stringify(justWorkElements)])

  return (
    <>
      <GoBack />
      {
        applicationLoading ? (
          <Loader />
        ) : (
          <>
            {applicationInfo && Object.keys(applicationInfo).length > 0 ? (
              <>
                <JobHeaderInfo
                  title={applicationInfo.title}
                  duration={applicationInfo.duration}
                  place={applicationInfo.remote ? REMOTE_LABEL : ON_SITE_LABEL}
                />
                <JobBodyInfo
                  showRequirements
                  jobItem={applicationInfo}
                />
                <Button label={"Apply"} className={"button-apply"} onClick={() => setOpenModal(true)} />
                {openModal && <ModalFeedback
                  title={"Success"}
                  subtitle={`You've applied for ${applicationInfo.title}`}
                  buttonLabel={"Go to the detail page"}
                  closeModalHandler={() => {
                    applyApplication(applicationInfo.id);
                    setApplicationsList(prevstate => prevstate.map((el) => {
                      if (el.id === applicationInfo.id) {
                        return {
                          ...el,
                          applicationDate: dayjs().format("YYYY/MM/DD"),
                          state: EVALUATING_APPLICATION,
                        }
                      }
                      return el
                    }))
                    notifyInterviewCall(applicationInfo.id, applicationInfo.title)
                    setOpenModal(false);
                    navigate(`/detail/${applicationIndex}`)
                  }}
                />}
              </>
            ) : (
              <span>No application founded, go to the homepage and search a new one</span>
            )}
          </>
        )
      }
    </>
  )
}