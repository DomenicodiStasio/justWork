import React, { useMemo } from "react";
import { DONE, EVALUATING_APPLICATION, IN_PROGRESS, REJECTED, WAITING_INTERVIEW, WAITING_RESULT } from "../../constants";
import { getLabelForState } from "../../utility";

export default function ProgressBar(props) {
  const {
    hasInterviewDateTime = false,
    state,
  } = props;

  const completedState = [
    {
      mainState: [DONE, REJECTED],
      completedState: [
        EVALUATING_APPLICATION,
        WAITING_INTERVIEW,
        WAITING_RESULT,
        IN_PROGRESS,
      ]
    },
    {
      mainState: [IN_PROGRESS],
      completedState: [
        EVALUATING_APPLICATION,
        WAITING_INTERVIEW,
        WAITING_RESULT,
      ]
    },
    {
      mainState: [WAITING_RESULT],
      completedState: [
        EVALUATING_APPLICATION,
        WAITING_INTERVIEW,
      ]
    },
    {
      mainState: [WAITING_INTERVIEW],
      completedState: [
        EVALUATING_APPLICATION,
      ]
    }
  ]

  const statesToRender = useMemo(() => {
    if (state !== REJECTED) {
      return [
        EVALUATING_APPLICATION,
        WAITING_INTERVIEW,
        WAITING_RESULT,
        IN_PROGRESS,
        DONE,
      ]
    } else if (hasInterviewDateTime) {
      return [
        EVALUATING_APPLICATION,
        WAITING_INTERVIEW,
        WAITING_RESULT,
        REJECTED,
      ]
    }

    return [
      EVALUATING_APPLICATION,
      REJECTED,
    ];
  }, [state, hasInterviewDateTime])

  const isCompleted = (state_) => {
    return completedState.find(comState => !!comState.mainState?.find(st => st === state))?.completedState?.find(com => com === state_)
  }

  return (
    <div className={`progressbar-container ${statesToRender?.length === 2 ? "two-states" : ""}`}>
      {statesToRender?.map((stateToRender, index) => (
        <div
          key={index}
          className={`proressbar-element ${state === stateToRender ? "active" : ""} ${isCompleted(stateToRender) ? "completed" : ""}`}
        >
          <div className="progressbar-circle"/>
          <span className="progressbar-label">
            {getLabelForState(stateToRender)}
          </span>
        </div>
      ))}
    </div>
  )
}