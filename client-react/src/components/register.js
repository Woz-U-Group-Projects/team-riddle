import React from 'react';
import { register } from './userfunctions';
import { withRouter } from "react-router-dom";
import Axios from 'axios';

class RegisterForm extends React.Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        }
        this.fName = React.createRef();

        this.lName = React.createRef();

        this.useremail = React.createRef();

        this.pwd = React.createRef();

        this.handleChange = this.handleChange.bind(this)
        // this.onSubmit = this.onSubmit.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    addUser = () => {
        Axios.post("http://localhost:3001/users/register", {
            firstName: this.fName.current.value,
            lastName: this.lName.current.value,
            email: this.useremail.current.value,
            password: this.pwd.current.value
        }).then(response => {
            console.log("user created");
            this.fName.current.value = "";
            this.lName.current.value = "";
            this.useremail.current.value = "";
            this.pwd.current.value = "";
            this.props.history.push('/profile');
        })

    }

    /* onSubmit(event) {
        event.preventDefault()
        let user ={
            firstName: "tyler",
            lastName: "tyler",
            email: "tyler",
            password: "tyler"
        };
        if (this.state.firstName && this.state.lastName && this.state.email && this.state.password) {

            register(user).then(res => {
                if (res) {

                    this.props.history.push('/profile');
                }
            }).catch(err => {
                console.log(err)
            })
        }
    } */
    render() {
        return (
            <div className="card-container">
                <h3>Register</h3>
                {/* <form id="signup" name="signup" noValidate >  */}
                <div>
                    <label htmlFor="firstName">First Name: </label>
                    <input type="text" name="firstName" ref={this.fName} required></input>
                </div>
                <div>
                    <label htmlFor="lastName">Last Name: </label>
                    <input type="text" name="lastName" ref={this.lName} required></input>
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="text" name="email" ref={this.useremail} required></input>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="text" name="password" ref={this.pwd} required></input>
                </div>
                <div>
                    <button type="button" onClick={this.addUser} >Submit</button>
                </div>
                {/* </form> */}
            </div>
        )
    }
}
export default withRouter(RegisterForm);