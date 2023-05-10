import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { studentListReducer, userLoginReducer } from './reducers/studentReducers';

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const reducer = combineReducers({
  listStudents: studentListReducer,
  userLogin: userLoginReducer,
});

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

store.subscribe(() => {
  const {
    userLogin: { userInfo },
  } = store.getState();
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
});

export default store;
