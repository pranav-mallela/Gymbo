import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Equipment from '../components/Equipment'
import data from '../machineData'
import { nanoid } from 'nanoid'

export default function Machines()
{
    const [formData, setFormData] = React.useState({machine: "", quantity: 0});
    const [search, setSearch] = React.useState("");
    function handleChange(e)
    {
        const {name, value} = e.target;
        setFormData(prevData => ({...prevData, [name] : [value]}));
        if(name == 'machine') setSearch(value);
    }
    function handleResultClick(e)
    {
        setFormData(prevData => ({...prevData, machine:e.target.innerHTML}))
    }
    // console.log(formData);
    const searchResults = [];
    for(let i=0;i<data.length;i++)
    {
        if(search != "" && data[i].machine.toLowerCase().includes(search.toLowerCase()))
        {
            searchResults.push(data[i]);
        }
    }
    // console.log(searchResults);
    const machineEls = data.map(machineObj => {
        return <Equipment
                    id={nanoid()}
                    machine={machineObj.machine}
                    quantity={machineObj.quantity}
                />
    })

    const resultEls = searchResults.map(machineObj => {
        return <div 
                    className="list-hover list-item"
                    onClick={handleResultClick}
                >{machineObj.machine}</div>
    })

    return(
        <div className="page-container">
            <Row>
                <Col xs={12} md={6}>
                    <Form className="container">
                        <h2>Manage Equipment</h2>
                        <Form.Control type="text" placeholder="Machine" name="machine" value={formData.machine} onChange={handleChange} />
                        <div className="container">
                            {resultEls}
                        </div>
                        <br />
                        <Form.Control type="number" placeholder="Quantity" name="quantity" value={formData.quantity} onChange={handleChange} />
                        <br />
                        <div className='button-container'>
                            <Button variant="primary" type="submit">
                                Manage
                            </Button>
                        </div>
                    </Form>
                </Col>
                <Col xs={12} md={6}>
                    <div className="machine-list-container container">
                        {machineEls}
                    </div>
                </Col>
            </Row>
        </div>
    )
}