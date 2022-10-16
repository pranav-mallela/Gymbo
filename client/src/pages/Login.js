import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

export default function Login()
{
    const [formData, setFormData] = React.useState({phone: "", password: ""});
    const [submit, setSubmit] = React.useState(false)

    React.useEffect(() => {
        const trainerLogin = async () => {
            const response = await fetch('api/trainer/login', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = response.json()
            if(!response.ok)
            {
                console.log(json.error)
            }
            else{
                json.then(
                    function (value) {
                        localStorage.setItem('JWT', value.token)
                    },
                    function (error) {
                        console.log(error);
                    }
                );
            }
        }
        trainerLogin()
    }, [submit])

    function handleChange(e)
    {
        const { name, value } = e.target;
        setFormData(prevData => ({...prevData, [name]: value}));
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        setSubmit(true);
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
                    <Button
                        variant="primary"
                        className='login-button'
                        type='submit'
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