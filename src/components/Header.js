import React from "react";
import Button from "react-bootstrap/esm/Button";
import { Link, useLocation } from "react-router-dom";
import { FaDumbbell } from 'react-icons/fa';
import { BiDumbbell } from 'react-icons/bi';

export default function Header()
{
    const [showButton, setShowButton] = React.useState(true);
    const location = useLocation();
    React.useEffect(() => {
        if(location.pathname === '/') setShowButton(true);
        else setShowButton(false);
    },[location.pathname])
    
    // const imgSrc = '../localData/dumbbell.jpg'

    return (
        <div>
            <div className="navbar-container">
                <Link className="gymbo" to='/'><span className="gymbo">GYMBO</span></Link>
                <FaDumbbell size={70}/>
                <BiDumbbell size={70}/>
                <FaDumbbell size={70}/>
                <BiDumbbell size={70}/>
                <FaDumbbell size={70}/>
                <BiDumbbell size={70}/>
                {showButton && <Link to='/machines'>
                    <Button 
                    variant="info"
                    className="equipment-button"
                    >Equipment</Button>
                </Link>}
            </div>
            <hr/>
        </div>
    )
}