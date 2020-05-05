import React from "react";
import axios from "axios";
import '../workout.min.css'
class Workout extends React.Component {
  constructor(props) {
    super(props);
    this.state = { workouts: [] };
    this.workoutName = React.createRef();
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    // Java Spring Boot uses port 8080
    //let url = "http://localhost:8080/workouts";

    // C# dotnetcore uses port 5000
    //let url = "http://localhost:5000/projects";

    // Express uses port 3001 (react uses 3000)
    let url = "http://localhost:3001/workouts";
    axios.get(url).then(response => this.setState({ workouts: response.data }));
  };

  addWorkout = () => {
    let url = "http://localhost:3001/workouts";
    axios.post(url, { name: this.workoutName.current.value }).then(response => {
      // refresh the data
      this.getData();
      // empty the input
      this.workoutName.current.value = "";
    });
  };


  render() {
    return (
      <div>
        <h3>List of Workouts </h3>
        <input ref={this.workoutName} />
        <button type="button" className="btn btn-primary" onClick={this.addWorkout}>add</button>
        <ul>
          {this.state.workouts.map(p => (
            <li key={p.workoutid}>
              {p.name} : { p.complete ? "complete" : "not complete" } <button type="button" className="btn btn-success">Complete</button><button type="button" className="btn btn-danger">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Workout;
