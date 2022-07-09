import React from 'react';

export default function Equipment(props)
{
    return (
        <div className="joinee-container container simple-joinee">
            <div className="name-container">
                <span className="material-symbols-outlined">fitness_center</span>
                <div className="name">{props.machine}</div>
            </div>
            <div className="phone-container">
                <span className="material-symbols-outlined">numbers</span>
                <div className="phone">{props.quantity}</div>
            </div>
        </div>
    )
}