import { IField2State } from '../field';
import { IFieldProps2 } from '../../../configurations-definitions.interface';
import {
  IFieldInputAttributes,
  IGenericBaseCheckboxEntity,
} from '../../../definition';

/**
 * @stable [31.08.2018]
 */
export interface IBaseCheckboxState extends IField2State {
}

/**
 * @stable [31.08.2018]
 */
export interface IBaseCheckboxProps
  extends IFieldProps2,
    IGenericBaseCheckboxEntity {
}

/**
 * @stable [31.08.2018]
 */
export interface ICheckboxState extends IBaseCheckboxState {
}

/**
 * @stable [31.08.2018]
 */
export interface ICheckboxProps extends IBaseCheckboxProps {
}

/**
 * @stable [31.08.2018]
 */
export interface IBaseCheckboxInputProps extends IFieldInputAttributes {
}
