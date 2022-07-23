import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Equipment from '../components/Equipment';
import About from '../components/About';

export default function Machines()
{
    const trainerID = window.localStorage.getItem("trainerID");
    const [formData, setFormData] = React.useState({machine: "", quantity: 0});
    const [search, setSearch] = React.useState("");
    const [machineData, setMachineData] = React.useState([]);
    // const [refresh, setRefresh] = React.useState(false);

    React.useEffect(() => {
        const fetchTrainerMachines = async () => {
            const response = await fetch('/api/trainer/'+trainerID);
            const json = await response.json();
            if(!response.ok)
                console.log(json.error);
            else
                setMachineData(json.machines);
        }
        fetchTrainerMachines();
    },[])

    // React.useEffect(() => {
    //     const fetchMachines = async () => {
    //         const response = await fetch('/api/machines');
    //         const json = await response.json();
    //         if(!response.ok) console.log(json.error);
    //         else setMachineData(json);
    //     }
    //     fetchMachines();
    // },[refresh])

    function handleChange(e)
    {
        const {name, value} = e.target;
        setFormData(prevData => ({...prevData, [name] : [value]}));
        if(name === 'machine') setSearch(value);
    }

    function handleResultClick(e)
    {
        setFormData(prevData => ({...prevData, machine:e.target.innerHTML}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //if name matches, modify or delete
        //Modify: for loop new array, with updated values
        //Delete: name -> filter out of array
        //else if no match, add to array
        let changedMachine = {
            name: formData.machine, 
            quantity: parseInt(formData.quantity[0])
        };
        let  deleteMachine = (changedMachine.quantity < 0);
        const newMachineData = [];
        for(let i=0;i<machineData.length;i++)
        {
            if(machineData[i].name === formData.machine)
            {
                if(machineData[i].quantity + parseInt(formData.quantity[0]) > 0)
                {
                    deleteMachine = false;
                    changedMachine.quantity = machineData[i].quantity + parseInt(formData.quantity[0]);
                }
                else deleteMachine = true;
            }
            else
                newMachineData.push(machineData[i]);
        }
        if(deleteMachine) setMachineData(newMachineData);
        else setMachineData(changedMachine, ...newMachineData);
    }
    const sendToDB = async () => {
        const response = await fetch('/api/trainer/'+trainerID+'/machine', {
            method: 'PATCH',
            body: JSON.stringify(machineData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if(!response.ok) console.log(json.error);
        else{
            setFormData({machine: "", quantity: 0});
            // setRefresh(prev => !prev);
        }
    }
    React.useEffect(() => {
        if(machineData.length !== 0)
            sendToDB();
    }, [machineData])

    const searchResults = [];
    for(let i=0;i<machineData.length;i++)
    {
        if(search !== "" && machineData[i].name.toLowerCase().includes(search.toLowerCase()))
        {
            searchResults.push(machineData[i]);
        }
    }

    const machineEls = machineData.map(machineObj => {
        return <Equipment
                    _id={machineObj._id}
                    machine={machineObj.name}
                    quantity={machineObj.quantity}
                />
    })

    const resultEls = searchResults.map(machineObj => {
        return <div 
                    className="list-hover list-item"
                    onClick={handleResultClick}
                >{machineObj.name}</div>
    })
    const aboutMachines = "It keeps track of the quantity of the different equipment in your gym. Clicking 'Manage' updates the quantity by the quantity entered."

    return(
        <div className="page-container">
            <About
                aboutText={aboutMachines}
            />
            <Row>
                <Col xs={12} md={6}>
                    <Form className="container" onSubmit={handleSubmit}>
                        <h2>Manage Equipment</h2>
                        <Form.Label>Machine</Form.Label>
                        <Form.Control type="text" placeholder="Machine" name="machine" value={formData.machine} onChange={handleChange} />
                        {formData.machine != "" && <div className="container">
                            {resultEls}
                        </div>}
                        <br />
                        <Form.Label>Quantity</Form.Label>
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