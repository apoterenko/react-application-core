import {
  IFormEntity,
  IFormWrapperEntity,
  IGenericFieldEntity,
  IGenericFormEntity,
} from '../definition';
import { IEntity } from '../definitions.interface';
import { ifNotNilThanValue } from './cond';
import { inProgress, isValid } from './wrapper';
import { nvl } from './nvl';
import { selectEditableEntity } from './mapper';

/**
 * @stable [25.09.2019]
 * @param {IFormEntity<TEntity>} entity
 * @returns {boolean}
 */
export const isFormEntityDisabled = <TEntity = IEntity>(entity: IFormEntity<TEntity>): boolean =>
  ifNotNilThanValue(
    entity,
    () => entity.disabled === true || isFormWrapperEntityInProgress(entity),
    false
  );

/**
 * @stable [25.10.2019]
 * @param {IFormEntity<TEntity extends IEntity>} entity
 * @returns {boolean}
 */
export const isFormEntityValid = <TEntity extends IEntity = IEntity>(entity: IFormEntity<TEntity>): boolean =>
  isValid(entity) && isValid(selectEditableEntity<TEntity>(entity)); // Redux or auto validation

/**
 * @stable [25.10.2019]
 * @param {IFormWrapperEntity<TEntity extends IEntity>} entity
 * @returns {boolean}
 */
export const isFormWrapperEntityInProgress = <TEntity extends IEntity>(entity: IFormWrapperEntity<TEntity>): boolean =>
  inProgress(selectEditableEntity<TEntity>(entity));

/**
 * @stable [25.09.2019]
 * @param {IGenericFormEntity} formEntity
 * @param {IGenericFieldEntity} fieldProps
 * @returns {boolean}
 */
export const isFormFieldReadOnly = (formEntity: IGenericFormEntity,
                                    fieldProps: IGenericFieldEntity): boolean =>
  nvl(
    ifNotNilThanValue(fieldProps, () => fieldProps.readOnly),
    ifNotNilThanValue(formEntity, () => formEntity.readOnly),
  ) === true;
