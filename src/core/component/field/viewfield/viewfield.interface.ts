import { IFieldProps, IComponentProps } from '../../../props-definitions.interface';
import { IViewerWrapper, IDefaultSrcWrapper, ISrcWrapper, IUsePreviewWrapper } from '../../../definitions.interface';
import { IReactComponentClassEntity } from '../../../entities-definitions.interface';

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
                                         IViewerWrapper<IReactComponentClassEntity<IViewFieldViewerProps>>,
                                         IUsePreviewWrapper {
}
