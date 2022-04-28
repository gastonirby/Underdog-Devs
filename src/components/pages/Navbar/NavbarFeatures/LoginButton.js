import React from 'react';
import { NavBtnLink } from '../../NavBarLanding/NavBarStyle';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <NavBtnLink onClick={() => loginWithRedirect({ action: 'login' })}>
      Login
    </NavBtnLink>
  );
}

export default LoginButton;
