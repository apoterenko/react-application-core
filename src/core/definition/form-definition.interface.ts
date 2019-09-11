import {
  IActionsRenderedWrapper,
  IActionTextWrapper,
  IEntity,
  IFormConfigurationWrapper,
  IFormWrapper,
  IKeyValue,
  IResetTextWrapper,
} from '../definitions.interface';
import { IEditableEntity, IExtendedEntity } from './entity-definition.interface';
import { IFormConfigurationEntity } from '../configurations-definitions.interface';

/**
 * @cross-platform
 * @stable [25.02.2019]
 */
export interface IGenericFormEntity
  extends IActionsRenderedWrapper,
    IActionTextWrapper,
    IResetTextWrapper {
}

/**
 * @stable [02.02.2019]
 */
export interface IFormConfigurationWrapperEntity
  extends IFormConfigurationWrapper<IFormConfigurationEntity> {
}

/**
 * @stable [11.09.2019]
 */
export interface IEditableEntityFormWrapperEntity<TChanges = IKeyValue>
  extends IFormWrapper<IEditableEntity<TChanges>> {
}

/**
 * @stable [11.09.2019]
 */
export interface IEntityFormEntity<TEntity = IEntity>
  extends IEditableEntityFormWrapperEntity<TEntity>,
    IExtendedEntity<TEntity> {
}
