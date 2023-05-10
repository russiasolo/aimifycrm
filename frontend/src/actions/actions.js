import {
  FETCH_COURSES,
  FETCH_USERS,
  FETCH_USER_PROFILE,
  FETCH_USER_SUBSCRIPTION,
  FETCH_SUBSCRIPTIONS,
  ENROLL_COURSE,
  UNENROLL_COURSE,
  ADD_SUBSCRIPTION,
  REMOVE_SUBSCRIPTION,
  ADD_PAYMENT,
  ADD_REPORT,
  ADD_NOTIFICATION,
} from './constants';

export const fetchCourses = () => ({
  type: FETCH_COURSES,
});

export const fetchUsers = () => ({
  type: FETCH_USERS,
});

export const fetchUserProfile = (id) => ({
  type: FETCH_USER_PROFILE,
  id,
});

export const fetchUserSubscription = (id) => ({
  type: FETCH_USER_SUBSCRIPTION,
  id,
});

export const fetchSubscriptions = () => ({
  type: FETCH_SUBSCRIPTIONS,
});

export const enrollCourse = (userId, courseId) => ({
  type: ENROLL_COURSE,
  userId,
  courseId,
});

export const unenrollCourse = (userId, courseId) => ({
  type: UNENROLL_COURSE,
  userId,
  courseId,
});

export const addSubscription = (userId, planId) => ({
  type: ADD_SUBSCRIPTION,
  userId,
  planId,
});

export const removeSubscription = (userId, subscriptionId) => ({
  type: REMOVE_SUBSCRIPTION,
  userId,
  subscriptionId,
});

const addPayment = (userId, amount) => ({
  type: ADD_PAYMENT,
  userId,
  amount,
});

export const addReport = (userId, lessonId, content) => ({
  type: ADD_REPORT,
  userId,
  lessonId,
  content,
});

export const addNotification = (userId, message) => ({
  type: ADD_NOTIFICATION,
  userId,
  message,
});
