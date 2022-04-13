import React from 'react';
import { useSignInWithGithub, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../../../firebase.init';
import './SocalLogin.css'
const SocalLogin = () => {
    const naviagte = useNavigate()

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const handleInGoogle = () => {
        signInWithGoogle()
    }
    
    const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);
    const handleWithGithub=()=>{
        signInWithGithub()
    }

    let errorElement ;
    if (error || error1) {
        
        errorElement=  <p className='text-danger'>Error: {error?.message} {error1?.message}</p>
    }
     
    if(user || user1){
        naviagte('/home')
    }
    

    return (
        <div>
            <div className='line '>
                <div></div>
                <p> or</p>
                <div></div>
            </div>
             {errorElement}
            <div className='w-25'>
                <button onClick={()=>handleInGoogle()} className='btn btn-primary'><span className='m-1'><img style={{ width: '20px' }} src="https://img.icons8.com/offices/2x/google-logo.png" alt="" /> Google Log In</span></button>
            </div>
            <div className='mt-4 w-25'>
                <button className='btn btn-danger'><span className=''><img style={{ width: '25px' }} src="https://img.icons8.com/color/2x/facebook-new.png" alt="" />Facebook Login</span></button>
            </div>
            <div className='mt-4 w-25'>
                <button onClick={()=>handleWithGithub()} className='btn btn-danger'><span className='m-2'><img style={{ width: '25px' }} src="https://img.icons8.com/ios-glyphs/2x/github.png" alt="" />Githup Login</span></button>
            </div>
        </div>
    );
};

export default SocalLogin;