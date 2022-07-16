import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

export default function Login({ trainerID, setTrainerID })
{
    const [formData, setFormData] = React.useState({phone: "", password: ""});
    const [trainerData, setTrainerData] = React.useState([]);

    React.useEffect(() => {
        const fetchAllTrainers = async () => {
            const response = await fetch('/api/trainer');
            const json = await response.json();
            if(!response.ok)
                console.log(json.error);
            else
                setTrainerData(json);
        }
        fetchAllTrainers();
    },[])

    function handleChange(e)
    {
        const { name, value } = e.target;
        setFormData(prevData => ({...prevData, [name]: value}));
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        for(let i=0;i<trainerData.length;i++)
        {
            if(formData.phone === trainerData[i].phone && formData.password === trainerData[i].password)
            {
                setTrainerID(trainerData[i]._id);
                // window.location.href='/manage';
                break;
            }
        }
        console.log(trainerID);
    }

    return (
        <div className='login-container'>
            <Form className='container login-form' onSubmit={handleSubmit}>
                <h2>
                    Login
                    <span className="material-symbols-outlined">login</span>
                </h2> 
                <Form.Control 
                    type="text" 
                    placeholder="Phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                />
                <br />
                <Form.Control 
                    type="password"
                    placeholder="Password" 
                    name="password" 
                    value={formData.password} 
                    onChange={handleChange}
                />
                <br />
                <div className='center'>
                   <Link to='/'>
                        <Button
                            variant="primary"
                            className='login-button'
                            type='submit'
                        >
                            Login
                        </Button>
                    </Link>
                </div>
                <br />
                <p className='center'>New Trainer? <Link to='/register'>Register here</Link></p>
            </Form>
        </div>
    )
}