import { IFieldProps2 } from '../../../configurations-definitions.interface';
import {
  IDetectFileTypeTransportConfigurationWrapper,
  IDetectFileTypeWrapper,
  ITypeWrapper,
  IUrlWrapper,
  IUsePreviewWrapper,
  IViewerWrapper,
} from '../../../definitions.interface';
import { IFieldState } from '../field/field.interface';
import { ITransportRequestEntity, IComponentCtor, IViewerProps } from '../../../definition';

/**
 * TODO IViewFieldEntity
 */
export interface IViewFieldProps
  extends IFieldProps2,
    IViewerWrapper<IComponentCtor<IViewerProps>>,
    IUsePreviewWrapper,
    IDetectFileTypeWrapper,
    IDetectFileTypeTransportConfigurationWrapper<ITransportRequestEntity> {
}

/**
 * @stable [29.07.2019]
 */
export interface IViewFieldState
  extends IFieldState,
    IUrlWrapper,
    ITypeWrapper {
}
