import * as R from 'ramda';

import {
  IFieldProps,
} from '../../configurations-definitions.interface';
import {
  IFormProps,
  ITabProps,
} from '../../definition';
import {
  isTabActive,
  getTabActiveValue,
} from '../tabpanel/tabpanel.support';
import {
  isFormDirty,
  isFormDisabled,
} from '../../util';

/**
 * @stable [29.05.2018]
 * @param {IFormProps} formProps
 * @param {IFieldProps} fieldProps
 * @returns {boolean}
 */
export const isFormFieldDisabled = (formProps: IFormProps,
                                    fieldProps: IFieldProps): boolean =>
  R.isNil(fieldProps.disabled)
    ? isFormDisabled(formProps)
    : fieldProps.disabled === true;

/**
 * @stable [16.11.2018]
 * @param {IFormProps} formProps
 * @param {IFieldProps} fieldProps
 * @returns {boolean}
 */
export const isFormFieldChangeable = (formProps: IFormProps,
                                      fieldProps: IFieldProps): boolean =>
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
 * @stable [15.02.2019]
 * @param {IFormProps} formProps
 * @returns {boolean}
 */
export const isFormResettable = (formProps: IFormProps): boolean =>
  formProps.alwaysResettable === true
  || (isFormDirty(formProps) && !isFormDisabled(formProps));

/**
 * @stable [30.08.2018]
 * @param {IFormProps} formProps
 * @param {IGenericTabEntity} tab
 * @returns {boolean}
 */
export const isFormTabActive = (formProps: IFormProps, tab: ITabProps): boolean =>
  isTabActive(formProps.form, tab);

/**
 * @stable [30.08.2018]
 * @param {IFormProps} formProps
 * @param {ITabPanelConfiguration} tabPanelConfiguration
 * @returns {number}
 */
export const getFormTabActiveValue = (formProps: IFormProps, tabPanelConfiguration: ITabProps): number =>
  getTabActiveValue(formProps.form, tabPanelConfiguration);
