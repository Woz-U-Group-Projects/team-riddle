import React from "react";
import axios from "axios";
import "../task.min.css";
class Vitals extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vitals: [],
      vitalId: "",
      vitalName: "",
      heartRate: "",
      temperature: "",
      no2levels: ""
    };
    //this.vitalName = React.createRef();
    //create new references for each property
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    // Java Spring Boot uses port 8080
    //let url = "http://localhost:8080/tasks";

    // C# dotnetcore uses port 5000
    //let url = "http://localhost:5000/projects";

    // Express uses port 3001 (react uses 3000)

    //replace url with the vitals route

    //replace all tasks with vitals
    let url = "http://localhost:3001/vitals";
    axios.get(url).then(response => this.setState({ vitals: response.data }));
  };

  addTask = () => {
    let url = "http://localhost:3001/vitals";
    axios
      .post(url, {
        //replace with vitals properties and their current values
        name: this.vitalName.current.value
        //the rest of the properties will go here
      })
      .then(response => {
        // refresh the data
        this.getData();
        // empty the inputs
        //do this for all inputs
        this.vitalName.current.value = "";
      });
  };

  render() {
    return (
      <div>
        <h3>List of Vitals </h3>
        <input ref={this.vitalName} />
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.addVitals}
        >
          add
        </button>
        <ul>
          {this.state.tasks.map(p => (
            <li key={p.vitalId}>
              {p.vitalsId} : Heart Rate: {p.heartRate}
              {p.vitalsId} : Temperature: {p.temperature}
              {p.vitalsId} : O2levels: {p.o2levels}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Vital;
