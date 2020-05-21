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
            userName: '',
            password: '',
            weight: '',
            height: '',
            birthday: '',

        }
        this.fName = React.createRef();
        this.lName = React.createRef();
        this.useremail = React.createRef();
        this.usrName = React.createRef();
        this.pwd = React.createRef();
        this.wt = React.createRef();
        this.ht = React.createRef();
        this.bday = React.createRef();


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
            userName: this.usrName.current.value,
            password: this.pwd.current.value,
            weight: this.wt.current.value,
            height: this.ht.current.value,
            birthday: this.bday.current.value,

        }).then(response => {
            console.log("user created");
            this.fName.current.value = "";
            this.lName.current.value = "";
            this.useremail.current.value = "";
            this.usrName.current.value="";
            this.pwd.current.value = "";
            this.wt.current.value="";
            this.ht.current.value="";
            this.bday.current.value="";
            this.props.history.push('/login');
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
                    <label htmlFor="user">Username: </label>
                    <input type="text" name="userName" ref={this.usrName} required></input>
                </div>
                <div>
                    <label htmlFor="password">Passowrd: </label>
                    <input type="password" name="userName" ref={this.pwd} required></input>
                </div>

                <div>
                    <label htmlFor="weight">Weight: </label>
                    <input type="number" name="weight" ref={this.wt} required></input>
                </div>
                <div>
                    <label htmlFor="height">Height: </label>
                    <input type="number" name="height" ref={this.ht} required></input>
                </div>
                <div>
                    <label htmlFor="birthday">Birthday: </label>
                    <input type="date" name="birthday" ref={this.bday} required></input>
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