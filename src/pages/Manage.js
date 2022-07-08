import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Row, Col } from "react-bootstrap";
import Joinee from "../components/Joinee";
import data from '../joineeData';
import { nanoid } from 'nanoid';

export default function Manage()
{
    const [formData, setFormData] = React.useState({name:"", phone:""});
    const [search, setSearch] = React.useState("");
    const [dates, setDates] = React.useState({start:new Date(), end:null});
    // const data = ['Pranav', 'Akshat', 'Prabhav', 'Pratham', 'Ram', 'Bheem', 'Raju', 'Raghav', 'Gautam', 'Abhijith'];
    function handleChange(e)
    {
        const {name, value} = e.target;
        setFormData(prevData => ({...prevData, [name] : [value]}));
    }
    console.log(formData);
    function handleSubmit()
    {
        //send profile to DB
    }
    function handleSearch(e)
    {
        setSearch(e.target.value);
    }

    const searchResults = [];
    for(let i=0;i<data.length;i++)
    {
        if(data[i].name.toLowerCase().includes(search.toLowerCase()))
        {
            searchResults.push(data[i]);
        }
    }
    // console.log(searchResults);
    const resultsEls = searchResults.map(joinee => {
        return <Joinee
                    id={nanoid()}
                    name={joinee.name}
                    phone={joinee.phone}
                />
    })

    return (
        <div className="page-container">
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
                <Form className="container" onSubmit={handleSubmit}>
                    <h2>Add joinee</h2>
                    <Form.Control type="text" placeholder="Name" name="name" onChange={handleChange} />
                    <br />
                    <Form.Control type="text" placeholder="Phone number" name="phone" onChange={handleChange} />
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