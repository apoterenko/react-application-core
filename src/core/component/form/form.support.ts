import * as R from 'ramda';

import { Operation } from '../../operation';
import { IEntity } from '../../definitions.interface';
import { IApiEntity } from '../../entities-definitions.interface';
import { IFieldConfiguration, ITabConfiguration } from '../../configurations-definitions.interface';
import { IFormProps } from './form.interface';
import { defValuesFilter } from '../../util';

/**
 * @stable - 11.04.2018
 * @param {IEntity} changes
 * @param {IEntity} entity
 * @param {IEntity} originalEntity
 * @param {string} operationId
 * @returns {IApiEntity}
 */
export const buildApiEntity = (changes: IEntity, entity?: IEntity, originalEntity?: IEntity, operationId?: string): IApiEntity => {
  const entityId = entity && entity.id;
  const merger = {
    ...entity,
    ...changes,
  };

  const apiEntity: IApiEntity = (
    R.isNil(entityId)
      // You should use formMapper at least (simple form)
      ? { isNew: true, changes: {...changes}, merger, }

      // You should use formMapper and entityMapper at least (editable entity)
      : defValuesFilter(
        {
          isNew: false,
          id: entityId,
          changes: {...changes},
          merger,
          entity: R.isNil(entity) ? entity : {...entity},
          originalEntity: R.isNil(originalEntity) ? originalEntity : {...originalEntity},
        })
  );
  return {
    operation: Operation.create(operationId),
    ...apiEntity,
  };
};

/**
 * @stable [29.05.2018]
 * @param {IFormProps} formProps
 * @param {IFieldConfiguration} fieldProps
 * @returns {boolean}
 */
export const isFormFieldReadOnly = (formProps: IFormProps,
                                    fieldProps: IFieldConfiguration): boolean =>
  (R.isNil(fieldProps.readOnly) ? formProps.readOnly : fieldProps.readOnly) === true;

/**
 * @stable [29.05.2018]
 * @param {IFormProps} formProps
 * @param {IFieldConfiguration} fieldProps
 * @returns {boolean}
 */
export const isFormFieldDisabled = (formProps: IFormProps,
                                    fieldProps: IFieldConfiguration): boolean =>
  R.isNil(fieldProps.disabled)
    ? isFormDisabled(formProps)
    : fieldProps.disabled === true;

/**
 * @stable [29.05.2018]
 * @param {IFormProps} formProps
 * @returns {boolean}
 */
export const isFormDisabled = (formProps: IFormProps): boolean =>
  formProps.disabled === true || formProps.form.progress === true;

/**
 * @stable [03.08.2018]
 * @param {IFormProps} formProps
 * @returns {boolean}
 */
export const isFormValid = (formProps: IFormProps): boolean =>
  R.isNil(formProps.form.valid) || formProps.form.valid === true;

/**
 * @stable [29.05.2018]
 * @param {IFormProps} formProps
 * @returns {boolean}
 */
export const isFormEditable = (formProps: IFormProps): boolean =>
  R.isNil(formProps.editable) || formProps.editable === true;

/**
 * @stable [29.05.2018]
 * @param {IFormProps} formProps
 * @returns {boolean}
 */
export const isFormDirty = (formProps: IFormProps): boolean =>
  formProps.alwaysDirty || formProps.form.dirty === true;

/**
 * @stable [03.08.2018]
 * @param {IFormProps} formProps
 * @returns {boolean}
 */
export const isFormSubmittable = (formProps: IFormProps): boolean =>
  isFormValid(formProps)
    && isFormEditable(formProps)
    && isFormDirty(formProps)
    && !isFormDisabled(formProps);

/**
 * @stable [29.05.2018]
 * @param {IFormProps} formProps
 * @returns {boolean}
 */
export const isFormNewEntity = (formProps: IFormProps): boolean => R.isNil(formProps.entity) || R.isNil(formProps.entity.id);

/**
 * @stable [14.08.2018]
 * @param {IFormProps} formProps
 * @param {ITabConfiguration} tab
 * @returns {boolean}
 */
export const isFormTabActive = (formProps: IFormProps, tab: ITabConfiguration): boolean =>
  R.isNil(formProps.form.activeValue) ? !!tab.active : formProps.form.activeValue === tab.value;

/**
 * @stable [14.08.2018]
 * @param {IFormProps} formProps
 * @param {ITabConfiguration[]} tabs
 * @returns {number}
 */
export const getFormTabActiveValue = (formProps: IFormProps, tabs: ITabConfiguration[]): number => {
  const currentActiveValue = formProps.form.activeValue;
  if (!R.isNil(currentActiveValue)) {
    return currentActiveValue;
  }
  const activeTab = tabs.find((tab) => tab.active);
  if (R.isNil(activeTab)) {
    return tabs[0].value;
  }
  return activeTab.value;
};
