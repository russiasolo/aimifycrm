import {
  STUDENT_LIST_SUCCESS,
  STUDENT_LIST_REQUEST,
  STUDENT_LIST_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
} from '../constants/studentConstants';

export const studentListReducer = (state = { students: [] }, action) => {
  switch (action.type) {
    case STUDENT_LIST_REQUEST:
      return { loading: true, students: [] };

    case STUDENT_LIST_SUCCESS:
      return { loading: false, students: action.payload };

    case STUDENT_LIST_FAIL:
      return { loading: false, error: action.payload };

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
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
