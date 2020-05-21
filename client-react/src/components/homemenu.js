import React from 'react';
import Logout from './logout';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import logo from '../logo.png';

const HomeMenu = () => {
  window.onbeforeunload = () => {
    localStorage.clear();
  }

  return (

    <div className="card-container">
      <div className="">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div className="">
        <p><Link to="/register">
          <button>I'M NEW</button>
        </Link>
        </p>
      </div>
      <div className=""><h6>Already a member?</h6>

        <Link to="/login">
          <button>SIGN IN</button>
        </Link>
 </div>




      {/* <Link to="/profile">
        <button>Profile</button>
      </Link> */}
    </div>
  );
};

export default withRouter(HomeMenu);