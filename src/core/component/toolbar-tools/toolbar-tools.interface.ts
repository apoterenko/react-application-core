import { IContainerProps } from '../../props-definitions.interface';
import {
  IActionsDisabledWrapper,
  IActionsWrapper,
  IActiveActionsWrapper,
  IFlexWrapper,
  ILeftSlotWrapper,
  IOnDownloadFileClickWrapper,
  IOnFilterClickWrapper,
  IOnRefreshClickWrapper,
  IRightSlotWrapper,
} from '../../definitions.interface';
import { IFlexLayoutEntity, ToolbarToolsEnum } from '../../definition';

/**
 * @stable [11.03.2019]
 */
export interface IToolbarToolsContainerProps
  extends IContainerProps,
    IActionsDisabledWrapper,
    ILeftSlotWrapper<JSX.Element>,
    IRightSlotWrapper<JSX.Element>,
    IFlexWrapper<IFlexLayoutEntity>,
    IOnFilterClickWrapper<() => void>,
    IOnDownloadFileClickWrapper<() => void>,
    IOnRefreshClickWrapper<() => void>,
    IActionsWrapper<ToolbarToolsEnum[]>,
    IActiveActionsWrapper<ToolbarToolsEnum[]> {
}

/**
 * @stable [10.03.2019]
 */
export const TOOLBAR_TOOLS_DOWNLOAD_FILE_ACTION_TYPE = 'toolbar.tools.download.file';
export const TOOLBAR_TOOLS_FILTER_ACTION_TYPE = 'toolbar.tools.filter';
export const TOOLBAR_TOOLS_REFRESH_ACTION_TYPE = 'toolbar.tools.refresh';
