import React from "react";

import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then(() => {
      transition(SHOW);
    })
    .catch((error) => {
      console.log(error.response.status);
      transition(ERROR_SAVE);
    });
  };
  

  function cancel() {
    transition(SAVING);

    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY);
    })
    .catch((error) => {
      console.log(error.response.status);
      transition(ERROR_DELETE);
    });
  };


  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && <Form
      interviewers={props.interviewers}
      onCancel={() => back()}
      onSave={save} />}
      {mode === SAVING && <Status />}
      {mode === CONFIRM && (
        <Confirm 
        onCancel={() => transition(SHOW)}
        onConfirm={cancel}
        />)}
      {mode === EDIT && <Form
      name={props.interview && props.interview.student}
      interviewer={
        props.interview && 
        props.interview.interviewer && 
        props.interview.interviewer.id}
      interviewers={props.interviewers}
      onCancel={() => back()}
      onSave={save} />}
      {mode === ERROR_SAVE && <Error 
      message="Could not save appointment"/>}
      {mode === ERROR_DELETE && <Error 
      message="Could not delete appointment"/>}
    </article>
    
    
  );
}


      
