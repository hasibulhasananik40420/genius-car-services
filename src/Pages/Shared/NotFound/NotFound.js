import React from 'react';
import page from '../../../images/index.png'
const NotFound = () => {
    return (
        <div className=' '>
             <h2 className='text-primary text-center'> Page Not Found ..</h2>
            <img className='w-100  txt-center' src={page} alt="" />
        </div>
    );
};

export default NotFound;