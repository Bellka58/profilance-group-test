import {
  ADD_NEWS_FAILURE,
  ADD_NEWS_REQUEST,
  ADD_NEWS_SUCCESS,
  APPROVE_NEWS,
  USER_LOGIN_FAILURE,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  DELETE_NEWS,
} from '../constants/actions';

const initialState = {
  user: {
    userName: '',
    role: '',
  },
  isUserLoggedIn: false,
  news: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isUserLoggedIn: true,
        user: {
          userName: action.payload.name,
          role: action.payload.role,
        },
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case USER_LOGOUT:
      return {
        ...state,
        isUserLoggedIn: false,
        user: {
          userName: '',
          role: '',
        },
      };
    case ADD_NEWS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_NEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        news: [
          ...state.news,
          { ...action.payload, approved: state.user.role === 'admin' },
        ],
      };

    case ADD_NEWS_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case APPROVE_NEWS:
      const newsItemIndex = state.news.findIndex(
        (item) => item.id === action.payload
      );
      if (!~newsItemIndex) {
        return state;
      }
      return {
        ...state,
        news: [
          ...state.news.slice(0, newsItemIndex),
          {
            ...state.news[newsItemIndex],
            approved: true,
          },
          ...state.news.slice(newsItemIndex + 1),
        ],
      };
    case DELETE_NEWS:
      const newsItemIndexDelete = state.news.findIndex(
        (item) => item.id === action.payload
      );
      if (!~newsItemIndexDelete) {
        return state;
      }
      return {
        ...state,
        news: [
          ...state.news.slice(0, newsItemIndexDelete),
          ...state.news.slice(newsItemIndexDelete + 1),
        ],
      };

    default:
      return state;
  }
};

export default reducer;
