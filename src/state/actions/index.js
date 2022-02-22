// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Declare action TYPES at the top of the file

import axiosWithAuth from '../../utils/axiosWithAuth';
import { API_URL } from '../../config';

// USER ACTIONS
export const authenticateUser = authService => {
  return dispatch => {
    dispatch(fetchStart());
    authService
      .getUser()
      .then(authenticatedUser => {
        dispatch(setUserId(authenticatedUser.sub));
        return authenticatedUser.sub; // sub = profile_id
      })
      .then(profile_id => {
        dispatch(getProfile(profile_id));
      })
      .catch(err => {
        dispatch(fetchError(err));
      })
      .finally(() => dispatch(fetchEnd()));
  };
};

export const SET_USER_ID = 'SET_USER_ID';
export const setUserId = user_id => {
  return { type: SET_USER_ID, payload: user_id };
};

export const SET_USER_INFO = 'SET_USER_INFO';
export const setUserInfo = info => {
  return { type: SET_USER_INFO, payload: info };
};

export const getProfile = profile_id => {
  return dispatch => {
    axiosWithAuth()
      .get(`${API_URL}profiles/${profile_id}`)
      .then(res => {
        if (res.data) {
          dispatch(setUserInfo(res.data));
        } else {
          throw new Error('not found');
        }
      })
      .catch(error => {
        dispatch(fetchError(error.message));
      });
  };
};
// NOTE: appears to be redundant code, commenting out for now
// user profile is stored in userReducer state labeled "userInfo"

// export const getUserProfile = () => {
//   return dispatch => {
//     const token = localStorage.getItem('okta-token-storage');
//     dispatch(fetchUserProfile(JSON.parse(token).idToken.claims));
//   };
// };

export const USER_PROFILE = 'USER_PROFILE';
export const fetchUserProfile = profile => {
  return { type: USER_PROFILE, payload: profile };
};

// CALENDAR ACTIONS----------------------
export const MENTOR_EVENT_STUB = 'MENTOR_EVENT_STUB';
export const getEventTemplateStub = event => {
  return { type: MENTOR_EVENT_STUB, payload: event };
};
export const MENTEE_EVENT_STUB = 'MENTEE_EVENT_STUB';
export const getEventTemplateStub2 = event => {
  return { type: MENTEE_EVENT_STUB, payload: event };
};
// ADMIN TICKETS--------------------------

// ASYNC MANAGEMENT --------------------------
export const FETCH_START = 'FETCH_START';
export const fetchStart = () => {
  return { type: FETCH_START };
};
export const FETCH_ERROR = 'FETCH_ERROR';
export const fetchError = error => {
  return { type: FETCH_ERROR, payload: error };
};
export const FETCH_END = 'FETCH_END';
export const fetchEnd = () => {
  return { type: FETCH_END };
};
