import { BasicTextField } from '../textfield';
import { IApplicationNumberSettings } from '../../../settings';
import {
  INumberField,
  INumberFieldInternalState,
  INumberFieldInternalProps,
} from './numberfield.interface';
import { ChangeEventT } from '../../../definitions.interface';
import { IKeyboardConfiguration, KEYBOARD_NUMERIC_LAYOUT } from '../../keyboard';

export class NumberField extends BasicTextField<NumberField,
                                                INumberFieldInternalProps,
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
   * @stable [21.11.2018]
   * @returns {IKeyboardConfiguration}
   */
  protected getKeyboardConfiguration(): IKeyboardConfiguration{
    return {
      layout: [KEYBOARD_NUMERIC_LAYOUT],
    };
  }
}
