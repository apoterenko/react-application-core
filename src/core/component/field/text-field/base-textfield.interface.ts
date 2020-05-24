import { IField2State } from '../field/field.interface';
import { IFieldProps2 } from '../../../configurations-definitions.interface';
import { IPresetsBaseTextFieldEntity } from '../../../definition';

/**
 * @stable [25.02.2019]
 */
export interface IBaseTextFieldState
  extends IField2State {
}

/**
 * @stable [25.02.2019]
 */
export interface IBaseTextFieldProps
  extends IPresetsBaseTextFieldEntity,
    IFieldProps2 {
}
