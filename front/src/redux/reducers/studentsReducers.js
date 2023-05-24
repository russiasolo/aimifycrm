import {
  STUDENT_LIST_SUCCESS,
  STUDENT_LIST_REQUEST,
  STUDENT_LIST_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  STUDENT_DETAILS_REQUEST,
  STUDENT_DETAILS_SUCCESS,
  STUDENT_DETAILS_FAIL,
  USER_TOKEN_REFRESH_REQUEST,
  USER_TOKEN_REFRESH_SUCCESS,
  USER_TOKEN_REFRESH_FAIL,
} from '../constans/studentsConstans';

const initialState = {
  loading: false,
  error: null,
  students: [],
};

export const studentListReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'STUDENT_LIST_REQUEST':
      return { ...state, loading: true };
    case 'STUDENT_LIST_SUCCESS':
      return { loading: false, students: action.payload };
    case 'STUDENT_LIST_FAIL':
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

export const studentDetailsReducer = (state = { student: {} }, action) => {
  switch (action.type) {
    case STUDENT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case STUDENT_DETAILS_SUCCESS:
      return { loading: false, student: action.payload };
    case STUDENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userTokenRefreshReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_TOKEN_REFRESH_REQUEST:
      return { loading: true };
    case USER_TOKEN_REFRESH_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_TOKEN_REFRESH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
