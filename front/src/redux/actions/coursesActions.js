import axiosInstance from '../../axiosInstance';
import {
  COURSE_LIST_REQUEST,
  COURSE_LIST_SUCCESS,
  COURSE_LIST_FAIL,
  COURSE_DETAILS_REQUEST,
  COURSE_DETAILS_SUCCESS,
  COURSE_DETAILS_FAIL,
  COURSE_CREATE_REQUEST,
  COURSE_CREATE_SUCCESS,
  COURSE_CREATE_FAIL,
  COURSE_UPDATE_REQUEST,
  COURSE_UPDATE_SUCCESS,
  COURSE_UPDATE_FAIL,
  UPDATE_COURSE_STUDENTS_SUCCESS,
  UPDATE_COURSE_STUDENTS_FAILURE,
  UPDATE_COURSE_STUDENTS_REQUEST,
} from '../constans/coursesConstans';

export const listCourses = () => async (dispatch, getState) => {
  try {
    dispatch({ type: COURSE_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axiosInstance.get('/api/courses/', config);

    dispatch({
      type: COURSE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getCourseDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: COURSE_DETAILS_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axiosInstance.get(`/api/courses/${id}`, config);

    dispatch({
      type: COURSE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const createCourse = (courseData) => async (dispatch, getState) => {
  try {
    dispatch({ type: COURSE_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axiosInstance.post('/api/courses/', courseData, config);

    dispatch({
      type: COURSE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: COURSE_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateCourse = (courseId, courseData) => async (dispatch, getState) => {
  try {
    dispatch({ type: COURSE_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${userInfo.access}` } };

    const { data } = await axiosInstance.put(`/api/courses/${courseId}/`, courseData, config);
    dispatch({ type: COURSE_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    console.log('Error updating course:', error);
    dispatch({
      type: COURSE_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateCourseStudents = (courseId, studentIdsToAdd, studentIdsToRemove) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_COURSE_STUDENTS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    if (!userInfo) {
      throw new Error('User information is not available in the state.');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const addRequestData = { student_ids: studentIdsToAdd, action: 'add' };
    const removeRequestData = { student_ids: studentIdsToRemove, action: 'remove' };

    if (studentIdsToAdd.length > 0) {
      await axiosInstance.put(`/api/courses/${courseId}/students/add/`, addRequestData, config);
    }

    if (studentIdsToRemove.length > 0) {
      await axiosInstance.put(`/api/courses/${courseId}/students/remove/`, removeRequestData, config);
    }

    dispatch({ type: UPDATE_COURSE_STUDENTS_SUCCESS });
  } catch (error) {
    console.log('Error updating course students:', error);
    dispatch({
      type: UPDATE_COURSE_STUDENTS_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
