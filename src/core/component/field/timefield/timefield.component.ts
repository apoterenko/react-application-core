import {
  BasicTextField,
  INativeMaterialBasicTextFieldComponent,
} from '../textfield';

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

  public static defaultProps: ITimeFieldInternalProps = {
    mask: [/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/],
  };
}
