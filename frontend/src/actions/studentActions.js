import {
  STUDENT_LIST_SUCCESS,
  STUDENT_LIST_REQUEST,
  STUDENT_LIST_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from '../constants/studentConstants';
import axiosInstance from '../axiosInstance';

export const listStudents = () => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_LIST_REQUEST });

    // Получить токен пользователя из состояния хранилища

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axiosInstance.get('/api/user_profiles/', config);

    dispatch({
      type: STUDENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axiosInstance.post('/api/token/', { username, password }, config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
    return true;
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail ? error.response.data.detail : error.message,
    });
    return false;
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
};
