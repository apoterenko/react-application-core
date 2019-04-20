import { IContainerProps } from '../../props-definitions.interface';
import {
  IActionsWrapper,
  IOnFilterClickWrapper,
  IOnRefreshClickWrapper,
  IFlexWrapper,
  IRightSlotWrapper,
  ILeftSlotWrapper,
  IActionsDisabledWrapper,
  IOnDownloadFileClickWrapper,
} from '../../definitions.interface';
import { IGenericFlexLayoutEntity } from '../../definition';

/**
 * @stable [11.03.2019]
 */
export enum ToolbarToolsEnum {
  DOWNLOAD_FILE,
  FILTER,
  REFRESH,
}

/**
 * @stable [11.03.2019]
 */
export interface IToolbarToolsContainerProps
  extends IContainerProps,
    IActionsDisabledWrapper,
    ILeftSlotWrapper<JSX.Element>,
    IRightSlotWrapper<JSX.Element>,
    IFlexWrapper<IGenericFlexLayoutEntity>,
    IOnFilterClickWrapper<() => void>,
    IOnDownloadFileClickWrapper<() => void>,
    IOnRefreshClickWrapper<() => void>,
    IActionsWrapper<ToolbarToolsEnum[]> {
}

/**
 * @stable [10.03.2019]
 */
export const TOOLBAR_TOOLS_DOWNLOAD_FILE_ACTION_TYPE = 'toolbar.tools.download.file';
export const TOOLBAR_TOOLS_FILTER_ACTION_TYPE = 'toolbar.tools.filter';
export const TOOLBAR_TOOLS_REFRESH_ACTION_TYPE = 'toolbar.tools.refresh';
