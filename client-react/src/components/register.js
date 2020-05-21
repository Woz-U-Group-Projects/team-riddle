import React from 'react';
import { register } from './userfunctions';
import { withRouter } from "react-router-dom";
import { auth } from '../components/auth';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

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
            birthday: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    };
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state);
    }

    // addUser = () => {
    //     axios.post("http://localhost:3001/users/register", {
    //         firstName: this.fName.current.value,
    //         lastName: this.lName.current.value,
    //         email: this.useremail.current.value,
    //         userName: this.usrName.current.value,
    //         password: this.pwd.current.value,
    //         weight: this.wt.current.value,
    //         height: this.ht.current.value,
    //         birthday: this.bday.current.value,

    //     }).then(response => {
    //         console.log("user created");
    //         this.fName.current.value = "";
    //         this.lName.current.value = "";
    //         this.useremail.current.value = "";
    //         this.usrName.current.value="";
    //         this.pwd.current.value = "";
    //         this.wt.current.value="";
    //         this.ht.current.value="";
    //         this.bday.current.value="";
    //         this.props.history.push('/login');
    //     })

    // }

    onSubmit(event) {
        alert('it worked!');
        event.preventDefault()
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            userName: this.state.userName,
            password: this.state.password,
            weight: this.state.weight,
            height: this.state.height,
            birthday: this.state.birthday,
        }
        register(user)
            .then(res => {
                if (res) {
                    this.props.history.push('/login');
                }
            }).catch(err => {
                console.log(err)
            })
    }
    // componentDidMount() {
    //     console.log('auth');
    //     const token = localStorage.usertoken;
    //     const decoded = jwt_decode(token);
    //     register(decoded.userId)
    //     this.props.history.push('/welcome')
    // }



    // componentDidMount() {
    //     const token = localStorage.usertoken
    //     if (token !== undefined) {
    //         const decoded = jwt_decode(token)
    //         this.setState({
    //             firstName: decoded.firstName,
    //             lastName: decoded.lastName,
    //             email: decoded.email,
    //             userName: decoded.userName,
    //             password: decoded.password,
    //             weight: decoded.weight,
    //             height: decoded.height,
    //             birthday: decoded.birthday,
    //         })
    //         this.props.history.push('/welcome')
    //     }
    // }



    render() {
        return (
            <div className="card-container">
                <h3>TELL US ABOUT YOURSELF</h3>
                <form id="signup" name="signup" noValidate onSubmit={this.onSubmit} >
                    <div>
                        <label htmlFor="firstName">First Name: </label>
                        <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} required></input>
                    </div>
                    <div>
                        <label htmlFor="lastName">Last Name: </label>
                        <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} required></input>
                    </div>
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input type="text" name="email" value={this.state.email} onChange={this.handleChange} required></input>
                    </div>
                    <div>
                        <label htmlFor="user">Username: </label>
                        <input type="text" name="userName" value={this.state.userName} onChange={this.handleChange} required></input>
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required></input>
                    </div>

                    <div>
                        <label htmlFor="weight">Weight: </label>
                        <input type="number" name="weight" value={this.state.weight} onChange={this.handleChange} required></input>
                    </div>
                    <div>
                        <label htmlFor="height">Height: </label>
                        <input type="number" name="height" value={this.state.height} onChange={this.handleChange} required></input>
                    </div>
                    <div>
                        <label htmlFor="birthday">Birthday: </label>
                        <input type="date" name="birthday" value={this.state.birthday} onChange={this.handleChange} required></input>
                    </div>
                    <div>
                        <button type="submit" >SIGN UP</button>
                    </div>
                </form>
            </div>
        )
    }

}
export default withRouter(RegisterForm);