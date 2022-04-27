import React from 'react';
import { NavBtnLink } from '../../NavBarLanding/NavBarStyle';
import { useAuth0 } from '@auth0/auth0-react';

function SignupButton() {
  const { loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }

  return <NavBtnLink onClick={() => loginWithRedirect()}>Signup</NavBtnLink>;
}

export default SignupButton;
