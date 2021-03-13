import { IGenericComponentProps } from './generic-component-definition.interface';
import { IOnSelectWrapper } from '../definitions.interface';

/**
 * @presets-entity
 * @stable [05.03.2021]
 */
export interface IPresetsSaveAsNewTemplateEntity
  extends IOnSelectWrapper<SaveAsNewTemplateMenuActionsEnum> {
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
 * @enum
 * @stable [05.03.2021]
 */
export enum SaveAsNewTemplateMenuActionsEnum {
  DELETE,
  OVERWRITE,
  RESTORE,
  SAVE_AS_NEW,
}

/**
 * @classes
 * @stable [05.03.2021]
 */
export enum SaveAsNewTemplateClassesEnum {
  SAVE_AS_NEW_TEMPLATE = 'rac-save-as-new-template',
}
