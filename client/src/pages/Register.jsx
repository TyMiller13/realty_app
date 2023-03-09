import React from 'react';
import { useState } from 'react';
import axios from 'axios';
// import { API } from '../config';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    //hooks
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            // console.log(email,password);
            const {data} = await axios.post(`/pre-register`, { email, password });
            if(data?.error){
                toast.error(data.error);
                setLoading(false);
            } else {
                toast.success("Please check your email and click the link to activate your account");
                setLoading(false);
                navigate("/")
            }
            console.log(data);
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong, try again");
            setLoading(false);
        }
    }

  return (
    <div>
        <h1 className="display-1 bg-primary text-light p-1 text-center">Register</h1>
        <div className="container">
            <div className="row">
                <div className="col-lg-4 offset-lg-4">
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Enter your Email" className="form-control" required autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Enter password" className="form-control" required autoFocus value={password} onChange={(e) => setPassword(e.target.value)} />
                    
                        <button disabled={loading} className="btn btn-primary col-12 mb-4"> 
                        {loading ? "Setting up account..." : "Register" }</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
