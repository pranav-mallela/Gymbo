import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Row, Col, Accordion } from "react-bootstrap";
import Joinee from "../components/Joinee";
import About from "../components/About";

export default function Manage()
{
    const [formData, setFormData] = React.useState({name:"", phone:""});
    const [search, setSearch] = React.useState("");
    const [dates, setDates] = React.useState({start:new Date(), end:null});
    const [joineeData, setJoineeData] = React.useState([]);
    const [refresh, setRefresh] = React.useState(false);
    const [displayError, setDisplayError] = React.useState({alreadyExists: false, incorrectLength: false, containsNonDigits: false});

    React.useEffect(()=> {
        const fetchJoineeData = async() => {
            const response = await fetch('https://protected-peak-51310.herokuapp.com/api/manage');
            const json = await response.json();
            if(response.ok)
            {
                setJoineeData(json);
            }
            else console.log(json.error)
        }
        fetchJoineeData();
    },[refresh])

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
        setFormData(prevData => ({...prevData, [name] : [value]}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(displayError.alreadyExists || displayError.incorrectLength || displayError.containsNonDigits) return;
        const newJoinee = {
            name: formData.name.toString(),
            phone: formData.phone.toString(),
            startDate: dates.start,
            endDate: dates.end
        }
        const response = await fetch('https://protected-peak-51310.herokuapp.com/api/manage', {
            method: 'POST',
            body: JSON.stringify(newJoinee),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if(!response.ok)
        {
            //output the error
            console.log(json.error)
        }
        else{
            setFormData({name: "", phone: ""});
            setDates({start: new Date(), end: null});
            setRefresh(prev => !prev);
        }
    }

    function handleSearch(e)
    {
        setSearch(e.target.value);
    }

    const subEnding = [], subDone = [], newJoinee = [];
    const presentDate = new Date();
    const msDay = 60*60*24*1000;
    let classifyNew, classifyEnding;
    const searchResults = [];
    for(let i=0;i<joineeData.length;i++)
    {
        if(joineeData[i].name.toLowerCase().includes(search.toLowerCase()))
            searchResults.push(joineeData[i]);
        classifyNew = Math.floor((presentDate - new Date(joineeData[i].startDate))/msDay);
        classifyEnding = Math.floor((new Date(joineeData[i].endDate) - presentDate)/msDay);
        //Will display if sub is ending, then if new
        if(presentDate > new Date(joineeData[i].endDate)) 
            subDone.push(joineeData[i]);
        else if(classifyEnding <= 2) 
            subEnding.push(joineeData[i]);
        else if(classifyNew >= -1 && classifyNew <= 2) 
            newJoinee.push(joineeData[i]);
    }

    const resultsEls = searchResults.map(joinee => {
        return <Joinee
                    _id={joinee._id}
                    name={joinee.name}
                    phone={joinee.phone}
                    startDate={joinee.startDate}
                    endDate={joinee.endDate}
                />
    })
    const subEndingEls = subEnding.map(joinee => {
        return <Joinee
                    _id={joinee._id}
                    name={joinee.name}
                    phone={joinee.phone}
                    startDate={joinee.startDate}
                    endDate={joinee.endDate}
                />
    })
    const subDoneEls = subDone.map(joinee => {
        return <Joinee
                    _id={joinee._id}
                    name={joinee.name}
                    phone={joinee.phone}
                    startDate={joinee.startDate}
                    endDate={joinee.endDate}
                />
    })
    const newJoineeEls = newJoinee.map(joinee => {
        return <Joinee
                    _id={joinee._id}
                    name={joinee.name}
                    phone={joinee.phone}
                    startDate={joinee.startDate}
                    endDate={joinee.endDate}
                />
    })
    const aboutManage = "It manages the joinees of your gym. Clicking on them takes you to the corresponding profile. They are color-coded as follows: Green--new joinee. Yellow--joinee whose subscription ends in 2 days. Red--joinee whose subscription has ended. White--the rest. Clicking the logo redirects to the home page.";

    return (
        <div className="page-container">
            <About
                aboutText={aboutManage}
            />
            <Row>
                <Col xs={12} md={6} lg={7}>
                <div className="search-container container">
                    <Form>
                        <Form.Control type="text" placeholder="Search for joinee" onChange={handleSearch} />
                        <br />
                    </Form>
                    {resultsEls}
                </div>
                </Col>
                <Col xs={12} md={6} lg={5}>
                <Accordion className="container">
                    <h2>Dashboard</h2>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Subscription Complete ({subDoneEls.length})</Accordion.Header>
                        <Accordion.Body>
                        {subDoneEls}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Subscription Ending ({subEndingEls.length})</Accordion.Header>
                        <Accordion.Body>
                        {subEndingEls}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3">
                        <Accordion.Header>New Joinees ({newJoineeEls.length})</Accordion.Header>
                        <Accordion.Body>
                        {newJoineeEls}
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Form className="container" onSubmit={handleSubmit}>
                    <h2>Add joinee</h2>
                    {displayError.alreadyExists && <div className="error-message">
                        <p>User already exists with the given phone number. Please change.</p>
                    </div>}
                    {formData.phone !== "" && displayError.incorrectLength && <div className="error-message">
                        <p>Phone number must be 10 digits long. Please change.</p>
                    </div>}
                    {formData.phone !== "" && displayError.containsNonDigits && <div className="error-message">
                        <p>Phone number must only contain digits 0-9. Please change.</p>
                    </div>}
                    {   !displayError.incorrectLength && 
                        !displayError.alreadyExists && 
                        formData.name !== "" &&
                        dates.start !== null &&
                        dates.end !== null &&
                    <div className="success-message">
                        <p>You're good to go :)</p>
                    </div>}
                    <Form.Control 
                        type="text" 
                        placeholder="Name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                    />
                    <br />
                    <Form.Control 
                        type="text" 
                        placeholder="Phone number" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                    />
                    <br />
                    <div className="start-date">
                        <p>Start Date</p>
                        <DatePicker
                            className="date-picker"
                            selected={dates.start}
                            onChange={date => setDates(prevDates => ({...prevDates, start: date}))}
                            dateFormat='dd/MM/yyyy'
                            minDate={new Date()}
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
                        />
                        <br />
                    </div>
                    <div className='button-container'>
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </div>
                </Form>
                </Col>
            </Row>
        </div>
    )
}