import React from "react";

export default function Joinee(props)
{
    return (
        <div className="joinee-container container">
            <div className="name-container">
                <span className="material-symbols-outlined">person</span>
                <div className="name">{props.name}</div>
            </div>
            <div className="phone-container">
                <span className="material-symbols-outlined">call</span>
                <div className="phone">{props.phone}</div>
            </div>
        </div>
    )
}