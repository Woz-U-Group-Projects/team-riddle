import React from 'react';
import { register } from './userfunctions';
import { withRouter } from "react-router-dom";

class RegisterForm extends React.Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit(event) {
        event.preventDefault()
        let user ={};
        if (this.state.firstName && this.state.lastName && this.state.email && this.state.password) {

            register(user).then(res => {
                if (res) {

                    this.props.history.push('/profile');
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
    render() {
        return (
            <div className="card-container">
                <h3>Register</h3>
                <form id="signup" name="signup" noValidate onSubmit={this.handleSubmit}>
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
                        <label htmlFor="password">Password: </label>
                        <input type="text" name="password" value={this.state.password} onChange={this.handleChange} required></input>
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default withRouter(RegisterForm);