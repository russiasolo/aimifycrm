import {
  STUDENT_LIST_SUCCESS,
  STUDENT_LIST_REQUEST,
  STUDENT_LIST_FAIL,
  STUDENT_DETAILS_REQUEST,
  STUDENT_DETAILS_SUCCESS,
  STUDENT_DETAILS_FAIL,
} from '../constans/studentsConstans';
import axiosInstance from '../../axiosInstance';

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

    const { data } = await axiosInstance.get('/api/students/', config);

    dispatch({
      type: STUDENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getStudentDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: STUDENT_DETAILS_REQUEST });

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

    const { data } = await axiosInstance.get(`/api/students/${id}`, config);

    dispatch({
      type: STUDENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STUDENT_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
