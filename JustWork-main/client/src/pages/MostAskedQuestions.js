import React from "react";
import GoBack from '../components/GoBack/GoBack';
import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function MostAskedQuestion(props) {

    return (
        <>
        <GoBack />
      <h1 className='page-title'>Most asked questions</h1>

        <Accordion >
            <Accordion.Item eventKey="0">
                <Accordion.Header className="accordion-header-question" >What are the meaning of the states? <FontAwesomeIcon className="accordion-icon" icon={faChevronDown}/> </Accordion.Header>
                <Accordion.Body>
                    <ul>
                    <li> <strong>Evaluating application:</strong> You apply for a job and the company is still evaluating your profile </li>
                    <li> <strong>Waiting for interview: </strong> The company evaluated positivetely your application and now you have to take a motivational interview with the company, if you still haven't booked the interview go to the detail page of the application and book it. </li>
                    <li> <strong>Waiting for result: </strong> The company will soon let you know if the motivational interview went well or not. </li>
                    <li> <strong>In progress: </strong> You can finally start the job, remotely or on site. </li>
                    <li> <strong>Done: </strong> The job is done, now you can read the feedbacks you recieved or ask for more of them. </li>
                    <li> <strong>Rejected: </strong> You have been rejected for that job, but you can still apply for more. </li>
                    </ul>
                </Accordion.Body>
            </Accordion.Item> 
            <Accordion.Item eventKey="1">
                <Accordion.Header className="accordion-header-question">When will I recieve information on my application? <FontAwesomeIcon className="accordion-icon" icon={faChevronDown}/></Accordion.Header>
                <Accordion.Body>
                    The company will answer to you in a couple of days, whenever new infos are available you'll recieve a notification.
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        </>
    )
}