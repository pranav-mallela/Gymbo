import React from "react";
import { Link } from 'react-router-dom'

export default function Joinee(props)
{
    let joineeClass;
    const presentDate = new Date();
    const msDay = 60*60*24*1000;
    const classifyNew = Math.floor((presentDate - new Date(props.startDate))/msDay);
    const classifyEnding = Math.floor((new Date(props.endDate) - presentDate)/msDay);

    //Will display if sub is ending, then if new
    if(presentDate > new Date(props.endDate)) joineeClass = "done-joinee";
    else if(classifyEnding <= 2) joineeClass = "ending-joinee";
    else if(classifyNew >= -1 && classifyNew <= 2) joineeClass = "new-joinee";
    else joineeClass = "simple-joinee";

    return (
        <Link 
            to='/profile'
            state={{
                _id: props._id,
                name: props.name,
                phone: props.phone,
                startDate: props.startDate,
                endDate: props.endDate
            }}
            className="joinee-link"
        >
            <div className={`joinee-container container ${joineeClass}`}>
                <div className="name-container">
                    <span className="material-symbols-outlined">person</span>
                    <div className="name">{props.name}</div>
                </div>
                <div className="phone-container">
                    <span className="material-symbols-outlined">call</span>
                    <div className="phone">{props.phone}</div>
                </div>
            </div>
        </Link>
    )
}