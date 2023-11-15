import axios from'axios'
// import { set } from 'mongoose';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { NavLink, useNavigate } from 'react-router-dom';
import { useStore } from '../store';

 function Auth({islogin, setuser}) {
    const {setState}  = useStore()
     const [errormsg, seterrmsg] = useState('')
     const navigate = useNavigate()
     const initialformdata ={
         username:'',
         email:'',
         password: ''
        }
        const [formdata,setformdata] = useState(initialformdata)
    const handleinputchange =(e)=>{
        setformdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }
    const handlesubmit = async (e) =>{
        e.preventDefault()
        try{
        const route = islogin ? 'login' : 'register'
       const res =  await axios.post(`/auth/${route}`, formdata)
       setformdata({ ...initialformdata})
        console.log(res.data)
        setState((olddata)=>({
            ...olddata,
            user:res.data}))
        seterrmsg('')
        navigate('/')
    }catch(err){
        console.log(err)
        seterrmsg(err.response.data.message)
    }
        
    }
    console.log(islogin)
    return (
        <>
            <h1>{islogin ? 'log in':'register'}</h1>
            {/* <p className='text-center text-danger'>error message</p> */}
            <Form onSubmit={handlesubmit}>
               {islogin ? <> 
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" onChange={handleinputchange} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    {errormsg && 
                    <Form.Text className="text-center text-danger">
                    error message
                    </Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control  name="password" onChange={handleinputchange} type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
               </> : 
                <>
                <Form.Group className="mb-3" controlId="formBasicusername">
                    <Form.Label>username</Form.Label>
                    <Form.Control name="username" onChange={handleinputchange} type="text" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" onChange={handleinputchange} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                    {errormsg && 
                    <Form.Text className="text-center text-danger">
                    error message
                    </Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control  name="password" onChange={handleinputchange} type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
               </> }
                <div className='d-flex auth-controls mb-3'>
                <NavLink to="/register">register</NavLink>
                <span>or</span>
                <NavLink to="/login">login</NavLink>
                </div>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )

}

export default Auth