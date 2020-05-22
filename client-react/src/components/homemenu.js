import React from 'react';
import Logout from './logout';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import logo from '../logo.png';

class HomeMenu extends React.Component{
constructor(props) {
    super(props);
    this.state = {
      menu: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu(){
    this.setState({ menu: !this.state.menu })
  }

  render() {

  const show = (this.state.menu) ? "show" : "" ;
  return (

 //     <div className="card-container">
    //       <div className="">
    //         <img src={logo} className="App-logo" alt="logo" />
    //       </div>
    //       <div className="">
    //         <p><Link to="/register">
    //           <button>I'M NEW</button>
    //         </Link>
    //         </p>
    //       </div>
    //       <div className=""><h6>Already a member?</h6>

    //         <Link to="/login">
    //           <button>SIGN IN</button>
    //         </Link>
    //  </div>
    //       {/* <Link to="/profile">
    //         <button>Profile</button>
    //       </Link> */}
    //     </div>

  );
  }
}

   

export default withRouter(HomeMenu);