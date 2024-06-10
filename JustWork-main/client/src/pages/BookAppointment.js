// BookAppointment.js
import React, { useContext, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useParams } from 'react-router-dom';
import Button from '../components/Button/Button';
import GoBack from '../components/GoBack/GoBack';
import AppointmentPicker from '../components/AppointmentPicker/AppointmentPicker';
import ModalFeedback from '../components/ModalFeedback/ModalFeedback';
import { getAppointmentsDate } from '../API';
import Loader from '../components/Loader/Loader';
import { MainCtx } from '../App';

const BookAppointment = () => {
  const [dateSelected, setDateSelected] = useState(null);
  const [timeSelected, setTimeSelected] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalDeleteConfirm, setOpenModalDeleteConfirm] = useState(false);
  const [signalError, setSignalError] = useState(false);
  const [dates, setDates] = useState([]);
  const [loadingDates, setLoadingDates] = useState(true);
  const { clearApplication, handleBookAppointment: handleBookAppointmentCtx } = useContext(MainCtx);

  let { applicationIndex } = useParams();

  const handleBookAppointment = () => {
    if (dateSelected && timeSelected) {
      setOpenModal(true);
      handleBookAppointmentCtx(applicationIndex, dateSelected, timeSelected)
    } else {
      setSignalError(true);
    }
  };

  useEffect(() => {
    if (dates?.length > 0) {
      setDateSelected(dates?.[0]?.date)
    }
  }, [JSON.stringify(dates)])

  useEffect(() => {
    setTimeSelected(null);
    setSignalError(false);
  }, [dateSelected])

  useEffect(() => {
    setSignalError(false);
  }, [timeSelected])

  useEffect(() => {
    if (applicationIndex) {
      getAppointmentsDate(applicationIndex)
        .then(results => {
          const datesFormatted = [];
          results?.forEach(result => {
            const dateFoundedIndex = datesFormatted?.findIndex(date => date.date === result.day);
            if (dateFoundedIndex !== -1) {
              if (!datesFormatted[dateFoundedIndex]?.times?.find(time => time === result.slot)) {
                datesFormatted[dateFoundedIndex]?.times?.push(result.slot);
              }
            } else {
              datesFormatted.push(
                {
                  date: result.day,
                  times: [result.slot],
                }
              )
            }
          })
          setDates(datesFormatted)
        })
        .finally(() => setLoadingDates(false));
    } else {
      setLoadingDates(false);
    }
  }, [])

  return (
    <>
      <GoBack />
      <h1 className='page-title'>Book an Appointment</h1>

      {loadingDates ? (
        <Loader />
      ) : (
        dates?.length === 0 ? (
          <span>No slots available</span>
        ) : (
          <>
            {/* Select Date and Time */}
            <div>
              <label className='appointment-picker-label'>Select your date and time</label>
              <AppointmentPicker
                dateSelected={dateSelected}
                setDateSelected={setDateSelected}
                timeSelected={timeSelected}
                setTimeSelected={setTimeSelected}
                dates={dates}
              />
            </div>

            {signalError && (
              <span className='error-form'>You should select a date and time</span>
            )}

            <span className='send-a-message-link'>
              No slot found? <Link to="/ask-more-availability" className='link-message'>Send a message</Link>
            </span>

            <div className='buttons-container-appointment'>
              <Button label="Delete the application" className={"delete-button-application"} onClick={() => setOpenModalDelete(true)} />
              <Button label="Book It" onClick={handleBookAppointment} />
            </div>

            {openModalDelete &&
              <ModalFeedback
                title={"Do you want to delete the application?"}
                buttonLabel={"Delete"}
                buttonLabelClose={"Don't delete"}
                deleteHandler={() => setOpenModalDelete(false)}
                closeModalHandler={() => { clearApplication(applicationIndex); setOpenModalDelete(false); setOpenModalDeleteConfirm(true); }}
                twobuttons={true}
              />
            }

            {openModal &&
              <ModalFeedback
                title={"Success"}
                subtitle={"You've booked the interview!"}
                buttonLabel={"Go to the homepage"}
                closeModalHandler={() => setOpenModal(false)}
                redirectTo={"/"}
              />
            }

            {openModalDeleteConfirm &&
              <ModalFeedback
                title={"Success"}
                subtitle={"You've deleted the application!"}
                buttonLabel={"Go to the homepage"}
                closeModalHandler={() => setOpenModalDeleteConfirm(false)}
                redirectTo={"/"}
              />
            }
          </>
        )
      )}

    </>
  );
};

export default BookAppointment;
