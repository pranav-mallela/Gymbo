import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useLocation } from 'react-router-dom';

export default function Profile()
{
    const [canEdit,setCanEdit] = React.useState(false);
    const [dates, setDates] = React.useState({start:new Date(), end:null});
    function handleClick(e)
    {
        const {id} = e.target;
        const editPermission = id == "edit-button" ? true : false;
        setCanEdit(editPermission);
    }
    // console.log(canEdit);
    const {name, phone} = useLocation().state;
    return (
        <div className="profile-container">
            <div className="profile-top container">
                <Form.Control size="lg" id="profile-name" placeholder="Name" value={name} disabled={!canEdit}></Form.Control>
                <div>
                    <Button
                        id="edit-button"
                        variant="primary"
                        className="profile-buttons"
                        onClick={handleClick}
                        >Edit <span className="material-symbols-outlined">
                        edit</span>
                    </Button> 
                    <Button 
                        variant="danger" 
                        className="profile-buttons">Delete 
                        <span className="material-symbols-outlined">
                        delete</span>
                    </Button>
                </div>
            </div>
            <div className="profile-info-container container">
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Control type="text" placeholder="Phone" value={phone} disabled={!canEdit} />
                        <br />
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="start-date">
                            <p>Start Date</p>
                            <DatePicker
                                className="date-picker"
                                selected={dates.start}
                                onChange={date => setDates(prevDates => ({...prevDates, start: date}))}
                                dateFormat='dd/MM/yyyy'
                                minDate={new Date()}
                                disabled={!canEdit}
                            />
                            <br />
                        </div>
                        <div className="end-date">
                            <p>End Date</p>
                            <DatePicker
                                className="date-picker"
                                selected={dates.end}
                                onChange={date => setDates(prevDates => ({...prevDates, end: date}))}
                                dateFormat='dd/MM/yyyy'
                                minDate={dates.start}
                                disabled={!canEdit}
                            />
                            <br />
                        </div>
                    </Col>
                </Row>
            </div>
            <Button
                id="save-button"
                variant="success"
                className="profile-save center"
                onClick={handleClick}
                >Save Profile
            </Button>
        </div>
    )
}