import { IFieldProps, IComponentProps } from '../../../props-definitions.interface';
import {
  IDefaultSrcWrapper,
  ISrcWrapper,
  IUrlWrapper,
  IUsePreviewWrapper,
  IViewerWrapper,
} from '../../../definitions.interface';
import { IReactComponentClassEntity } from '../../../entities-definitions.interface';
import { IFieldState } from '../field/field.interface';

/**
 * @stable [27.06.2018]
 */
export interface IViewFieldViewerProps extends IComponentProps,
                                               ISrcWrapper,
                                               IDefaultSrcWrapper {
}

/**
 * @stable [26.06.2018]
 */
export interface IViewFieldProps
  extends IFieldProps,
    IViewerWrapper<IReactComponentClassEntity<IViewFieldViewerProps>>,
    IUsePreviewWrapper {
}

/**
 * @stable [29.07.2019]
 */
export interface IViewFieldState
  extends IFieldState,
    IUrlWrapper {
}
