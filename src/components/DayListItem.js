import React from "react";

import "components/DayListItem.scss";
import classNames from 'classnames/bind';


export default function DayListItem(props) {

  const formatSpots = () => {
    let output = ""
    if (props.spots === 0) {
      output = "no spots remaining"
    } 
    else if (props.spots === 1) {
      output = "1 spot remaining"
    }
    else if (props.spots > 1) {
      output = (`${props.spots} spots remaining`)
    }
    return output;
  }

  let dayClass = classNames( {
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });
  
  return (
    <li   
      className={dayClass}
      onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}



