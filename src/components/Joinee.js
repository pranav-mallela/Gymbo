import React from "react";
import { Link } from 'react-router-dom'

export default function Joinee(props)
{
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
        </Link>
    )
}