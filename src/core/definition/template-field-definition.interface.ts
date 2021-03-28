import { IEnhancedGenericComponentProps } from './enhanced-generic-component-definition.interface';
import {
  IPresetsFieldEntity,
  IReduxFieldEntity,
} from './field-definition.interface';
import {
  IProjectIdWrapper,
  ITagsWrapper,
  IUrlWrapper,
  IUserWrapper,
} from '../definitions.interface';
import {
  INamedEntity,
} from './entity-definition.interface';
import { IUnlayerEditorMergeTagsEntity } from './unlayer-definition.interface';

/**
 * @presets-entity
 * @stable [26.03.2021]
 */
export interface IPresetsTemplateFieldEntity
  extends IPresetsFieldEntity,
    IProjectIdWrapper,
    ITagsWrapper<IUnlayerEditorMergeTagsEntity>,
    IUrlWrapper,
    IUserWrapper<INamedEntity> {
}

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxTemplateFieldEntity
  extends IReduxFieldEntity {
}

/**
 * @generic-entity
 * @stable [26.03.2021]
 */
export interface IGenericTemplateFieldEntity
  extends IPresetsTemplateFieldEntity,
    IReduxTemplateFieldEntity {
}

/**
 * @props
 * @stable [26.03.2021]
 */
export interface ITemplateFieldProps
  extends IEnhancedGenericComponentProps,
    IGenericTemplateFieldEntity {
}

/**
 * @enum
 * @stable [26.03.2021]
 */
export enum TemplateFieldClassesEnum {
  TEMPLATE_FIELD = 'rac-template-field',
}
