import { DONE, DONE_LABEL, EVALUATING_APPLICATION, EVALUATING_APPLICATION_LABEL, IN_PROGRESS, IN_PROGRESS_LABEL, REJECTED, REJECTED_LABEL, WAITING_INTERVIEW, WAITING_INTERVIEW_LABEL, WAITING_RESULT, WAITING_RESULT_LABEL } from "./constants"

export const getLabelForState = (state) => {
  switch(state) {
    case IN_PROGRESS:
      return IN_PROGRESS_LABEL;
    case WAITING_INTERVIEW:
      return WAITING_INTERVIEW_LABEL;
    case WAITING_RESULT:
      return WAITING_RESULT_LABEL;
    case EVALUATING_APPLICATION:
      return EVALUATING_APPLICATION_LABEL;
    case REJECTED:
      return REJECTED_LABEL;
    case DONE:
      return DONE_LABEL;
    default:
      return state;
  }
}