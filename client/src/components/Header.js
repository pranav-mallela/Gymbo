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
        if(location.pathname === '/manage') setShowButton(true);
        else setShowButton(false);
    },[location.pathname])

    function handleLogout()
    {
        localStorage.clear();
        window.location.href = '/';
    }

    return (
        <div>
            <div className="navbar-container">
                <Link className="link" to='/manage'><span className="gymbo">GYMBO</span></Link>
                {!showButton && <FaDumbbell size={70}/>}
                <div className="header-button-container">
                    {showButton && <Link to='/machines'>
                        <Button 
                            variant="info"
                            className="equipment-button button-margin"
                        >Equipment <BiDumbbell size={30}/></Button>                   
                    </Link>}
                    {window.location.href !== '/' && <Button
                        variant="info"
                        className="button-margin"
                        onClick={handleLogout}
                    >Logout</Button>}
                </div>
            </div>
            <hr/>
        </div>
    )
}