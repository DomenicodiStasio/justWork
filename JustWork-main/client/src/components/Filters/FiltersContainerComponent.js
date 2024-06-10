import React from "react";
import FilterComponent from "./FilterComponent";
import { getLabelForState } from "../../utility";
import { DONE, EVALUATING_APPLICATION, IN_PROGRESS, REJECTED, WAITING_INTERVIEW, WAITING_RESULT } from "../../constants";

export default function FiltersContainerComponent(props) {
  const {
    setFiltersSelected,
    filtersSelected = [],
  } = props;

  const handleSelectFilter = (state) => {
    if (!!filtersSelected?.find(filter => filter === state)) {
      // the filter is active
      setFiltersSelected(prevState => prevState?.filter(el => el !== state))
    } else {
      //we add the filter
      setFiltersSelected(prevState => [...prevState, state])
    }
  }

  return (
    <div className="filters-container">
      <FilterComponent
        label={getLabelForState(EVALUATING_APPLICATION)}
        onClick={() => handleSelectFilter(EVALUATING_APPLICATION)}
        isSelected={!!filtersSelected?.find(filter => filter === EVALUATING_APPLICATION)}
      />
      <FilterComponent
        label={getLabelForState(WAITING_INTERVIEW)}
        onClick={() => handleSelectFilter(WAITING_INTERVIEW)}
        isSelected={!!filtersSelected?.find(filter => filter === WAITING_INTERVIEW)}
      />
      <FilterComponent
        label={getLabelForState(WAITING_RESULT)}
        onClick={() => handleSelectFilter(WAITING_RESULT)}
        isSelected={!!filtersSelected?.find(filter => filter === WAITING_RESULT)}
      />
      <FilterComponent
        label={getLabelForState(IN_PROGRESS)}
        onClick={() => handleSelectFilter(IN_PROGRESS)}
        isSelected={!!filtersSelected?.find(filter => filter === IN_PROGRESS)}
      />
      <FilterComponent
        label={getLabelForState(DONE)}
        onClick={() => handleSelectFilter(DONE)}
        isSelected={!!filtersSelected?.find(filter => filter === DONE)}
      />
      <FilterComponent
        label={getLabelForState(REJECTED)}
        onClick={() => handleSelectFilter(REJECTED)}
        isSelected={!!filtersSelected?.find(filter => filter === REJECTED)}
      />
    </div>
  )
}