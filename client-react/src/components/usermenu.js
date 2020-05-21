import React from 'react';
import Logout from './logout';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import logo from '../logo.png';

const UserMenu = () => {
    window.ondeforeunload = () => {
      localStorage.clear();
    }
    
    return (
  
    <div>
        
      <img src={logo} className="App-logo" alt="logo" />
       <Link to="/welcome">
        <button>Home</button>
      </Link>
      <Link to="/profile">
        <button>My Profile</button>
      </Link>
      <Link to="/workouts">
        <button>Workouts</button>
      </Link>
      <Logout />
    </div>
    );
  };
  export default withRouter(UserMenu);