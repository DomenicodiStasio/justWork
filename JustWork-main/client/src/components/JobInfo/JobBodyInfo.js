import { faBuilding, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown, faFlagCheckered } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import dayjs from "dayjs";
import webcamSvg from "../../icons/webcam.svg";
import calendarStart from "../../icons/calendar-start.svg";

const InfoItem = (props) => {
  const {
    icon,
    label,
    isFontAwesomeIcon = true,
  } = props;

  return (
    <div className="info-item-row">
      <div className="info-icon-container">
        {isFontAwesomeIcon ? (
          <FontAwesomeIcon className="info-icon" icon={icon} />
        ) : (
          <img className="info-icon" src={icon} />
        )}
      </div>
      <span className="info-label">{label}</span>
    </div>
  )
}

export default function JobBodyInfo(props) {
  const {
    showButtonReadMore = false,
    showRequirements = false,
    jobItem,
  } = props;

  const [showMore, setShowMore] = useState(false);

  const descriptionLength = 200;

  const shouldShowReedMoreButton = showButtonReadMore && jobItem.description?.length > descriptionLength;

  return (
    <div className="job-body-container">
      <InfoItem icon={faBuilding} label={`${jobItem.companyName}${jobItem.place ? `, ${jobItem.place}` : ""}`} />
      {jobItem?.description && (
        <>
          <p className="job-description-body">
            {shouldShowReedMoreButton && !showMore ? (
              `${jobItem.description?.slice(0, descriptionLength)}...`
            ) : (
              jobItem.description
            )}
          </p>
          {shouldShowReedMoreButton && (
            <div className="show-more-button-container">
              <button onClick={() => setShowMore(!showMore)} className={`show-more-button ${showMore ? "show-more-open" : ""}`}>
                {showMore ? "Read less" : "Read more"}
                <FontAwesomeIcon icon={faAngleDown} className="icon-read-more"/>
              </button>
            </div>
          )}
        </>
      )}
      {showRequirements && jobItem?.requirements && (
        <p className="job-requirements-body">
          {jobItem.requirements}
        </p>
      )}
      {jobItem?.applicationDate && (
        <InfoItem
          icon={faPenToSquare}
          label={`Applied on: ${dayjs(jobItem.applicationDate, "YYYY/MM/DD").format("DD/MM/YY")}`}
        />
      )}
      {jobItem?.interviewDateTime && (
        <InfoItem
          isFontAwesomeIcon={false}
          icon={webcamSvg}
          label={`Interviewed on: ${dayjs(jobItem.interviewDateTime, "YYYY/MM/DD HH:mm").format("DD/MM/YY HH:mm")}`}
        />
      )}
      {jobItem?.startDateTime && (
        <InfoItem
          isFontAwesomeIcon={false}
          icon={calendarStart}
          label={`Start date: ${dayjs(jobItem.startDateTime, "YYYY/MM/DD HH:mm").format("DD/MM/YY HH:mm")}`}
        />
      )}
      {jobItem?.endDateTime && (
        <InfoItem
          icon={faFlagCheckered}
          label={`End date: ${dayjs(jobItem.endDateTime, "YYYY/MM/DD HH:mm").format("DD/MM/YY HH:mm")}`}
        />
      )}
    </div>
  )
}