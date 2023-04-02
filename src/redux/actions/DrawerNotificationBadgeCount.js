import {DRAWER_NOTIFICATION_BADGE_COUNT} from './types';

export const DrawerNotificationBadgeCount = count => ({
  type: DRAWER_NOTIFICATION_BADGE_COUNT,
  data: {
    count: count,
  },
});
