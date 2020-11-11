import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_LOGOUT,
  ADD_NEWS_REQUEST,
  ADD_NEWS_SUCCESS,
  ADD_NEWS_FAILURE,
  APPROVE_NEWS,
  DELETE_NEWS,
} from '../constants/actions';

export const userLogInRequest = () => ({
  type: USER_LOGIN_REQUEST,
});

export const userLogInSuccess = (data) => ({
  type: USER_LOGIN_SUCCESS,
  payload: data,
});

export const userLogInFailure = (error) => ({
  type: USER_LOGIN_FAILURE,
  payload: error,
});

export const userLogOut = () => ({
  type: USER_LOGOUT,
});

export const addNewsRequest = () => ({
  type: ADD_NEWS_REQUEST,
});

export const addNewsSuccess = (data) => ({
  type: ADD_NEWS_SUCCESS,
  payload: data,
});

export const addNewsFailure = (error) => ({
  type: ADD_NEWS_FAILURE,
  payload: error,
});

export const approveNewsItem = (id) => ({
  type: APPROVE_NEWS,
  payload: id,
});

export const deleteNewsItem = (id) => ({
  type: DELETE_NEWS,
  payload: id,
});
