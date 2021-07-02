import { PropsUtils, toClassName } from '../../../util';
import { BaseTextField } from '../text-field/base-text-field.component';
import {
  INumberFieldInternalState,
  INumberFieldProps,
} from './numberfield.interface';
import { KEYBOARD_NUMERIC_LAYOUT } from '../../keyboard';
import {
  ChangeEventT,
  IKeyboardProps,
} from '../../../definition';
import { StringNumberT } from '../../../definitions.interface';

export class NumberField extends BaseTextField<INumberFieldProps,
  INumberFieldInternalState> {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<INumberFieldProps>({
    clearActionRendered: false,
    // We can't use number type because an input field throws an empty value on change if valid = false
  }, BaseTextField);

  /**
   * @stable [01.07.2021]
   * @param event
   */
  public getRawValueFromEvent(event: ChangeEventT): StringNumberT {
    return this.nc.number(super.getRawValueFromEvent(event));
  }

  /**
   * @stable [01.02.2020]
   * @returns {IKeyboardProps}
   */
  protected getKeyboardProps(): IKeyboardProps {
    return {
      layout: [KEYBOARD_NUMERIC_LAYOUT],
      ...super.getKeyboardProps(),
    };
  }

  /**
   * @stable [02.05.2019]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return toClassName(super.getFieldClassName(), 'rac-number-field');
  }

  /**
   * @stable [01.07.2021]
   */
  protected getComponentSettingsProps(): Readonly<INumberFieldProps> {
    return PropsUtils.extendProps(
      super.getComponentSettingsProps(),
      this.componentsSettings?.numberField
    );
  }
}
