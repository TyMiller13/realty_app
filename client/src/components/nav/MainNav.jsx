import React from 'react'
import { NavLink } from "react-router-dom";
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';

export default function MainNav() {
    //context
    const [auth, setAuth] = useAuth();
    // hooks
    const navigate = useNavigate();

    const logout = () => {
        setAuth({user: null, token:"", refreshToken:""});
        localStorage.removeItem("auth")
        navigate("/login")
    };  

    const loggedIn = auth.user !== null && auth.token !== "" && auth.refreshToken !== "";

    const handlePostAdClick = () => {
        if(loggedIn){
            navigate('/ad/create')
        }else{
            navigate('/login')
        }
    }

  return (
    <nav className="nav d-flex justify-content-between p-2 lead">
        <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
        <a className="nav-link pointer" onClick={handlePostAdClick}> Post ad </a>
        {
        !loggedIn ? (
            <>
            <NavLink className="nav-link" to="/login">Login</NavLink>
            <NavLink className="nav-link" to="/register">Register</NavLink>
            </>) : ("")
        }

        {loggedIn ? (<div className='dropdown'>
            <li>
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown">{auth?.user?.name ? auth.user.name : auth.user.username}</a>
                <ul className='dropdown-menu'>
                    <li>
                        <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>  
                    </li>
                    <li>
                        <a onClick={logout} className='nav-link pointer'>Logout</a>
                    </li>
                </ul>
            </li>
        </div>
        ):(""
        )}
    </nav>
  )
}
