import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

export default function Login()
{
    function handleChange(e)
    {
        const { name, value } = e.target;
        setFormData(prevData => ({...prevData, [name]: value}));
    }

    const [formData, setFormData] = React.useState({phone: "", password: ""});
    return (
        <div className='login-container'>
            <Form className='container login-form'>
                <h2>
                    Login
                    <span class="material-symbols-outlined">login</span>
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
                    <Button
                        variant="primary"
                        className='login-button'
                    >
                        Login
                    </Button>
                </div>
                <br />
                <p className='center'>New Trainer? <Link to='/register'>Register here</Link></p>
            </Form>
        </div>
    )
}