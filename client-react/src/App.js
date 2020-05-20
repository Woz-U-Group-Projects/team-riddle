import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Register from './screens/Register';
import Logout from './components/logout';
import Workouts from './screens/Workouts';
import Workoutdetails from './components/workoutdetails';
import UserHome from './screens/UserHome';





class App extends Component {
  

  render() {
    return (
      <Router>
      <div className="App">
   
       <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/welcome" component={UserHome} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/workouts" component={Workouts}/>
          <Route exact path="/workouts/:id" component={Workoutdetails}  />
      </div>
      </div>
      </Router>
    );
  }
}

export default App;
