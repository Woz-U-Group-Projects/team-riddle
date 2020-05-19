import React from "react";
import '../workout.min.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import auth from '../components/auth';
import { withRouter } from "react-router-dom";

import jwt_decode from 'jwt-decode';
import { fetchWorkouts, newWorkout } from './userfunctions';
import axios from "axios";


class Workouts extends React.Component {
  constructor() {
    super()
    this.state = {
      workoutData: [],
      userId: '',
      workoutName: '',
      noOfSets: '',
      noOfReps: '',
      noOfWeights: '',
    };


    this.uId = React.createRef();
    this.wName = React.createRef();
    // this.Sets = React.createRef();
    // this.Reps = React.createRef();
    // this.Weights = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  componentWillMount() {
    if (auth() == false) {
      this.props.history.push('/login');
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    fetchWorkouts(decoded.userId)
      .then(res => {
        console.log(res)
        this.setState({ workoutData: res })
        console.log(this.workoutData);
      });
  }
  handleSubmit(event) {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);

    let user = {
      userId: decoded.userId,
      workoutName: this.state.workoutName,
      noOfSets: this.state.noOfSets,
      noOfReps: this.state.noOfReps,
      noOfWeights: this.state.noOfWeights
    }
    newWorkout(user);
  }

  // addWorkout = () => {
  //   const token = localStorage.usertoken;
  //   const decoded = jwt_decode(token);

  //   let user = {
  //     userId: decoded.userId,
  //     workoutName: this.wName.current.value,
  //   }
  //   newWorkout(user);
  // }




  render() {
    console.log(this.state.workoutData);
    if (this.state.workoutData.length === 0) {
      return <div>
        <div className="card-container">
          <h3>No Workouts Tracked Yet!</h3>
          <p> Start Logging in Workouts Below.</p></div>
        <div className="card-container">
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="workoutName">Workout Name: </label>
              <input type="text" name="workoutName" onChange={this.handleChange}></input>
            </div>
            <div>
              <label htmlFor="noOfSets">Number of Sets: </label>
              <input type="number" name="noOfSets" onChange={this.handleChange}></input>
            </div>
            <div>
              <label htmlFor="noOfReps">Number of Reps: </label>
              <input type="number" name="noOfReps" onChange={this.handleChange}></input>
            </div>
            <div>
              <label htmlFor="noOfWeights">Number of Weights(lbs): </label>
              <input type="number" name="noOfWeights" onChange={this.handleChange}></input>
            </div>

            <div>
              <button type="submit" value="Submit" >Create Workout</button>
            </div>
          </form>
        </div>

      </div>
        ;
    }

    const workout = this.state.workoutData.map(workouts => (

      <div key={workouts.workoutId}>

        <Link to={{ pathname: `workouts/${workouts.workoutId}` }}>
          <p><b>{workouts.workoutName}</b>: {workouts.workoutStatus}</p>
        </Link>
      </div>




    ));
    return <div>
      <div className="card-container">
        <h2>Workouts To Do</h2>
        <div className="workout-column">{workout}</div>
      </div>
      <br /> <br />
      <div className="card-container">
        <form onSubmit={this.handleSubmit}>
          <h3>Add A Workout</h3>
          <div>
            <label htmlFor="workoutName">Workout Name: </label>
            <input type="text" name="workoutName" onChange={this.handleChange}></input>
          </div>
          <div>
            <label htmlFor="noOfSets">Number of Sets: </label>
            <input type="number" name="noOfSets" onChange={this.handleChange} ></input>
          </div>
          <div>
            <label htmlFor="noOfReps">Number of Reps: </label>
            <input type="number" name="noOfReps" onChange={this.handleChange}></input>
          </div>
          <div>
            <label htmlFor="noOfWeights">Number of Weights(lbs): </label>
            <input type="number" name="noOfWeights" onChange={this.handleChange} ></input>
          </div>

          <div>
            <button type="submit" value="Submit">Create Workout</button>
          </div>
        </form>
      </div>

    </div>;
  }
}

export default withRouter(Workouts);

