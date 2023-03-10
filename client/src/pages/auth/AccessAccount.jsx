import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../../context/auth';

export default function AccessAccount() {
    //context
    const [auth, setAuth] = useAuth();
    //hooks
    const {token} = useParams();
    const navigate = useNavigate();
        
    useEffect(() => {
        if(token) requestAccess();
    }, [token])

    const requestAccess = async () => {
        try {
            const { data } = await axios.post(`/access-account`, { resetCode: token })
            if(data?.error){
                toast.error(data.error);
            } else { 
                // save data in local storage
                localStorage.setItem('auth', JSON.stringify(data));
                // save data in context
                setAuth(data)
                toast.success("Go to your profile page to update password")
                navigate("/");
            }
        } catch (err) {
            console.log(err)
            toast.error('Something went wrong, try again.')
        }
    }
  return (
    <div className='display-1 d-flex justify-content-center align-items-center vh-100'>Please wait...</div>
  )
}
