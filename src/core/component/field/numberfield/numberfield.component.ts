import { toClassName } from '../../../util';
import { BaseTextField } from '../text-field';
import { IApplicationNumberSettings } from '../../../settings';
import {
  INumberField,
  INumberFieldInternalState,
  INumberFieldInternalProps,
} from './numberfield.interface';
import { ChangeEventT } from '../../../definitions.interface';
import { KEYBOARD_NUMERIC_LAYOUT } from '../../keyboard';
import { IKeyboardProps } from '../../../definition';

export class NumberField extends BaseTextField<INumberFieldInternalProps,
                                                INumberFieldInternalState>
    implements INumberField {

  // We can't use number type because an input field throws an empty value on change if valid = false
  public static defaultProps: INumberFieldInternalProps = {
    clearActionRendered: false,
  };

  public getRawValueFromEvent(event: ChangeEventT): number | string {
    return this.nc.number(super.getRawValueFromEvent(event));
  }

  protected getFieldPattern(): string {
    return super.getFieldPattern() || this.numberSettings.uiPattern;
  }

  private get numberSettings(): IApplicationNumberSettings {
    return this.settings.number || {};
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
}
