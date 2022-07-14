import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import About from "../components/About";
import { useLocation } from 'react-router-dom';

export default function Profile()
{
    const {_id, name, phone, startDate, endDate} = useLocation().state;
    const [formData, setFormData] = React.useState({name: name, phone: phone, start: startDate, end: endDate});
    const [canEdit,setCanEdit] = React.useState(false);
    const [joineeData, setJoineeData] = React.useState([]);
    const [displayError, setDisplayError] = React.useState({alreadyExists: false, incorrectLength: false, containsNonDigits: false});

    React.useEffect(() => {
        const fetchProfiles = async () => {
            const response = await fetch('https://protected-peak-51310.herokuapp.com/api/manage');
            const json = await response.json();
            if(!response.ok) console.log(json.error);
            else setJoineeData(json);
        }
        fetchProfiles();
    },[])

    React.useEffect(() => {
        let cnt=0;
        for(let i=0;i<joineeData.length;i++)
        {
            if(formData.phone.toString() === joineeData[i].phone)
            {
                setDisplayError(prevError => ({...prevError, alreadyExists: true}));
            }
            else cnt++;
        }
        if(cnt === joineeData.length) setDisplayError(prevError => ({...prevError, alreadyExists: false}));
        setDisplayError(prevError => ({...prevError, incorrectLength: (formData.phone.toString().length !== 10)}));
        setDisplayError(prevError => ({...prevError, containsNonDigits: !(/^\d+$/.test(formData.phone.toString()))}));
    },[formData.phone])

    function handleChange(e)
    {
        const {name, value} = e.target;
        setFormData(prevData => ({...prevData, [name]: [value]}));
    }
    function handleClick(e)
    {
        const {id} = e.target;
        const editPermission = (id === "edit-button");
        setCanEdit(editPermission);
    }
    const handleSaveProfile = (e) => {
        e.preventDefault();
        const changedJoinee = {
            name: formData.name.toString(),
            phone: formData.phone.toString(),
            startDate: formData.start,
            endDate: formData.end
        }
        // const firstDelete = async () => {
        //     const response_0 = await fetch('https://protected-peak-51310.herokuapp.com/api/profile/'+ _id, {
        //         method: 'DELETE',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     })
        //     const json_0 = await response_0.json()
        //     if(!response_0.ok) console.log(json_0.error);
        // }
        const patchJoinee = async () => {
            const response = await fetch('https://protected-peak-51310.herokuapp.com/api/profile/'+_id, {
                method: 'PATCH',
                body: JSON.stringify(changedJoinee),
                headers: {
                    'Content-Type': 'application/json' 
                }
            })
            const json = await response.json()
            if(!response.ok) console.log(json.error);
            else window.location.href='/';
        }
        // firstDelete();
        // thenPost();
        patchJoinee();
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        const response = await fetch('https://protected-peak-51310.herokuapp.com/api/profile/'+ _id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if(!response.ok) console.log(json.error);
        else window.location.href='/';
    }
    const aboutProfile = "It keeps track of each joinee's data. Clicking 'Edit' allows modification. 'Delete' deleted the profile. 'Save Profile' saves the same. Deleting or saving redirects you to home."

    return (
        <div className="profile-container">
            <About
                aboutText={aboutProfile}
            />
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
                        <Button 
                            variant="danger"
                            type="button"
                            onClick={handleDelete}
                            className="profile-buttons">Delete 
                            <span className="material-symbols-outlined">
                            delete</span>
                        </Button>
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
                            {displayError.alreadyExists && <div className="error-message">
                                <p>User already exists with the given phone number. Please change.</p>
                            </div>}
                            {formData.phone !== "" && displayError.incorrectLength && <div className="error-message">
                                <p>Phone number must be 10 digits long. Please change.</p>
                            </div>}
                            {formData.phone !== "" && displayError.containsNonDigits && <div className="error-message">
                                <p>Phone number must only contain digits 0-9. Please change.</p>
                            </div>}
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
                                    minDate={new Date(formData.start)}
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
