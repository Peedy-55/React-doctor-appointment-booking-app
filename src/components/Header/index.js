import {Link, Outlet} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import './index.css'
import { useEffect, useState } from 'react';



function Header(){

    const navigate=useNavigate();
    const [isLoggedIn, setIsLoggedIn]=useState(false);

    function logout(){
        // if (JSON.parse(localStorage.getItem('loggedIn'))===false){alert('You have not logged in')}
        // else{
        localStorage.removeItem('user')
        localStorage.setItem('loggedIn', false)
        setIsLoggedIn(false);
        alert('Logged out successfully!')
        navigate('/login')}
        // }
    
    useEffect(()=>{
        setIsLoggedIn(JSON.parse(localStorage.getItem('loggedIn')));

    },[isLoggedIn])
    
    return (
       <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
          <p>Doctor-Appointment-Booking-App</p>
          </Link>

          <div className="navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
             <Link className="nav-link" to="/login">
                <p>Login</p>
             </Link>
             <Link className="nav-link" to="/register">
                <p>Register</p>
             </Link> 
             <Link className="nav-link" to="/view-account">
                <p>View Profile</p>
             </Link>
             <Link className="nav-link" to="/update-account">
                <p>Update Account</p>
             </Link>
             <Link className="nav-link" to="doctors">
                <p>Book Appointment</p>
             </Link>
             <Link className="nav-link" to="/appointments">
                <p>Appointments</p>
             </Link>
             <Link className="nav-link" to='all-doctors'>
                <p>Doctor Database</p>
             </Link>
             <Link className="nav-link" to="all-clients">
                <p>Client Database</p> 
             </Link>
            </div>
          </div>
        
        </div>

        {isLoggedIn===true && <button className="btn btn-outline-danger me-2" onClick={logout} type="button">Logout</button>}
        
      </nav>
      <Outlet/>
       </>
    )
}

export default Header