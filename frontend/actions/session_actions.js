export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';

import * as APIUtil from '../utils/session_api_util';

export const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveSessionErrors = (errors) => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER,
});

export const login = (user) => dispatch => (
  APIUtil.login(user)
    .then(
      currentUser => dispatch(receiveCurrentUser(currentUser)),
      error => dispatch(receiveSessionErrors(error.responseJSON))
    )
);

export const signup = (user) => dispatch => (
  APIUtil.signup(user)
    .then(
      currentUser => dispatch(receiveCurrentUser(currentUser)),
      error => dispatch(receiveSessionErrors(error.responseJSON))
    )
);

export const logout = () => dispatch => (
  APIUtil.logout()
    .then(() => dispatch(logoutCurrentUser()))
);
