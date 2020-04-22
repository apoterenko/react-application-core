import {
  IActionsDisabledWrapper,
  IActionsWrapper,
  IActiveActionsWrapper,
  IFlexWrapper,
  ILeftContentWrapper,
  IOnDownloadFileClickWrapper,
  IOnFilterClickWrapper,
  IOnRefreshClickWrapper,
  IRightContentWrapper,
} from '../../definitions.interface';
import { IGenericFlexLayoutEntity, ToolbarToolsEnum, IGenericContainerProps } from '../../definition';

/**
 * @stable [11.03.2019]
 */
export interface IDeprecatedToolbarToolsContainerProps
  extends IGenericContainerProps,
    IActionsDisabledWrapper,
    ILeftContentWrapper<JSX.Element>,
    IRightContentWrapper<JSX.Element>,
    IFlexWrapper<IGenericFlexLayoutEntity>,
    IOnFilterClickWrapper<() => void>,
    IOnDownloadFileClickWrapper<() => void>,
    IOnRefreshClickWrapper<() => void>,
    IActionsWrapper<ToolbarToolsEnum[]>,
    IActiveActionsWrapper<ToolbarToolsEnum[]> {
}
