import React from "react";


import "components/InterviewerList.scss";
import classNames from 'classnames/bind';
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {

  const interviewerData = props.interviewers.map(interviewers => {
    return (
      <InterviewerListItem
        id={interviewers.id}
        name={interviewers.name}
        avatar={interviewers.avatar}
        selected={interviewers.id === props.interviewer}
        setInterviewer={event => props.setInterviewer(interviewers.id)}
       />
    );
  }) 
  return (
  <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">
    {interviewerData}
  </ul>
  </section>
  );
}