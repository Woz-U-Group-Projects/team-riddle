import React from 'react';
import jwt_decode from 'jwt-decode';
import auth from '../components/auth';
import { withRouter } from "react-router-dom";

class ProfileComponent extends React.Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        }

    }
    componentWillMount() {
        if (auth() === false) {
            this.props.history.push('/login');
        }
    }

    // handleChange(event) {
    //    if(event.target.files[0]) {
    //        const image = event.target.files[0];
    //        this.setState({
    //            image
    //        })
    //    }
    // }
    componentDidMount() {
        const token = localStorage.usertoken
        if (token !== undefined) {
            const decoded = jwt_decode(token)
            this.setState({
                firstName: decoded.firstName,
                lastName: decoded.lastName,
                email: decoded.email,
                password: decoded.password,
            })
        }
    }

    render() {
        return (

            <div>
                <div className="card-container">
                    <h2>Hi, {this.state.firstName}<br />
                        <hr></hr>
                        Profile Information</h2>
                    <b>Update Info</b>
                    <p> <label htmlFor="firstName"><b>First Name: </b></label>
                        <input type="text" name="firstName" value={this.state.firstName}></input>
                    </p>
                    <p> <label htmlFor="lastName"><b>Last Name: </b></label>
                        <input type="text" name="lastName" value={this.state.lastName}></input>
                    </p>
                    <p> <label htmlFor="email"><b>Email: </b></label>
                        <input type="text" name="email" value={this.state.email}></input>
                    </p>
                    <p> <label htmlFor="password"><b>New Password: </b></label>
                        <input type="text" name="password" value={this.state.password}></input>
                    </p>




                </div>

            </div>
        )
    }
}
export default withRouter(ProfileComponent);