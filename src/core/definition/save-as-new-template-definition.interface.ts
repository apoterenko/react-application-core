import { IGenericComponentProps } from './generic-component-definition.interface';
import {
  IActionWrapper,
  IFieldWrapper,
  IFormWrapper,
  IOnBeforeDialogShowWrapper,
  IOnSelectWrapper,
} from '../definitions.interface';
import { IField } from './field-definition.interface';
import { IFluxEntity } from './flux-definition.interface';

/**
 * @presets-entity
 * @stable [05.03.2021]
 */
export interface IPresetsSaveAsNewTemplateEntity
  extends IFieldWrapper<React.RefObject<IField>>,
    IFormWrapper<JSX.Element>,
    IOnBeforeDialogShowWrapper<SaveAsNewTemplateActionsEnum>,
    IOnSelectWrapper<SaveAsNewTemplateActionsEnum> {
}

/**
 * @generic-entity
 * @stable [05.03.2021]
 */
export interface IGenericSaveAsNewTemplateEntity
  extends IPresetsSaveAsNewTemplateEntity {
}

/**
 * @props
 * @stable [05.03.2021]
 */
export interface ISaveAsNewTemplateProps
  extends IGenericComponentProps,
    IGenericSaveAsNewTemplateEntity {
}

/**
 * @state
 * @stable [24.03.2021]
 */
export interface ISaveAsNewTemplateState
  extends IActionWrapper<SaveAsNewTemplateActionsEnum> {
}

/**
 * @enum
 * @stable [05.03.2021]
 */
export enum SaveAsNewTemplateActionsEnum {
  DELETE,
  OVERWRITE,
  RESTORE,
  SAVE_AS,
  SAVE_AS_NEW,
}

/**
 * @stable [24.03.2021]
 * @flux-entity
 */
export interface ISaveAsNewTemplateActionFluxEntity
  extends IFluxEntity<SaveAsNewTemplateActionsEnum> {
}

/**
 * @classes
 * @stable [05.03.2021]
 */
export enum SaveAsNewTemplateClassesEnum {
  SAVE_AS_NEW_TEMPLATE = 'rac-save-as-new-template',
}
