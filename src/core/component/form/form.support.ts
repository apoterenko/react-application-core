import * as R from 'ramda';

import { IFieldConfiguration, ITabConfiguration, ITabPanelConfiguration } from '../../configurations-definitions.interface';
import { IFormProps } from '../../definition';
import { isTabActive, getTabActiveValue } from '../tabpanel/tabpanel.support';
import { isFormEntityDisabled } from '../../util';

/**
 * @stable [29.05.2018]
 * @param {IFormProps} formProps
 * @param {IFieldConfiguration} fieldProps
 * @returns {boolean}
 */
export const isFormFieldDisabled = (formProps: IFormProps,
                                    fieldProps: IFieldConfiguration): boolean =>
  R.isNil(fieldProps.disabled)
    ? isFormEntityDisabled(formProps)
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
export const isFormDirty = (formProps: IFormProps): boolean =>
  formProps.alwaysDirty || formProps.form.dirty === true;

/**
 * @stable [03.08.2018]
 * @param {IFormProps} formProps
 * @returns {boolean}
 */
export const isFormSubmittable = (formProps: IFormProps): boolean =>
  isFormValid(formProps)
    && isFormDirty(formProps)
    && !isFormEntityDisabled(formProps);

/**
 * @stable [15.02.2019]
 * @param {IFormProps} formProps
 * @returns {boolean}
 */
export const isFormResettable = (formProps: IFormProps): boolean =>
  formProps.alwaysResettable === true || isFormSubmittable(formProps);

/**
 * @stable [29.05.2018]
 * @param {IFormProps} formProps
 * @returns {boolean}
 */
export const isFormOfNewEntity = (formProps: IFormProps): boolean => R.isNil(formProps.entity) || R.isNil(formProps.entity.id);

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
