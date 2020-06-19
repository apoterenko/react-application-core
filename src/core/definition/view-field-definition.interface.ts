import { IFieldProps2 } from '../configurations-definitions.interface';
import {
  IDetectFileTypeTransportConfigurationWrapper,
  IDetectFileTypeWrapper,
  ITypeWrapper,
  IUrlWrapper,
  IUsePreviewWrapper,
  IViewerClassNameWrapper,
  IViewerWrapper,
} from '../definitions.interface';
import { IField2State } from '../component/field/field/field.interface';
import { ITransportRequestEntity } from './transport-definition.interface';
import { ViewersEnum } from './viewer-definition.interface';

/**
 * @presets-entity
 * @stable [19.06.2020]
 */
export interface IPresetsViewFieldEntity
  extends IViewerClassNameWrapper,
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
  extends IFieldProps2,
    IGenericViewFieldEntity,
    IUsePreviewWrapper,
    IDetectFileTypeWrapper,
    IDetectFileTypeTransportConfigurationWrapper<ITransportRequestEntity> {
}

/**
 * @stable [29.07.2019]
 */
export interface IViewFieldState
  extends IField2State,
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
