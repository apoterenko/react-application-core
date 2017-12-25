import { orNull } from '../../util';

import {
  CUSTOM_ACTION_CLONE_ACTION_TYPE,
  CUSTOM_ACTION_DISABLE_ACTION_TYPE,
} from './custom-action.interface';

export class CustomActionBuilder {

  public static buildCustomActionType(section: string, type: string): string {
    return orNull(section, `${section}.${type}`);
  }

  public static buildCustomCloneActionType(section: string): string {
    return this.buildCustomActionType(section, CUSTOM_ACTION_CLONE_ACTION_TYPE);
  }

  public static buildCustomDisableActionType(section: string): string {
    return this.buildCustomActionType(section, CUSTOM_ACTION_DISABLE_ACTION_TYPE);
  }
}
