import {DRAWER_NOTIFICATION_BADGE_COUNT} from '../actions/types';

const initialState = {
  count: 0,
};

const DrawerNotificationBadgeCountReducer = (state = initialState, action) => {
  switch (action.type) {
    case DRAWER_NOTIFICATION_BADGE_COUNT:
      return {
        ...state,
        count: action.data.count,
      };
    default:
      return state;
  }
};

export default DrawerNotificationBadgeCountReducer;
