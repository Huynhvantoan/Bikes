import axios from 'axios';
import localStorage from './AsyncStorage';

export const BASE_URL = 'http://demo.easymove.vn/api/';
export const KEY="Basic ZWFzeW1vdmU6MGIwYmZmOTk1Yjc3MjA0ZDFiMTg3MWZlNjQ5N2JjMDQ=";
export const API_USER = 'Config.API_USER';
export const API_PASS = 'Config.API_PASS';
export const PAGE_INDEX=1;
export const NEWS_ID=1;
//LOGIN & REGISTER
export const REGISTER='member/register';
export const ACTIVE='member/active';
export const LOGIN='member/login';
//PROFILE
export const INFO_PROFILE='member/info';
export const UPDATE_PROFILE='member/update';
export const FORGET_PASSWORD='member/forget';
export const ACTIVE_PASSWORD='member/active_forget';
export const CHANGE_PASSWORD='member/changepass';
//NEWS
export const LIST_NEWS=`news?page=${PAGE_INDEX}`;
export const DETAIS_NEWS=`news/${NEWS_ID}?page=${PAGE_INDEX}`;
//HISTORY
export const ALL_HISTORY='history';
export const DAY_HISTORY='history/date';
export const WEEK_HISTORY='history/week';
export const PRECIOUS_HISTORY='history/precious';
export const MONTH_HISTORY='history/month';
export const YEAR_HISTORY='history/year';
//GARA
export const LIST_GARA='gara';
export const DETAILS_GARA=`gara/${NEWS_ID}`;
//HELP
export const BIKES_GUIDE='bike_guide';
export const APP_GUIDE='app_guide';
//NOTIFICATION
export const LIST_NOTIFICATION='notification';
export const DETAILS_NOTIFICATION=`notification/${NEWS_ID}`;
//BOOK A CAR
export const BOOK_CAR='bike/register';

export default {
  KEY,
  PAGE_INDEX,
  NEWS_ID
}

export const signinUser = ({ email, password }) => {
  return (dispatch) => {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER }); // Update authentication status
        localStorage.setItem('token', response.data.token) // Save the JWT token
        browserHistory.push("feature"); // Redirect the user to the feature route
      })
      .catch(() => {
        dispatch(authError('Bad Login Info'));
      });
  }
}

export const signupUser = ({ email, password }) => {
  return (dispatch) => {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER }); // Update authentication status
        localStorage.setItem('token', response.data.token) // Save the JWT token
        browserHistory.push("feature"); // Redirect the user to the feature route
      })
      // Axios errors return a response wrapped in an error object
      // Make sure to deconstruct the response to normalize the data
      .catch(({ response }) => dispatch(authError(response.data.error)));
  }
}

export const signoutUser = () => {
  localStorage.removeItem('token'); // Delete JWT token
  return {
    type: UNAUTH_USER
  };
};
export const authError = (error) => {
  return {
    type: AUTH_ERROR,
    payload: error
  };
};

export const fetchMessage = () => {
  return (dispatch) => {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(res => {
        dispatch({ type: FETCH_MESSAGE, payload: res.data.message })
      })
  }
};
