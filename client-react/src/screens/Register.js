import React from 'react';
import RegisterForm from '../components/register';
import HomeMenu from '../components/homemenu';
import logo from '../logo.png';


const Register = () => (
  
  <div>
    <HomeMenu />

    <p>SHOtime keeps your workouts up to date and available on the go. <br />
    Featuring a workout list and a status feed to help you get stronger.
    </p>

    <RegisterForm />

  </div>
  
);

export default Register;