import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { studentListReducer } from './redux/reducers/studentsReducers';
import { authReducer, userLoginReducer, refreshToken } from './redux/reducers/usersReducers';
import {
  courseCreateReducer,
  courseDetailsReducer,
  courseListReducer,
  courseUpdateReducer,
} from './redux/reducers/coursesReducers';

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const rootReducer = combineReducers({
  auth: authReducer,
  listStudents: studentListReducer,
  userLogin: userLoginReducer,
  courseList: courseListReducer,
  courseDetail: courseDetailsReducer,
  courseCreate: courseCreateReducer,
  courseUpdate: courseUpdateReducer,

  // другие редьюсеры могут быть добавлены здесь
});

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const authMiddleware = (store) => (next) => async (action) => {
  // check if the token is expired
  const token = store.getState().auth.token; // get the token from the state
  const expiry = store.getState().auth.expiry; // get the expiry time from the state
  if (token && expiry && new Date(expiry) < new Date()) {
    // token is expired, dispatch an action to refresh it
    await store.dispatch(refreshToken());
  }
  // proceed with the original action
  return next(action);
};

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk, authMiddleware)));

store.subscribe(() => {
  const {
    userLogin: { userInfo },
  } = store.getState();
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
});

export default store;
