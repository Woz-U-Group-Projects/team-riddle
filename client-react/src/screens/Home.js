import React from 'react';
import NavMenu from '../components/navmenu';
import logo from '../logo.png';


const Home = () => (


    <div>
        <div>
            <NavMenu />
        </div>

        <blockquote className="blockquote text-center">
            <p className="mb-0">Welcome to World of Fitness.</p>
            <footer className="blockquote-footer">Some casual coders from <cite title="Source Title">Woz-U Groups Team Riddle</cite></footer>
        </blockquote>

        <div className="jumbotron">
            <h1 className="display-3 text-center">SHO UR Fit.</h1>
            <p className="lead text-center" ><img src={logo} className="App-logo" alt="logo" /></p>
            <hr className="my-4"></hr>
            <p class="lead blockqoute text-center">Keep Your Fitness Moving! Plan your gym sessions on-the-go.<br /></p>
            <hr className="my-4"></hr>

            <p class="lead blockquote text-center">SHOtime keeps your workouts up to date and available on the go. </p>
            <hr class="my-4"></hr>
            <p class="lead blockquote text-center">Featuring a workout list and a status feed to help you get stronger.</p>

            <p className="lead text-center">
                <a className="btn btn-primary btn-lg" href="/register" role="button">Register Here</a>
            </p>
            <p className="lead text-center"><h6>Already a member?</h6></p>
            <p className="lead text-center">
                <a className="btn btn-warning btn-lg" href="/login" role="button"> Login</a>
            </p>


        </div>
    </div>



);

export default Home;