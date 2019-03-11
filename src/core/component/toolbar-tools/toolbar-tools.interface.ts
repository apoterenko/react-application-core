import { IContainerProps } from '../../props-definitions.interface';
import {
  IActionsWrapper,
  IOnFilterClickWrapper,
  IOnRefreshClickWrapper,
  IFlexWrapper,
} from '../../definitions.interface';
import { IGenericFlexLayoutEntity } from '../../definition';

/**
 * @stable [11.03.2019]
 */
export enum ToolbarToolsEnum {
  FILTER,
  REFRESH,
}

/**
 * @stable [11.03.2019]
 */
export interface IToolbarToolsContainerProps
  extends IContainerProps,
    IFlexWrapper<IGenericFlexLayoutEntity>,
    IOnFilterClickWrapper<() => void>,
    IOnRefreshClickWrapper<() => void>,
    IActionsWrapper<ToolbarToolsEnum[]> {
}

/**
 * @stable [10.03.2019]
 */
export const TOOLBAR_TOOLS_FILTER_ACTION_TYPE = 'toolbar.tools.filter';
export const TOOLBAR_TOOLS_REFRESH_ACTION_TYPE = 'toolbar.tools.refresh';
