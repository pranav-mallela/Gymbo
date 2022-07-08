import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Row, Col } from "react-bootstrap";
import Joinee from "../components/Joinee";
// import data from '../joineeData';
// import { nanoid } from 'nanoid';

export default function Manage()
{
    const [formData, setFormData] = React.useState({name:"", phone:""});
    const [search, setSearch] = React.useState("");
    const [dates, setDates] = React.useState({start:new Date(), end:null});
    const [joineeData, setJoineeData] = React.useState([])
    const [refresh, setRefresh] = React.useState(false);
    // const data = ['Pranav', 'Akshat', 'Prabhav', 'Pratham', 'Ram', 'Bheem', 'Raju', 'Raghav', 'Gautam', 'Abhijith'];
    React.useEffect(()=> {
        const fetchJoineeData = async() => {
            const response = await fetch('/manage');
            const json = await response.json();
            if(response.ok)
            {
                setJoineeData(json);
                // console.log(json);
            }
            else console.log(json.error)
        }
        fetchJoineeData();
    },[refresh])
    function handleChange(e)
    {
        const {name, value} = e.target;
        setFormData(prevData => ({...prevData, [name] : [value]}));
    }
    // console.log(formData);
//////////////////////////////////////////////////////
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newJoinee = {
            name: formData.name.toString(),
            phone: formData.phone.toString(),
            startDate: dates.start,
            endDate: dates.end
        }
        const response = await fetch('/manage', {
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
////////////////////////////////////////////////////
    function handleSearch(e)
    {
        setSearch(e.target.value);
    }

    const searchResults = [];
    for(let i=0;i<joineeData.length;i++)
    {
        if(joineeData[i].name.toLowerCase().includes(search.toLowerCase()))
        {
            searchResults.push(joineeData[i]);
        }
    }
    // console.log(searchResults);
    const resultsEls = searchResults.map(joinee => {
        return <Joinee
                    id={joinee._id}
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
                    <Form.Control type="text" placeholder="Name" name="name" value={formData.name} onChange={handleChange} />
                    <br />
                    <Form.Control type="text" placeholder="Phone number" name="phone" value={formData.phone} onChange={handleChange} />
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