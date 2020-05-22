import React from 'react';
import LoginForm from '../components/login';
import NavMenu from '../components/navmenu';
import logo from '../logo.png';

const Login = () => (
  <div>
    <div>
      <NavMenu />
    </div>
    <div>
      <LoginForm />
    </div>

    <p className="lead text-center"><h6>Not a Member Yet?</h6></p>
          

      <a href="http://localhost:3000/register" className="lead text-center"> <h3>Sign up now!</h3></a>


  </div>

);

export default Login;