import React, { useContext, useMemo } from "react";
import { Fluid, Button, Card, Col, Row } from "react-bootstrap";
import { useState } from "react";
import Chip from "../components/Chip/Chip";
import ApplicationCard from "../components/ApplicationCard/ApplicationCard";
import FiltersContainerComponent from "../components/Filters/FiltersContainerComponent";
import dayjs from "dayjs";
import { MainCtx } from "../App";
import Loader from "../components/Loader/Loader";

export default function YourJustWorkListPage(props) {

  const {
    applicationLoading,
    justWorkElementsBooked,
  } = useContext(MainCtx);

  const [filtersSelected, setFiltersSelected] = useState([]);

  const filteredElements = useMemo(() => {
    return justWorkElementsBooked
    ?.filter(justWorkElement =>
      filtersSelected?.length > 0 ? filtersSelected?.some(fil => fil === justWorkElement.state) : true
    ) || [];
  }, [JSON.stringify(justWorkElementsBooked), JSON.stringify(filtersSelected)])

  return (
    <>
      <h1 className="page-title">Your JustWork</h1>
      {
        applicationLoading ? (
          <Loader/>
        ) : (
          justWorkElementsBooked && Object.keys(justWorkElementsBooked).length > 0 ? (
            <>
              <FiltersContainerComponent setFiltersSelected={setFiltersSelected} filtersSelected={filtersSelected}/>
              {filteredElements
                ?.sort((el1, el2) => dayjs(el1.applicationDate, "YYYY/MM/DD") - dayjs(el2.applicationDate, "YYYY/MM/DD"))
                ?.map((el, index) => (
                <ApplicationCard key={index} {...el} toNavigation={`/detail/${el.id}`} />
              ))}
              {filteredElements?.length === 0 && (
                <span className="suggestion">There is no results for your search!</span>
              )}
            </>
          ) : (
            <span>You haven't applied to any job application yet. Go and book a session!</span>
          )
        )
      }
    </>
  )
}