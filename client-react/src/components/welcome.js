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
            <div>
                <div className="card-container">
                    <h2>Hey, {this.state.firstName} <span role="img" aria-label="hello">👋</span></h2>
                         You have {numRows} Workouts Logged<br />

                        <hr></hr>

                        <h2><i>Stay fit from the comfort of your home!</i></h2>

                </div>

            </div>
        )

    }
}
export default withRouter(WelcomeComponent);



