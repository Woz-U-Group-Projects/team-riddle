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
            disabled: false,
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
        //console.log(this.state);
    }

    onSubmit(event) {
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

        return (<div>
  
            <div className="jumbotron">
                <h3 className="display-6 text-center">TELL US ABOUT YOURSELF</h3>
                <hr className="my-4"></hr>
                <form noValidate onSubmit={this.onSubmit} >
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name: </label>
                            <input
                                type="text"
                                className="form-control"
                                name="firstName"

                                placeholder="Enter First Name"
                                value={this.state.firstName} onChange={this.handleChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name: </label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Last Name"
                                name="lastName"
                                value={this.state.lastName}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email: </label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter Email"

                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange} required>

                            </input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="user">Username: </label>
                            <input
                                type="text"
                                className="form-control"
                                name="userName"
                                placeholder="Enter Username"
                                value={this.state.userName} onChange={this.handleChange} required></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password: </label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Enter Password"
                                value={this.state.password} onChange={this.handleChange} required></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="weight">Weight: </label>
                            <input
                                type="number"
                                className="form-control"
                                name="weight"
                                placeholder="Enter Weight (lbs.)"
                                value={this.state.weight} onChange={this.handleChange} required></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="height">Height: </label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter Height (in)"
                                name="height"
                                value={this.state.height} onChange={this.handleChange} required></input>
                        </div>
                        <div className="form-group">
                            <label htmlFor="birthday">Birthday: </label>
                            <input
                                type="date"
                                className="form-control"
                                name="birthday" value={this.state.birthday} onChange={this.handleChange} required></input>
                        </div>
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="btn btn-outline-info btn-lg btn-block" >SIGN UP</button>
                    </fieldset>
                </form>
            </div>
        </div>
        )
    }

}
export default withRouter(RegisterForm);