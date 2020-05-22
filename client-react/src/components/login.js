import React from 'react';
import { login } from './userfunctions';
import { withRouter } from "react-router-dom";

class LoginForm extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    };
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    onSubmit(event) {
        event.preventDefault()
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        login(user)
            .then(res => {
                if (res) {
                    this.props.history.push('/welcome');
                }
            }).catch(err => {
                console.log(err)
            })
    }
    render() {
        return (

            <div className="card-container">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    <h5 className="card-title text-center">Member Log In</h5>
                                    <form className="form-signin" noValidate onSubmit={this.onSubmit}>
                                        <div className="form-label-group">
                                        <input type="email" name="email" id="email" className="form-control" placeholder="Email" aria-describedby="helpId" value={this.state.email} onChange={this.handleChange}></input>
                                            <label for="inputEmail">Email address</label>
                                        </div>

                                        <div className="form-label-group">
                                        <input type="password" className="form-control" name="password" id="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}></input>
                                            <label for="inputPassword">Password</label>
                                        </div>

                                        <div className="custom-control custom-checkbox mb-3">
                                            <input type="checkbox" className="custom-control-input" id="customCheck1"></input>
                                            <label className="custom-control-label" for="customCheck1">Remember password</label>
                                        </div>
                                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <form id="login-form" noValidate onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address:</label><br />
                        <input type="email" name="email" id="email" className="form-control" placeholder="Email" aria-describedby="helpId" value={this.state.email} onChange={this.handleChange}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label><br />
                        <input type="password" className="form-control" name="password" id="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}></input>
                    </div>
                    <button type="submit" >Log In</button>
                </form> */}
            </div>
        )
    }
}

export default withRouter(LoginForm);