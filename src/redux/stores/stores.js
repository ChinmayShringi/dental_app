import {combineReducers} from 'redux';
import loggedInUserDetailsReducer from '../reducers/loggedInUserDetailsReducer';
import DrawerNotificationBadgeCountReducer from '../reducers/DrawerNotificationBadgeCountReducer';

const allReducers = combineReducers({
  loggedInUserDetailsReducer: loggedInUserDetailsReducer,
  DrawerNotificationBadgeCountReducer: DrawerNotificationBadgeCountReducer,
});

export default allReducers;
