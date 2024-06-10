import { faBell, faFolderOpen, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container, Row } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";

const NavigationElement = (props) => {
  const {
    icon,
    className = "",
    active = false,
    toNavigation = "/",
    dotVisible = false,
  } = props;
  return (
    <NavLink to={toNavigation} className={`col-navigation px-0 ${className} ${active ? "active-col-navigation" : ""} col`}>
      <FontAwesomeIcon icon={icon} />
      {dotVisible && (
        <div className="dot-navigationbar"/>
      )}
    </NavLink>
  )
}

export default function NavigationBar(props) {
  const {
    isNotificationReadable = false
  } = props;

  const location = useLocation();

  return (
    <Container fluid className="navigation-bar-container">
      <Row className="row-navigation">
        <NavigationElement
          icon={faHouse}
          active={location.pathname === "/"}
          toNavigation={"/"}
        />
        <NavigationElement
          icon={faFolderOpen}
          active={location.pathname === "/your-just-work"}
          toNavigation={"/your-just-work"}
        />
        <NavigationElement
          icon={faBell}
          active={location.pathname === "/notification"}
          toNavigation={"/notification"}
          dotVisible={isNotificationReadable}
        />
        <NavigationElement
          icon={faUser}
          className={"me-0"}
          active={location.pathname === "/account"}
          toNavigation={"/account"}
        />
      </Row>
    </Container>
  )
}