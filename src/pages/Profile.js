import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

export default function Profile()
{
    const {_id, name, phone, startDate, endDate} = useLocation().state;
    const [formData, setFormData] = React.useState({name: name, phone: phone, start: startDate, end: endDate});
    const [canEdit,setCanEdit] = React.useState(false);
    function handleChange(e)
    {
        const {name, value} = e.target;
        setFormData(prevData => ({...prevData, [name]: [value]}));
    }
    function handleClick(e)
    {
        const {id} = e.target;
        const editPermission = (id == "edit-button");
        setCanEdit(editPermission);
    }
    const handleSaveProfile = async (e) => {
        e.preventDefault();
        const changedJoinee = {
            name: formData.name.toString(),
            phone: formData.phone.toString(),
            startDate: formData.start,
            endDate: formData.end
        }
        const response = await fetch('/api/profile/'+ _id, {
            method: 'PATCH',
            body: JSON.stringify(changedJoinee),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if(!response.ok) console.log(json.error);
    }
    const handleDelete = async (e) => {
        e.preventDefault();
        const response = await fetch('api/profile/'+ _id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if(!response.ok) console.log(json.error);
    }

    return (
        <div className="profile-container">
            <Form onSubmit={handleSaveProfile}>
                <div className="profile-top container">
                    <Form.Control 
                        size="lg"
                        id="profile-name"
                        placeholder="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={!canEdit}
                    />
                    <div>
                        <Button
                            id="edit-button"
                            variant="primary"
                            type="button"
                            className="profile-buttons"
                            onClick={handleClick}
                            >Edit <span className="material-symbols-outlined">
                            edit</span>
                        </Button> 
                        <Link to="/">
                            <Button 
                                variant="danger"
                                type="button"
                                onClick={handleDelete}
                                className="profile-buttons">Delete 
                                <span className="material-symbols-outlined">
                                delete</span>
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="profile-info-container container">
                    <Row>
                        <Col xs={12} md={6}>
                            <Form.Control
                                type="text"
                                placeholder="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                disabled={!canEdit} 
                            />
                            <br />
                        </Col>
                        <Col xs={12} md={6}>
                            <div className="start-date">
                                <p>Start Date</p>
                                <DatePicker
                                    className="date-picker"
                                    selected={new Date(formData.start)}
                                    onChange={date => setFormData(prevData => ({...prevData, start: date}))}
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
                                    selected={new Date(formData.end)}
                                    onChange={date => setFormData(prevData => ({...prevData, end: date}))}
                                    dateFormat='dd/MM/yyyy'
                                    minDate={formData.start}
                                    disabled={!canEdit}
                                />
                                <br />
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="center">
                    <Button
                        id="save-button"
                        variant="success"
                        type="submit"
                        className="profile-save"
                        onClick={handleClick}
                        >Save Profile
                    </Button>
                </div>
            </Form>
        </div>
    )
}