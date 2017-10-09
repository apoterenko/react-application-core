import {
  IBaseComponentInternalProps,
  IBaseContainerInternalProps,
} from '../../../component/base';
import { IApplicationListAttributesWrapper, IPageOptions } from '../../../component/list';

export interface IPageToolbarInternalProps extends IBaseComponentInternalProps,
                                                   IPageOptions {
  contentDisplay?: boolean;
  onBackward?(): void;
  onForward?(): void;
}

export interface IPageToolbarContainerInternalProps extends IBaseContainerInternalProps,
                                                            IApplicationListAttributesWrapper {
}

export const PAGER_FORWARD_ACTION_TYPE = 'pager.forward';
export const PAGER_BACKWARD_ACTION_TYPE = 'pager.backward';
