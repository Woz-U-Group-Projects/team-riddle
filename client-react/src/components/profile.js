import React from 'react';
import jwt_decode from 'jwt-decode';
import auth from '../components/auth';
import { withRouter } from "react-router-dom";
import { updateUser } from "../components/profileedit";

class ProfileComponent extends React.Component {
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
                userName: decoded.userName,
                password: decoded.password,
                weight: decoded.weight,
                height: decoded.height,
                birthday: decoded.birthday,

            })
        }
    }
    // componentDidUpdate() {
    //     const token = localStorage.usertoken
    //     if (token !== undefined) {
    //         const decoded = jwt_decode(token)
    //         this.setState({
    //             firstName: decoded.firstName,
    //             lastName: decoded.lastName,
    //             email: decoded.email,
    //             password: decoded.password,
    //         })
    //     }
    // }

    render() {
        return (

            <div>
                <div className="card-container">
                    <h2>Hi, {this.state.firstName}<br /></h2>
                        <hr></hr>
                        {/* Profile Information */}
                    {/* <b>Change Info</b> */}
                    <p> <label htmlFor="userName"><b>Username: {this.state.userName}</b></label>
                    </p>

                    <p> <label htmlFor="firstName"><b>First Name: {this.state.firstName}</b></label>
                    </p>
                    <p> <label htmlFor="lastName"><b>Last Name: {this.state.lastName}</b></label>
                    </p>
                    <p> <label htmlFor="email"><b>Email: {this.state.email}</b></label>
                    </p>
                    <hr></hr>
                    <div><h2>User Stats</h2></div>
                    <p> <label htmlFor="weight"><b>Weight: {this.state.weight}</b></label>
                    </p>
                    <p> <label htmlFor="height"><b>Height: {this.state.height}</b></label>
                    </p>
                    <p> <label htmlFor="birthday"><b>Birthday: {this.state.birthday}</b></label>
                    </p>





                </div>

            </div>
        )
    }
}
export default withRouter(ProfileComponent);