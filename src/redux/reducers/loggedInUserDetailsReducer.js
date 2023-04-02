import {LOGGED_IN_USER_DETAILS} from '../actions/types';

const initialState = {
  user: null,
};

const loggedInUserDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN_USER_DETAILS:
      return {
        ...state,
        user: action.data.user,
      };
    default:
      return state;
  }
};

export default loggedInUserDetailsReducer;
