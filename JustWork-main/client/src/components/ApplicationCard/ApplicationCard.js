import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import Chip from "../Chip/Chip";
import { ON_SITE_LABEL, REMOTE_LABEL } from "../../constants";
import { getLabelForState } from "../../utility";
import dayjs from "dayjs";
import { NavLink, useNavigate } from "react-router-dom";

export default function ApplicationCard(props) {
  const {
    title,
    companyLogo,
    companyName,
    remote,
    description,
    state,
    applicationDate,
    toNavigation,
  } = props;

  const navigate = useNavigate();

  const renderDecription = () => {
    if (description?.length > 100) {
      return `${description?.slice(0, 100)}...`
    }

    return description
  }

  return (
    <Card className="application-card" onClick={() => navigate(toNavigation)}>
      <Card.Header className="card-header-application-card">
        {companyLogo && (
          <img className="company-logo-card" src={companyLogo} alt={companyName}/>
        )}
        {!companyLogo && companyName && (
          <span className="company-name-card">{companyName}</span>
        )}
        <div className="chips-container-card">
          {state && (
            <Chip label={getLabelForState(state)}></Chip>
          )}
          <Chip label={remote ? REMOTE_LABEL : ON_SITE_LABEL}></Chip>
        </div>
      </Card.Header>
      <Card.Body className="card-body-application">
        <Card.Title as={"h5"} className="card-title-application">{title}</Card.Title>
        <Card.Text className="card-text-application">
          {renderDecription()}
        </Card.Text>
        <div className="last-row-card">
          {applicationDate && (
            <span className="application-date-card">
              {dayjs(applicationDate, "YYYY/MM/DD").format("DD/MM/YY")}
            </span>
          )}
          <NavLink to={toNavigation} className={`see-more-link`}>
            See more
          </NavLink>
        </div>
      </Card.Body>
    </Card>
  )
}