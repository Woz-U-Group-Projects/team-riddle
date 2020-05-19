import axios from 'axios';
import { withRouter } from "react-router-dom";
import { jwt_decoded } from "jwt-decode";
const server = "http://localhost:3001/";

//Login and Logout
export const login = user => {
    return axios
        .post(server + 'users/login', {
            email: user.email,
            password: user.password
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
            password: user.password,
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
