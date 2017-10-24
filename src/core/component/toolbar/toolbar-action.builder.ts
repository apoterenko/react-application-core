import {
  PAGER_NEXT_ACTION_TYPE,
  PAGER_PREVIOUS_ACTION_TYPE,
  PAGER_LAST_ACTION_TYPE,
  PAGER_FIRST_ACTION_TYPE,
} from './page';

export class ToolbarActionBuilder {
  public static buildPagerPreviousActionType(section: string): string {
    return `${section}.${PAGER_PREVIOUS_ACTION_TYPE}`;
  }

  public static buildPagerNextActionType(section: string): string {
    return `${section}.${PAGER_NEXT_ACTION_TYPE}`;
  }

  public static buildPagerFirstActionType(section: string): string {
    return `${section}.${PAGER_FIRST_ACTION_TYPE}`;
  }

  public static buildPagerLastActionType(section: string): string {
    return `${section}.${PAGER_LAST_ACTION_TYPE}`;
  }
}
