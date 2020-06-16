import { IMultiFieldProps } from '../component/field/multifield/multifield.interface'; // TODO

/**
 * @stable [01.06.2018]
 */
export interface IChipsFieldProps
  extends IMultiFieldProps {
  chipClassName?: string; // TODO
}

/**
 * @classes
 * @stable [16.06.2020]
 */
export enum ChipsFieldClassesEnum {
  FIELD_CHIP = 'rac-field__chip',
  FIELD_CHIPS = 'rac-field__chips',
}
