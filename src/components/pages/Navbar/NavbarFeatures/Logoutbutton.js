import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { NavBtnLink } from '../../NavBarLanding/NavBarStyle';

function Logoutbutton() {
  const { logout } = useAuth0();

  const logoutAuth = () => {
    localStorage.removeItem('AuthToken');
    logout();
  };

  return <NavBtnLink onClick={logoutAuth}>Logout</NavBtnLink>;
}

export default Logoutbutton;