import React from 'react';
import Workouts from '../components/workouts';
import UserMenu from '../components/usermenu';


const Workout = () => (

  <div>
    <div>
      <UserMenu />
    </div>

    <div>
      <Workouts uri="http://localhost:3001/users/userworkouts" />

    </div>


  </div>

);

export default Workout;