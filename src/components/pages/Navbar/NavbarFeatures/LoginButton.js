import React, { useEffect } from 'react';
import { NavBtnLink } from '../../NavBarLanding/NavBarStyle';
import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const { loginWithRedirect, getAccessTokenSilently, user, getIdTokenClaims } =
    useAuth0();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: 'underdog-identifier',
          scope: 'openid profile email',
        });
        console.log(token);
        localStorage.setItem('AuthToken', token);
      } catch (e) {
        console.log(e.message);
      }
    };
    getUserData();
  }, [getAccessTokenSilently]);

  return (
    <NavBtnLink onClick={() => loginWithRedirect({ action: 'login' })}>
      Login
    </NavBtnLink>
  );
}

export default LoginButton;
