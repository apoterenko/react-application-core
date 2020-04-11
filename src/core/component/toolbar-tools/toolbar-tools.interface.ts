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
import { IGenericFlexLayoutEntity, ToolbarToolsEnum, IGenericContainerProps } from '../../definition';

/**
 * @stable [11.03.2019]
 */
export interface IToolbarToolsContainerProps
  extends IGenericContainerProps,
    IActionsDisabledWrapper,
    ILeftSlotWrapper<JSX.Element>,
    IRightSlotWrapper<JSX.Element>,
    IFlexWrapper<IGenericFlexLayoutEntity>,
    IOnFilterClickWrapper<() => void>,
    IOnDownloadFileClickWrapper<() => void>,
    IOnRefreshClickWrapper<() => void>,
    IActionsWrapper<ToolbarToolsEnum[]>,
    IActiveActionsWrapper<ToolbarToolsEnum[]> {
}
