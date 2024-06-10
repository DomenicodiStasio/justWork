// FeedbackPDF.js
import React from 'react';
import jsPDF from 'jspdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import './FeedbackPDF.css';
import dayjs from "dayjs";

const FeedbackPDF = ({ feedbacks, style }) => {
  const handleDownloadPDF = (feedback, index) => {
    const pdf = new jsPDF();

    const title = `Feedback_${index + 1} - ${feedback.author || 'Anonymous'}`;

    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');

    pdf.text(title, 20, 30);

    const lines = pdf.splitTextToSize(feedback?.text, 160);
    lines.forEach((line, i) => {
      pdf.text(line, 20, 40 + i * 12);
    });

    const blob = pdf.output('blob');

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Feedback_${index + 1}_${feedback.author || 'Anonymous'}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div style={style}>
      {feedbacks &&
        feedbacks?.map((feedback, index) => (
          <div key={index} className="feedback-item">
            <div className='feedback-info'>
              <span className='feedback-date'>{dayjs(feedback?.date, "YYYY/MM/DD").format("DD/MM/YY")}</span>
              <span className="feedback-title-main">{`${feedback?.author || 'Anonymous'}`}</span>
            </div>
            <button className="download-button" onClick={() => handleDownloadPDF(feedback, index)}>
              <FontAwesomeIcon icon={faDownload} />
            </button>
          </div>
        ))}
    </div>
  );
};

export default FeedbackPDF;
