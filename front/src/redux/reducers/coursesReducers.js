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
  COURSE_ADD_STUDENTS_SUCCESS,
  COURSE_UPDATE_REQUEST,
  COURSE_UPDATE_SUCCESS,
  COURSE_UPDATE_FAIL,
  COURSE_UPDATE_RESET,
  COURSE_REMOVE_STUDENTS_SUCCESS,
  UPDATE_COURSE_STUDENTS_SUCCESS,
  COURSE_DELETE_REQUEST,
  COURSE_DELETE_SUCCESS,
  COURSE_DELETE_FAIL,
} from '../constans/coursesConstans';

export const courseListReducer = (state = { loading: true, courses: [] }, action) => {
  switch (action.type) {
    case COURSE_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        courses: [],
      };
    case COURSE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        courses: action.payload,
      };
    case COURSE_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case COURSE_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COURSE_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        courses: state.courses.filter((course) => course.cr_id !== action.payload),
      };
    case COURSE_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const courseDetailsReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case COURSE_DETAILS_REQUEST:
      return { loading: true, ...state };
    case COURSE_DETAILS_SUCCESS:
      return { loading: false, course: action.payload };
    case COURSE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const courseCreateReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case COURSE_CREATE_REQUEST:
      return { loading: true };
    case COURSE_CREATE_SUCCESS:
      return { loading: false, success: true, course: action.payload };
    case COURSE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return {
        ...state,
        course: {
          ...state.course,
        },
      };
  }
};

export const courseUpdateReducer = (state = { course: {} }, action) => {
  switch (action.type) {
    case COURSE_UPDATE_REQUEST:
      return { loading: true };
    case COURSE_UPDATE_SUCCESS:
      return { loading: false, success: true, course: action.payload };
    case COURSE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case COURSE_ADD_STUDENTS_SUCCESS:
      return {
        ...state,
        course: {
          ...state.course,
          students: action.payload.students, // Обновляем список студентов
        },
      };
    case COURSE_UPDATE_RESET:
      return { course: {} };
    case UPDATE_COURSE_STUDENTS_SUCCESS:
      return {
        ...state,
        course: {
          ...state.course,
          students: action.payload, // Обновляем список студентов
        },
      };
    case COURSE_REMOVE_STUDENTS_SUCCESS:
      return {
        ...state,
        course: {
          ...state.course,
          students: action.payload.students, // Обновляем список студентов
        },
      };
    default:
      return state;
  }
};
