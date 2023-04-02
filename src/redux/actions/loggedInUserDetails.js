import {LOGGED_IN_USER_DETAILS} from './types';

export const loggedInUserDetails = user => ({
  type: LOGGED_IN_USER_DETAILS,
  data: {
    user: user,
  },
});
