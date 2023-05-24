import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  AUTH_REFRESH_FAIL,
  AUTH_REFRESH_SUCCESS,
} from '../constans/usersConstans';

const initialState = {
  isLoggedIn: false,
  userInfo: null,
  error: null,
  loading: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, isLoggedIn: true, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const refreshToken = () => async (dispatch, getState) => {
  try {
    // get the current refresh token from the state
    const refreshToken = getState().auth.refreshToken;

    // send a request to the server to refresh the token
    const response = await fetch('api/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();

    // Store tokens in local storage
    localStorage.setItem('accessToken', data.access);
    localStorage.setItem('refreshToken', refreshToken);

    // dispatch an action to update the state with the new access token
    dispatch({
      type: 'AUTH_REFRESH_SUCCESS',
      payload: {
        token: data.access,
        refreshToken,
      },
    });
  } catch (error) {
    dispatch({
      type: 'AUTH_REFRESH_FAIL',
      payload: error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  dispatch({ type: USER_LOGOUT });
};
