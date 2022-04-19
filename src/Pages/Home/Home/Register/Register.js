import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../../../firebase.init';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import './Register.css'
import SocalLogin from '../SocalLogin/SocalLogin';
import Loaging from '../../../Shared/Loading/Loaging';
const Register = () => {
     const [agree , setAgree] = useState(false)
     const naviagte = useNavigate()
     
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth ,{sendEmailVerification: true});

      const [updateProfile, updating, updatedError] = useUpdateProfile(auth);

      if(loading){
        return <Loaging></Loaging>
     }

      if(user){
        console.log(user);
      }

     const handleRegister=async  event =>{
         event.preventDefault()
         const name = event.target.name.value;
         const email = event.target.email.value;
         const password = event.target.password.value;

         await createUserWithEmailAndPassword(email , password)
        //  updated profil
         await updateProfile({ displayName: name})
         console.log('Updated profile')
         naviagte('/home')
         
     }

    return (
        <div className='register'>
             <h2>Please register</h2>
             <form onSubmit={handleRegister}>
             <input type="text" placeholder='Enter Name' />
              <input type="email" name="email" id='' placeholder='Email' required/>
              <input type="password" name="password" id='' placeholder='password' required/>
              {loading && <p>Loading..</p>}
               <input onClick={()=> setAgree(!agree)} type="checkbox" name="terms" id="terms" />
               <label className={`ps-2 ${agree ? '' : 'text-danger'}`} htmlFor="terms"> Accept Terms and Condation</label>
              <input disabled={!agree} className='w-50 mx-auto bg-info border-0 rounded mt-2' type="submit" value="Register" />
             </form>
             <p> Already have an account ? <Link to='/login' className='text-danger text-decoration-none' >Please Login</Link></p>
              
               <SocalLogin></SocalLogin>
        </div>
    );
};

export default Register;