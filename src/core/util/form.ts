import {
  IFormEntity,
  IFormWrapperEntity,
  IGenericFieldEntity,
  IGenericFormEntity,
} from '../definition';
import { IEntity } from '../definitions.interface';
import { nvl } from './nvl';
import { ifNotNilThanValue } from './cond';
import { isEditableEntityBusy } from './entity';
import { selectEditableEntity } from './mapper';

/**
 * @stable [25.09.2019]
 * @param {IFormEntity<TEntity>} entity
 * @returns {boolean}
 */
export const isFormEntityDisabled = <TEntity = IEntity>(entity: IFormEntity<TEntity>): boolean =>
  ifNotNilThanValue(
    entity,
    () => entity.disabled === true || isFormWrapperEntityBusy(entity),
    false
  );

/**
 * @stable [25.09.2019]
 * @param {IFormWrapperEntity<TEntity extends IEntity>} entity
 * @returns {boolean}
 */
export const isFormWrapperEntityBusy = <TEntity extends IEntity>(entity: IFormWrapperEntity<TEntity>): boolean =>
  isEditableEntityBusy(selectEditableEntity(entity));

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
