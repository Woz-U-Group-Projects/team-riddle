import React from 'react';
import jwt_decode from 'jwt-decode';
import auth from '../components/auth';
import { withRouter } from "react-router-dom";

class ProfilePage extends React.Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            image: null,
            url: ''
        }
   
    }
    componentWillMount() { 
        if(auth() === false) {
            this.props.history.push('/login');
        }
    }
    
    handleChange(event) {
       if(event.target.files[0]) {
           const image = event.target.files[0];
           this.setState({
               image
           })
       }
    }
    componentDidMount() {
        const token = localStorage.usertoken
        if(token !== undefined) {
        const decoded = jwt_decode(token)
        this.setState({
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            email: decoded.email,
        })
    }
}
    
    render() {
        return (
            
            <div>
                <div className="card-container">
                    <h2>{this.state.firstName} {this.state.lastName}'s <br />
                    Profile</h2>
                    <p><b>Email: </b> {this.state.email}</p>
                </div>
        
            </div>
        )
    }
}
export default withRouter(ProfilePage);