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

  render() {
    console.log(this.state.workoutData);
    if (this.state.workoutData.length === 0) {
      return <div>
        <div class="container">
          <div class="row">
            <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div class="card card-signin my-5">
                <div class="card-body">
                  <h5 class="card-title text-center">No Workouts Tracked Yet!</h5>
                  <p className="text-center">Start Logging in Workouts Below.</p>
                  <hr className="my-4"></hr>
                  <form class="form-signin" onSubmit={this.handleSubmit}>
                    <div class="form-label-group">
                      <label htmlFor="workoutName">Workout Name: </label>
                      <input type="text" name="workoutName" onChange={this.handleChange}></input>

                    </div>

                    <div class="form-label-group">
                      <label htmlFor="noOfSets">Number of Sets: </label>
                      <input type="number" name="noOfSets" onChange={this.handleChange} ></input>
                    </div>

                    <div class="form-label-group">
                      <label htmlFor="noOfReps">Number of Reps: </label>
                      <input type="number" name="noOfReps" onChange={this.handleChange}></input>
                    </div>
                    <div class="form-label-group">
                      <label htmlFor="noOfWeights">Number of Weights(lbs): </label>
                      <input type="number" name="noOfWeights" onChange={this.handleChange} ></input>
                    </div>

                    <button class="btn btn-lg btn-google btn-block text-uppercase" type="submit" value="Submit">Create Workout</button>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="card-container">
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
        </div> */}

      </div>

        ;

    }

    const workout = this.state.workoutData.map(workouts => (

      <div key={workouts.workoutId}>
        <div className="text-success text-center"><Link to={{ pathname: `/workouts/${workouts.workoutId}` }}>
            <p><b>{workouts.workoutName}</b>: {workouts.workoutStatus}</p>
          </Link>

        </div>
        {/* <Link to={{ pathname: `/workouts/${workouts.workoutId}` }}>
          <p><b>{workouts.workoutName}</b>: {workouts.workoutStatus}</p>
        </Link> */}
      </div>

    ));

    const workoutsToRender = this.state.workoutData.filter(workouts => (

      <div key={workouts.workoutId}>
      </div>
    ));
    const numRows = workoutsToRender.length

    return <div>



      <div className="card-container">
        <div className="text-center"><h2>Workouts To Do</h2></div>
        {/* Number of Workouts = {numRows} */}
        <div className="card-container text-center">Click a workout below to edit</div>
        <div>
        </div>
        <div className="workout-column">{workout}</div>
      </div>
      <br /> <br />
      <div className="card-container">
        {/* <form onSubmit={this.handleSubmit}> */}
        {/* <h3>Add A Workout</h3>
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
          </div> */}
        {/* 
          <div>
            <button type="submit" value="Submit">Create Workout</button>
          </div> */}
        {/* </form> */}
      </div>
      <div class="container">
        <div class="row">
          <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="card card-signin my-5">
              <div class="card-body">
                <h5 class="card-title text-center">Add a Workout</h5>
                <form class="form-signin" onSubmit={this.handleSubmit}>
                  <div class="form-label-group">
                    <label htmlFor="workoutName">Workout Name: </label>
                    <input type="text" name="workoutName" onChange={this.handleChange}></input>

                  </div>

                  <div class="form-label-group">
                    <label htmlFor="noOfSets">Number of Sets: </label>
                    <input type="number" name="noOfSets" onChange={this.handleChange} ></input>
                  </div>

                  <div class="form-label-group">
                    <label htmlFor="noOfReps">Number of Reps: </label>
                    <input type="number" name="noOfReps" onChange={this.handleChange}></input>
                  </div>
                  <div class="form-label-group">
                    <label htmlFor="noOfWeights">Number of Weights(lbs): </label>
                    <input type="number" name="noOfWeights" onChange={this.handleChange} ></input>
                  </div>

                  <button class="btn btn-lg btn-google btn-block text-uppercase" type="submit" value="Submit">Create Workout</button>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>;
  }
}

export default withRouter(Workouts);

