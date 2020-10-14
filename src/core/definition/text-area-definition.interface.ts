import { IBaseTextFieldProps } from './text-field-definition.interface';

// TODO
export interface ITextAreaProps
  extends IBaseTextFieldProps {
  rows?: number;
  cols?: number;
}

/**
 * @classes
 * @stable [20.06.2020]
 */
export enum TextAreaClassesEnum {
  TEXT_AREA = 'rac-text-area',
}
