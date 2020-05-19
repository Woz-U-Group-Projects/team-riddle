import React from 'react';
import Workoutdetails from '../components/workoutdetails';
import UserMenu from '../components/usermenu';

const Workoutdetail = () => (
  <div>
     
    <div>
    <Workoutdetails uri="http://localhost:3001/workouts/workouts/:id" />
  </div>

</div>
  
);

export default Workoutdetail;