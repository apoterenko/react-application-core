import { BasicTextField } from '../textfield';
import { IApplicationDateTimeSettings } from '../../../settings';
import {
  ITimeField,
  ITimeFieldInternalState,
  ITimeFieldInternalProps,
} from './timefield.interface';

export class TimeField extends BasicTextField<TimeField,
                                              ITimeFieldInternalProps,
                                              ITimeFieldInternalState>
    implements ITimeField {

  public static defaultProps: ITimeFieldInternalProps = {
    clearAction: false,
  };

  protected getFieldMask(): Array<string|RegExp> {
    return super.getFieldMask() || this.dateTimeSettings.uiTimeMask;
  }

  protected getFieldPattern(): string {
    return super.getFieldPattern() || this.dateTimeSettings.uiTimePattern;
  }

  private get dateTimeSettings(): IApplicationDateTimeSettings {
    return this.applicationSettings.dateTimeSettings || {};
  }
}
