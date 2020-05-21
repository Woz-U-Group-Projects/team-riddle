import React from 'react';
import LoginForm from '../components/login';
import HomeMenu from '../components/homemenu';
import logo from '../logo.png';

const Login = () => (
  <div>
    <div>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
    <div>
      <LoginForm />
    </div>
    <div>Not a Member Yet? <br/>
      <a href="http://localhost:3000/register">Sign up now!</a>
    </div>
  </div>
);

export default Login;