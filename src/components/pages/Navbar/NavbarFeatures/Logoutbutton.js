import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { NavBtnLink } from '../../NavBarLanding/NavBarStyle';

function Logoutbutton() {
  const { logout } = useAuth0();
  return <NavBtnLink onClick={() => logout()}>Logout</NavBtnLink>;
}

export default Logoutbutton;
