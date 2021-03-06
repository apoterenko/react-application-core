import {
  IDetectFileTypeTransportConfigurationWrapper,
  IDetectFileTypeWrapper,
  ITypeWrapper,
  IUrlWrapper,
  IUsePreviewWrapper,
  IViewerClassNameWrapper,
  IViewerConfigurationWrapper,
  IViewerWrapper,
} from '../definitions.interface';
import {
  IFieldProps,
  IFieldState,
} from './field-definition.interface';
import { ITransportRequestEntity } from './transport-definition.interface';
import {
  IViewerProps,
  ViewersEnum,
} from './viewer-definition.interface';

/**
 * @presets-entity
 * @stable [19.06.2020]
 */
export interface IPresetsViewFieldEntity
  extends IViewerClassNameWrapper,
    IViewerConfigurationWrapper<IViewerProps>,
    IViewerWrapper<ViewersEnum> {
}

/**
 * @generic-entity
 * @stable [19.06.2020]
 */
export interface IGenericViewFieldEntity
  extends IPresetsViewFieldEntity {
}

/**
 * TODO IViewFieldEntity
 */
export interface IViewFieldProps
  extends IFieldProps,
    IGenericViewFieldEntity,
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

/**
 * @classes
 * @stable [19.06.2020]
 */
export enum ViewFieldClassesEnum {
  VIEW_FIELD = 'rac-view-field',
  VIEW_FIELD_VIEWER = 'rac-view-field__viewer',
}
