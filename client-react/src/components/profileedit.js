import axios from 'axios';
import { withRouter } from "react-router-dom";
import { jwt_decoded } from "jwt-decode";
const server = "http://localhost:3001/";

//Login and Logout
export const updateUser = user => {
    return axios
        .post(server + 'users/profile', {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userName:user.userName,
            password: user.password,
            weight: user.weight,
            height:user.height,
            birthday:user.birthday,
        })
        .then(res => {
            localStorage.setItem('usertoken', res.data)
            return res.data

        })
        .catch(err => {
            console.log(err)
        })
}


//Register
export const register = user => {
    return axios
        .post(server + 'users/register', {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userName:user.userName,
            password: user.password,
            weight: user.weight,
            height:user.height,
            birthday:user.birthday,

        })
        .then(res => {
            if (res === 'this user already exists') {
                alert('This email is already connected to an account. Please login')
            } else {
                localStorage.setItem('usertoken', res.data)
                return res.data
            }
        })
        .catch(err => {
            console.log(err)
        })
}

export const checkAuth = (password) => {
    const token = localStorage.userToken;
    const decoded = jwt_decoded(token);
    if (decoded.password === password) {
        return true;
    }

}

//Workouts
export const fetchWorkouts = userId => {
    return axios
        .post(server + 'users/userworkouts', {
            userId: userId
        }).then(res => {
            console.log(res.data)
            return res.data;

        })
}
export const newWorkout = workout => {
    return axios
        .post(server + 'users/workouts', {
            userId: workout.userId,
            workoutName: workout.workoutName,
            noOfSets: workout.noOfSets,
            noOfReps: workout.noOfReps,
            noOfWeights: workout.noOfWeights
        })
}

//Count Workouts

export const countWorkouts = userId => {
    return axios.post(server + 'users/userworkouts', {
        userId: userId
    }).then(res => {
            console.log(res.data)
            return res.data;

        })
}




// render() {
//     return (

//         <div>
//             <div className="card-container">
//                 <h2>Hi, {this.state.firstName}<br />
//                     <hr></hr>
//                     Profile Information</h2>
//                 <b>Change Info</b>
//                 <p> <label htmlFor="firstName"><b>First Name: </b></label>
//                     <input type="text" name="firstName" value={this.state.firstName}></input>
//                 </p>
//                 <p> <label htmlFor="lastName"><b>Last Name: </b></label>
//                     <input type="text" name="lastName" value={this.state.lastName}></input>
//                 </p>
//                 <p> <label htmlFor="email"><b>Email: </b></label>
//                     <input type="text" name="email" value={this.state.email}></input>
//                 </p>
//                 <p> <label htmlFor="password"><b>New Password: </b></label>
//                     <input type="text" name="password" value={this.state.password}></input>
//                 </p>




//             </div>

//         </div>
//     )
// }