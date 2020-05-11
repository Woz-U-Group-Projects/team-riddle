import React from 'react';
import ProfilePage from '../components/profile';
import UserMenu from '../components/usermenu';

const Profile = () => (
  <div>
    <div>
  <UserMenu />
  </div>
  <div>
    <ProfilePage />    
  </div>
  </div>
);

export default Profile;