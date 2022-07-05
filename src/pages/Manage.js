import React from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Row, Col } from "react-bootstrap";
import Joinee from "../components/Joinee";
import data from '../data';
import { nanoid } from 'nanoid';
// import DatePicker from "react-bootstrap-date-picker";

export default function Manage()
{
    const [formData, setFormData] = React.useState({name:"", phone:"", startDate:"", endDate: ""});
    const [search, setSearch] = React.useState("");
    // const data = ['Pranav', 'Akshat', 'Prabhav', 'Pratham', 'Ram', 'Bheem', 'Raju', 'Raghav', 'Gautam', 'Abhijith'];
    function handleChange(e)
    {
        const {name, value} = e.target;
        setFormData(prevData => ({...prevData, [name] : [value]}));
    }
    // console.log(formData);
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
        <div className="manage-container">
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
                    <Form.Control type="text" placeholder="Start date" name="startDate" onChange={handleChange} />
                    <br />
                    <Form.Control type="text" placeholder="End date" name="endDate" onChange={handleChange} />
                    <br />
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                </Form>
                </Col>
            </Row>
        </div>
    )
}

/* <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */

