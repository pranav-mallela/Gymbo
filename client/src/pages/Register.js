import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom'

export default function Register()
{
    const [formData, setFormData] = React.useState({name: "", phone: "", password: "", confirmPassword: ""});
    const [displayError, setDisplayError] = React.useState({trainerAlreadyExists: false, incorrectLength: false, containsNonDigits: false, passwordsDoNotMatch: false});
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

    React.useEffect(() => {
        let cnt=0;
        for(let i=0;i<trainerData.length;i++)
        {
            if(formData.phone.toString() === trainerData[i].phone)
            {
                setDisplayError(prevError => ({...prevError, trainerAlreadyExists: true}));
            }
            else cnt++;
        }
        if(cnt === trainerData.length) setDisplayError(prevError => ({...prevError, trainerAlreadyExists: false}));
        setDisplayError(prevError => ({...prevError, incorrectLength: (formData.phone.toString().length !== 10)}));
        setDisplayError(prevError => ({...prevError, containsNonDigits: !(/^\d+$/.test(formData.phone.toString()))}));
    },[formData.phone])

    function handleChange(e)
    {
        const { name, value } = e.target;
        setFormData(prevData => ({...prevData, [name]: value}));
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        if(displayError.containsNonDigits || displayError.incorrectLength || displayError.trainerAlreadyExists)
            return;
        else if(formData.password !== formData.confirmPassword)
        {
            setDisplayError(prevError => ({...prevError, passwordsDoNotMatch: true}));
            return;
        }
        const registerTrainer = async () => {
            const newTrainer = {
                name: formData.name.toString(),
                phone: formData.phone.toString(),
                password: formData.password.toString(),
            }
            const response = await fetch('/api/trainer', {
                method: 'POST',
                body: JSON.stringify(newTrainer),
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
            else
            {
                setDisplayError({trainerAlreadyExists: false, incorrectLength: false, containsNonDigits: false, passwordsDoNotMatch: false});
                setFormData({name: "", phone: "", password: "", confirmPassword: ""})
                window.location.href = '/manage';
            }
        }
        registerTrainer();
    }
    console.log(displayError);

    return (
        <div className='login-container center'>
            <Form className='container login-form' onSubmit={handleSubmit}>
                <h2>
                    Register as a Trainer
                    <span class="material-symbols-outlined">account_circle</span>
                </h2> 
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
                <Form.Control 
                    type="password"
                    placeholder="Confirm Password" 
                    name="confirmPassword" 
                    value={formData.confirmPassword} 
                    onChange={handleChange}
                />
                <br />
                <div className='center'>
                    <Button
                        variant="primary"
                        className='login-button'
                        type='submit'
                    >
                        Register
                    </Button>
                </div>
                <br />
                <p className='center'>Already registered? <Link to='/'>Login here</Link></p>
            </Form>
        </div>
    )
}