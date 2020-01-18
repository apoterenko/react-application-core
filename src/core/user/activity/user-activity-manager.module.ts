import {
  bindInSingleton,
  DI_TYPES,
} from '../../di';
import { UserActivityManager } from './user-activity-manager.serivce';

/**
 * @stable [19.01.2020]
 */
bindInSingleton(DI_TYPES.UserActivityManager, UserActivityManager);
