import { PropsUtils, toClassName } from '../../../util';
import { BaseTextField } from '../text-field/base-text-field.component';
import { IApplicationNumberSettings } from '../../../settings';
import {
  INumberFieldInternalState,
  INumberFieldProps,
} from './numberfield.interface';
import { KEYBOARD_NUMERIC_LAYOUT } from '../../keyboard';
import {
  ChangeEventT,
  IFieldInputProps,
  IKeyboardProps,
} from '../../../definition';

export class NumberField extends BaseTextField<INumberFieldProps,
  INumberFieldInternalState> {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<INumberFieldProps>({
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

  /**
   * @stable [14.10.2020]
   * @protected
   */
  protected getInputElementProps(): IFieldInputProps {
    const {
      step,
    } = this.originalProps;

    return {
      ...super.getInputElementProps() as IFieldInputProps,
      step,
    };
  }

  /**
   * @stable [12.10.2020]
   * @protected
   */
  protected getComponentsSettingsProps(): INumberFieldProps {
    return PropsUtils.mergeWithSystemProps(
      super.getComponentsSettingsProps(),
      this.componentsSettings.numberField
    );
  }
}
