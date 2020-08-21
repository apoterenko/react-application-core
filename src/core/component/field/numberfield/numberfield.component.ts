import { PropsUtils, toClassName } from '../../../util';
import { BaseTextField } from '../text-field/base-text-field.component';
import { IApplicationNumberSettings } from '../../../settings';
import {
  INumberFieldInternalState,
  INumberFieldInternalProps,
} from './numberfield.interface';
import { KEYBOARD_NUMERIC_LAYOUT } from '../../keyboard';
import {
  ChangeEventT,
  IKeyboardProps,
} from '../../../definition';

export class NumberField extends BaseTextField<INumberFieldInternalProps,
                                                INumberFieldInternalState> {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<INumberFieldInternalProps>({
    clearActionRendered: false,
    // We can't use number type because an input field throws an empty value on change if valid = false
  }, BaseTextField);

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
