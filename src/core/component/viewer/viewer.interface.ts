import {
  IOpenedWrapper,
  IErrorWrapper,
} from '../../definitions.interface';
import { IComponentProps } from '../../props-definitions.interface';
import { IViewerEntity } from '../../definition';

/**
 * @stable [19.09.2018]
 */
export interface IViewerProps
  extends IComponentProps,
    IViewerEntity {
}

/**
 * @stable [08.06.2018]
 */
export interface IViewerState
  extends IErrorWrapper<Error>,
    IOpenedWrapper {
}
