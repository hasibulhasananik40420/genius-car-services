import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';

const Login = () => {
    const naviagte = useNavigate()
    const location = useLocation()
     
     const from = location.state?.from?.pathname || '/'

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

      if(user){
         naviagte(from , {replace: true})
      }

       const emailRef = useRef('')
       const passwordRef = useRef('')


      const handleSubmit =event=>{
          event.preventDefault()
          const email = emailRef.current.value
          const password = passwordRef.current.value
          signInWithEmailAndPassword(email, password)
      }
        
    
    return (
        <div className='container w-50 mx-auto'>
            <h1 className='text-center text-info mt-2'>please login</h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <p> New to Genius Car ? <Link to='/register' className='text-danger text-decoration-none' >Please Register</Link></p>
        </div>
    );
};

export default Login;