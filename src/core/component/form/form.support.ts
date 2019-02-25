import * as R from 'ramda';

import { Operation } from '../../operation';
import { IEntity, AnyT } from '../../definitions.interface';
import { IApiEntity } from '../../entities-definitions.interface';
import { IFieldConfiguration, ITabConfiguration, ITabPanelConfiguration } from '../../configurations-definitions.interface';
import { IFormProps } from './form.interface';
import { defValuesFilter } from '../../util';
import { isTabActive, getTabActiveValue } from '../tabpanel/tabpanel.support';
import { UniversalField } from '../field/field/universal-field.component';

/**
 * TODO api support buildApiEntity
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
 * @stable [16.11.2018]
 * @param {IFormProps} formProps
 * @param {IFieldConfiguration} fieldProps
 * @returns {boolean}
 */
export const isFormFieldChangeable = (formProps: IFormProps,
                                      fieldProps: IFieldConfiguration): boolean =>
  R.isNil(fieldProps.changeable)
    ? isFormChangeable(formProps)
    : fieldProps.changeable !== false;

/**
 * @stable [29.05.2018]
 * @param {IFormProps} formProps
 * @returns {boolean}
 */
export const isFormDisabled = (formProps: IFormProps): boolean =>
  formProps.disabled === true || formProps.form.progress === true;

/**
 * @stable [16.11.2018]
 * @param {IFormProps} formProps
 * @returns {boolean}
 */
export const isFormChangeable = (formProps: IFormProps): boolean => formProps.changeable !== false;

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
 * @stable [15.02.2019]
 * @param {IFormProps} formProps
 * @returns {boolean}
 */
export const isFormResettable = (formProps: IFormProps): boolean => formProps.alwaysResettable || isFormDirty(formProps);

/**
 * @stable [29.05.2018]
 * @param {IFormProps} formProps
 * @returns {boolean}
 */
export const isFormOfNewEntity = (formProps: IFormProps): boolean => R.isNil(formProps.entity) || R.isNil(formProps.entity.id);

/**
 * @stable [25.02.2019]
 * @param {IFormProps} formProps
 * @returns {boolean}
 */
export const isFormBusy = (formProps: IFormProps): boolean => formProps.progress || formProps.form.progress;

/**
 * @stable [30.08.2018]
 * @param {IFormProps} formProps
 * @param {ITabConfiguration} tab
 * @returns {boolean}
 */
export const isFormTabActive = (formProps: IFormProps, tab: ITabConfiguration): boolean =>
  isTabActive(formProps.form, tab);

/**
 * @stable [30.08.2018]
 * @param {IFormProps} formProps
 * @param {ITabPanelConfiguration} tabPanelConfiguration
 * @returns {number}
 */
export const getFormTabActiveValue = (formProps: IFormProps, tabPanelConfiguration: ITabPanelConfiguration): number =>
  getTabActiveValue(formProps.form, tabPanelConfiguration);
