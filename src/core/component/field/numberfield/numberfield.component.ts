import { BasicTextField } from '../textfield';
import { IApplicationNumberSettings } from '../../../settings';
import {
  INumberField,
  INumberFieldInternalState,
  INumberFieldInternalProps,
} from './numberfield.interface';
import { ChangeEventT } from '../../../definitions.interface';

export class NumberField extends BasicTextField<NumberField,
                                                INumberFieldInternalProps,
                                                INumberFieldInternalState>
    implements INumberField {

  public static defaultProps: INumberFieldInternalProps = {
    clearAction: false,
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
}
