import React from 'react';
import Sidebar from '../../../components/nav/Sidebar';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function CreateAd() {
    //usestates for sell and rent
    const [sell, setSell] = useState(false);
    const [rent, setRent] = useState(false);
    // hooks
    const navigate = useNavigate();

    const handleSell = () => {
        setSell(true);
        setRent(false);
    }

    const handleRent = () => {
        setRent(true);
        setSell(false);
    }

  return (
    <div>
        <h1 className="display-1 bg-primary text-white p-1">Create Ad</h1>
        <Sidebar />
        <div className="d-flex justify-content-center align-items-center vh-100" >
            <div className="col-lg-6">
                <button onClick={handleSell} className='btn btn-primary btn-lg col-12 p-5'><span className='h2'> Sell </span></button>
                
                {sell && (
                    <div className="my-2">
                        <button onClick={() => navigate('/ad/create/sell/House')} className='btn btn-info border p-5 col-6'>House</button>
                        <button onClick={() => navigate('/ad/create/sell/Land')} className='btn btn-info border p-5 col-6'>Land</button>
                    </div>
                )}
            </div>
            <div className="col-lg-6">
                <button onClick={handleRent} className='btn btn-primary btn-lg col-12 p-5'><span className='h2'> Rent </span></button>
                {rent && (
                    <div className="my-2">
                        <button onClick={() => navigate('/ad/create/rent/House')} className='btn btn-info border p-5 col-6'>House</button>
                        <button onClick={() => navigate('/ad/create/rent/Land')} className='btn btn-info border p-5 col-6'>Land</button>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}
