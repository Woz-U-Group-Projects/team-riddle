import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import auth from '../components/auth';
import { withRouter } from "react-router-dom";
import UserMenu from '../components/usermenu';

class Workoutdetails extends React.Component {
  state = {
    workoutData: {}
  };
  handleUpdate(event) {
    event.preventDefault()
  }
  handleStatusChange = event => {
    this.setState({ workoutData: event.target.value })
  }
  

  componentWillMount() {
    if (auth() === false) {
      this.props.history.push('/login');
    }
  }
  fetchWorkoutData = () => {
    let workoutId = this.props.match.params.id
    return axios
      .get("http://localhost:3001/users/workouts/" + workoutId)
      .then(res => {
        this.setState({
          workoutData: res.data
        })
      })
  }

  onSubmit = (e) => {
    alert("Updated");
    e.preventDefault();
    const workoutId = this.props.match.params.id;
    console.log(workoutId)
    const workoutName = document.getElementById('workoutName').value;
    const noOfSets = document.getElementById('noOfSets').value;
    const noOfReps = document.getElementById('noOfReps').value;
    const noOfWeights = document.getElementById('noOfWeights').value;
    const workoutStatus = document.getElementById('workoutStatus').value;
    $.ajax({
      url: '/users/workouts/' + workoutId,
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        workoutName: workoutName, noOfSets: noOfSets,
        noOfReps: noOfReps, noOfWeights: noOfWeights, workoutStatus: workoutStatus
      }),
      method: 'PUT', complete: () => window.location="/workouts/"
    })
  }

  onDelete = (e) => {
    alert("Deleted");
    e.preventDefault();
    const workoutId = this.props.match.params.id;
    $.ajax({
      url: '/users/workouts/' + workoutId + '/delete',
      method: 'DELETE', complete: () => window.location = "/workouts/"
    })
  }

  componentDidMount() {
    this.fetchWorkoutData();
  }



  render() {
    console.log(this.state.workoutData);
    if (this.state.workoutData.length === 0) {
      return <div>Failed to fetch data from server</div>;
    } else {

      return <div key={this.state.workoutData.workoutId}>
        <div>
          <div>
            <UserMenu />
          </div>
          <div className="card-container">
            <h3>Editing {this.state.workoutData.workoutName}</h3>
            <b>Update, Change Status, or Delete</b>
            <form onSubmit={this.onSubmit}>
              <div>
                <label htmlFor="workoutName">Workout Name: </label>
                <input type="text" name="workoutName" id="workoutName" defaultValue={this.state.workoutData.workoutName} />
              </div>
              <div>
                <label htmlFor="noOfSets">Number of Sets: </label>
                <input type="text" name="noOfSets" id="noOfSets" defaultValue={this.state.workoutData.noOfSets} />
              </div>
              <div>
                <label htmlFor="noOfReps">Number of Reps: </label>
                <input type="text" name="noOfReps" id="noOfReps" defaultValue={this.state.workoutData.noOfReps} />
              </div>
              <div>
                <label htmlFor="noOfWeights">Number of Weights(lbs) : </label>
                <input type="text" name="noOfWeights" id="noOfWeights" defaultValue={this.state.workoutData.noOfWeights} />
              </div>
              <div>
                <label htmlFor="workoutStatus">Status </label>
                <select name="workoutStatus" id="workoutStatus" defaultValue={this.state.workoutData.workoutStatus}>
                  <option value="pending" >Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <button type="submit" className="btn btn-primary" id="submitButton">Update</button>
                <button onClick={this.onDelete} type="deleteButton" className="btn btn-danger" id="deleteButton">Delete</button>
              </div>

            </form>
          </div>
        </div>
      </div>

    }
  }
}

export default withRouter(Workoutdetails);