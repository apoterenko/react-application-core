import * as R from 'ramda';

import { Operation } from '../../operation';
import { IEntity } from '../../definitions.interface';
import {
  IDefaultApiEntity,
  IDefaultFormWrapperEntity,
} from '../../entities-definitions.interface';
import {
  IFormConfiguration,
  IFieldConfiguration,
} from '../../configurations-definitions.interface';

export type SupportFormT = IFormConfiguration & IDefaultFormWrapperEntity;
export type SupportFieldT = IFieldConfiguration;

/**
 * @stable - 11.04.2018
 * @param {IEntity} changes
 * @param {IEntity} entity
 * @param {string} operationId
 * @returns {IDefaultApiEntity}
 */
export const buildApiEntity = (changes: IEntity, entity?: IEntity, operationId?: string): IDefaultApiEntity => {
  const entityId = entity && entity.id;
  const merger = {
    ...entity,
    ...changes,
  };

  const apiEntity: IDefaultApiEntity = (
    R.isNil(entityId)
      // You should use formMapper at least (simple form)
      ? { isNew: true, changes: {...changes}, merger, }

      // You should use formMapper and entityMapper at least (editable entity)
      : { isNew: false, changes: {...changes}, entity: {...entity}, merger, id: entityId }
  );
  return {
    operation: Operation.create(operationId),
    ...apiEntity,
  };
};

/**
 * @stable - 11.04.2018
 * @param {SupportFormT} formProps
 * @param {SupportFieldT} fieldProps
 * @returns {boolean}
 */
export const isFormFieldReadOnly = (formProps: SupportFormT,
                                    fieldProps: SupportFieldT): boolean =>
  (R.isNil(fieldProps.readOnly) ? formProps.readOnly : fieldProps.readOnly) === true;

/**
 * @stable - 11.04.2018
 * @param {SupportFormT} formProps
 * @param {SupportFieldT} fieldProps
 * @returns {boolean}
 */
export const isFormFieldDisabled = (formProps: SupportFormT,
                                    fieldProps: SupportFieldT): boolean =>
  R.isNil(fieldProps.disabled)
    ? isFormDisabled(formProps)
    : fieldProps.disabled === true;

/**
 * @stable - 11.04.2018
 * @param {SupportFormT} formProps
 * @returns {boolean}
 */
export const isFormDisabled = (formProps: SupportFormT): boolean =>
  formProps.disabled === true || formProps.form.progress === true;
