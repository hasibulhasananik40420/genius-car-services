import React from 'react';
import { Link, useParams } from 'react-router-dom';

const ServiceDetail = () => {
    const {serviceId} = useParams()
    return (
        <div>
            <h2> welcome to details</h2>
            <div className='text-center'>
            <Link to='/checkout'> <button className='btn btn-info text-center '>Proceed CheckOut</button></Link>
            </div>
        </div>
    );
};

export default ServiceDetail;