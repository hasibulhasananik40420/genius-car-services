import React from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../../../../firebase.init';
import Loaging from '../../../Shared/Loading/Loaging';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequireAuth = ({children}) => {
    const [sendEmailVerification, sending, error] = useSendEmailVerification(auth);

    const location = useLocation()
    const [user , loading] = useAuthState(auth)

     if(loading){
         return <Loaging></Loaging>
     }

    if(!user){
        
        return <Navigate to='/login' state={{from: location}} replace></Navigate>
    }
    
    //  console.log(user);
    if(user.providerData[0]?.providerId ==='password' && !user.emailVerified){
        return <div>
            <h3 className='text-danger'> Your Email is not Verified</h3>
            <h4 className='text-success'> Plese Verifiy your email address</h4>
            
            <button className='btn btn-success'
            onClick={async () => {
            await sendEmailVerification();
            toast('Sent email');
         }}
      >
         Sent Verification email 
      </button>
      <ToastContainer />
        </div>
    }
    return children
};

export default RequireAuth;