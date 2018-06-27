import { IFieldState } from '../field';
import { IFieldProps, IComponentProps } from '../../../props-definitions.interface';
import { IViewerWrapper, IDefaultSrcWrapper, ISrcWrapper } from '../../../definitions.interface';
import { IComponentClassEntity } from '../../../entities-definitions.interface';

/**
 * @stable [26.06.2018]
 */
export interface IViewFieldState extends IFieldState {
}

/**
 * @stable [27.06.2018]
 */
export interface IViewFieldViewerProps extends IComponentProps,
                                               ISrcWrapper,
                                               IDefaultSrcWrapper {
}

/***
 * @stable [26.06.2018]
 */
export interface IViewFieldProps extends IFieldProps,
                                         IViewerWrapper<IComponentClassEntity<IViewFieldViewerProps>> {
}
