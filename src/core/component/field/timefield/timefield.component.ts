import {
  BasicTextField,
  INativeMaterialBasicTextFieldComponent,
} from '../textfield';
import { IKeyValue } from '../../../definition.interface';
import { IApplicationDateTimeSettings } from '../../../settings';
import {
  ITimeField,
  ITimeFieldInternalState,
  ITimeFieldInternalProps,
} from './timefield.interface';

export class TimeField extends BasicTextField<TimeField,
                                              ITimeFieldInternalProps,
                                              ITimeFieldInternalState,
                                              INativeMaterialBasicTextFieldComponent>
    implements ITimeField {

  protected getComponentProps(): IKeyValue {
    return {
      ...super.getComponentProps(),

      mask: this.fieldMask,
      pattern: this.fieldPattern,
    };
  }

  private get fieldMask(): Array<string|RegExp> {
    return this.props.mask || this.dateTimeSettings.uiTimeMask;
  }

  private get fieldPattern(): string {
    return this.props.pattern || this.dateTimeSettings.uiTimePattern;
  }

  private get dateTimeSettings(): IApplicationDateTimeSettings {
    return this.applicationSettings.dateTimeSettings || {};
  }
}
