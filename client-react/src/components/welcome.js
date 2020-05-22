import React from 'react';
import jwt_decode from 'jwt-decode';
import auth from '../components/auth';
import { withRouter } from "react-router-dom";
import { countWorkouts } from "../components/userfunctions";

import Logout from './logout';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from '../logo.png';

class WelcomeComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            workoutData: [],
            userId: '',
        }

    }
    componentWillMount() {
        if (auth() === false) {
            this.props.history.push('/login');
        }
    }


    componentDidMount() {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        this.setState({
            firstName: decoded.firstName,
        });
        countWorkouts(decoded.userId)
            .then(res => {
                console.log(res)
                this.setState({ workoutData: res })
                console.log(this.workoutData);
            });
    }


    render() {
        const workoutsToRender = this.state.workoutData.filter(workouts => workouts.workoutId)
        const numRows = workoutsToRender.length
        return (


     
                <div className="jumbotron bg-dark text-white" style={{height:"150vh"}}>
                    <h1 className="display-5
                     text-center">Welcome, {this.state.firstName} <span role="img" aria-label="hello">👋</span></h1>
                    <p className="lead text-center">
                        You have {numRows} Workouts Logged<br /></p>
                    <hr className="my-4"></hr>
                    <p className="lead text-center"><h2><i>Stay fit from the comfort of your home!</i></h2></p>
                    <p className="lead">
                        <a className="btn btn-primary btn-lg btn-block my-2" href="/workouts" role="button">Let's Workout</a>
                    </p>
                    
                </div>
          
        )

    }
}
export default withRouter(WelcomeComponent);



