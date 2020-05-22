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
      
      <ul className="nav nav-pills bg-dark">
        <li className="nav-item">
          <a className="navbar-brand"><img id="logo" src={logo} className="App-logo" alt="logo" style={{width:"2.5em", height:"2.5em"}}/></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/welcome">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/profile">My Profile</a>
        </li>
        <li className="nav-item">
          <a className="nav-link " href="/workouts">Workouts</a>
        </li>
        <li className="nav-item">
          <a className="nav-link " href="/logout">Logout</a>
        </li>

      </ul>
    </div>
  );
};
export default withRouter(UserMenu);