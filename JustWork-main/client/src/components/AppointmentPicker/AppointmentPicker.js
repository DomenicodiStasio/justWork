import React from "react";
import dayjs from "dayjs";

const AppointmentDate = (props) => {
  const {
    selected,
    label,
    onClick = () => {}
  } = props;
  return (
    <button className="appointment-date-button" aria-pressed={selected} onClick={() => onClick()}>
      {label}
    </button>
  )
}

const TimeSlots = (props) => {
  const {
    label,
    times = [],
    timeSeleted,
    noTimesLabel,
    onClick = () => {},
  } = props;

  return (
    <div className="time-slots-container">
      <span className="slots-title">{label}</span>
      <div className="slots-slider">
        {times?.map((time, index) => (
          <button aria-pressed={timeSeleted === time} className="time-button" key={index} onClick={() => onClick(time)}>
            {time}
          </button>
        ))}
        {times?.length === 0 && (
          <span className="no-times">{noTimesLabel}</span>
        )}
      </div>
    </div>
  )
}

export default function AppointmentPicker(props) {
  const {
    dates = [],
    dateSelected,
    timeSelected,
    setDateSelected,
    setTimeSelected,
  } = props;

  return (
    <div className="appointment-picker-container">
      <div className="appointmet-date">
        {dates?.map((date, index) => (
          <AppointmentDate selected={dateSelected === date.date} key={index} label={dayjs(date.date, "YYYY/MM/DD").format("DD/MM")} onClick={() => setDateSelected(date.date)}/>
        ))}
      </div>
      <div className="appointment-time">
        <TimeSlots
          timeSeleted={timeSelected}
          label={"Morning slots"}
          noTimesLabel={"No morning slots available"}
          onClick={setTimeSelected}
          times={dates?.filter(date => date.date === dateSelected)?.[0]?.times?.filter(time => (parseInt(time.slice(0, 2)) < 13))}
        />
        <TimeSlots
          timeSeleted={timeSelected}
          label={"Afternoon slots"}
          noTimesLabel={"No afternoon slots available"}
          times={dates?.filter(date => date.date === dateSelected)?.[0]?.times?.filter(time => (parseInt(time.slice(0, 2)) >= 13))}
          onClick={setTimeSelected}
        />
      </div>
    </div>
  )
}