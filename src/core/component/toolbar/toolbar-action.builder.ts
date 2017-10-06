import { PAGER_FORWARD_ACTION_TYPE, PAGER_BACKWARD_ACTION_TYPE } from './page';

export class ToolbarActionBuilder {
  public static buildPagerBackwardActionType(section: string): string {
    return `${section}.${PAGER_BACKWARD_ACTION_TYPE}`;
  }

  public static buildPagerForwardActionType(section: string): string {
    return `${section}.${PAGER_FORWARD_ACTION_TYPE}`;
  }
}
