import React, { useContext, useEffect, useState } from "react";
import { Form, FormControl, Button, Card, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ApplicationCard from "../components/ApplicationCard/ApplicationCard";
import { MainCtx } from "../App";
import Loader from "../components/Loader/Loader";

export default function Homepage(props) {

  const {
    applicationLoading,
    justWorkElements,
  } = useContext(MainCtx);

  const [searchTerm, setSearchTerm] = useState("");
  const [justWorkElementsFiltered, setJustWorkElementsFiltered] = useState([]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterElement = () => {
    if (searchTerm?.length > 0) {
      setJustWorkElementsFiltered(justWorkElements?.filter(justWork => justWork.title?.toLocaleLowerCase()?.includes(searchTerm)) || [])
    } else {
      setJustWorkElementsFiltered(justWorkElements);
    }
  }

  const handleButtonClick = (e) => {
    e.preventDefault();
    filterElement();
  };

  useEffect(() => {
    if (!applicationLoading) {
      filterElement();
    }
  }, [JSON.stringify(justWorkElements), applicationLoading])

  return (
    applicationLoading ? (
      <Loader/>
    ) : (
      justWorkElements && Object.keys(justWorkElements).length > 0 ? (
        <>
          <Form className="d-flex mb-3" onSubmit={handleButtonClick}>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-2"
              style={{ borderRadius: "5px 0 0 5px", border: "1px solid black" }}
              value={searchTerm}
              onChange={handleInputChange}
            />
            <Button
              variant="outline-success"
              style={{
                borderRadius: "0 5px 5px 0",
                borderColor: "black",
                backgroundColor: "white",
              }}
              onClick={handleButtonClick}
            >
              <FontAwesomeIcon icon={faSearch} style={{ color: "black" }} />
            </Button>
          </Form>

          {justWorkElementsFiltered?.map((el, index) => (
            <ApplicationCard key={index} {...el} toNavigation={`/apply/${el.id}`}/>
          ))}

          {searchTerm?.length > 0 && justWorkElementsFiltered?.length === 0 && (
            <div className="message-no-results">
              <span>No results</span>
            </div>
          )}
        </>
      ) : (
        <span>There is no applications now. Try later, our companies will create new applications very soon!</span>
      )
    )
  );
}
