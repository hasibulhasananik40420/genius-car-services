import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import SocalLogin from '../Home/SocalLogin/SocalLogin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loaging from '../../Shared/Loading/Loaging';

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

      const [sendPasswordResetEmail, sending,] = useSendPasswordResetEmail( auth );
      
      const resetPassword =async()=>{
        const email = emailRef.current.value
       if(email){
        await sendPasswordResetEmail(email)
        toast('Sent email');
       }
       else{
           toast('Please enter your email')
       }
      }
      let errorElement ;
      if (error) {
          errorElement= <p className='text-danger'>Error: {error?.message}</p>    
      }
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
                    <Form.Control ref={emailRef} type="email" placeholder="Enter email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                   
                    <Form.Control ref={passwordRef} type="password" placeholder="Password" required />
                </Form.Group>
               
                <Button variant="primary w-50 d-block mx-auto " type="submit">
                   Please Login
                </Button>
            </Form>
            {errorElement}
            <p className='mt-2'> New to Genius Car ? <Link to='/register' className='text-danger text-decoration-none' >Please Register</Link></p>
            <p className='mt-2'> Forget Password ? <button onClick={resetPassword} to='/register' className='btn btn-link text-primary text-decoration-none' >Reset Password</button></p>
             <SocalLogin></SocalLogin>
             <ToastContainer />
        </div>
    );
};

export default Login;