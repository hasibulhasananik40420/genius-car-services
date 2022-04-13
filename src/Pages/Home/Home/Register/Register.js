import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../../firebase.init';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import './Register.css'
import SocalLogin from '../SocalLogin/SocalLogin';
const Register = () => {
     const naviagte = useNavigate()
     
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

      if(user){
        naviagte('/home')
      }

     const handleRegister= event =>{
         event.preventDefault()
         const name = event.target.name.value;
         const email = event.target.email.value;
         const password = event.target.password.value;
         createUserWithEmailAndPassword(email , password)
     }

    return (
        <div className='register'>
             <h2>Please register</h2>
             <form onSubmit={handleRegister}>
             <input type="text" placeholder='Enter Name' />
              <input type="email" name="email" id='' placeholder='Email' required/>
              <input type="password" name="password" id='' placeholder='password' required/>
              {loading && <p>Loading..</p>}
               <input type="checkbox" name="terms" id="terms" />
               <label htmlFor="terms"> Accept Terms and Condation</label>
              <input className='w-50 mx-auto bg-success border-0 rounded mt-2' type="submit" value="Register" />
             </form>
             <p> Already have an account ? <Link to='/login' className='text-danger text-decoration-none' >Please Login</Link></p>
              
               <SocalLogin></SocalLogin>
        </div>
    );
};

export default Register;