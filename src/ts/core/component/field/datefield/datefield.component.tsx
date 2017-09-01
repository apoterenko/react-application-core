import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as ramda from 'ramda';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';

import { DI_TYPES, lazyInject } from 'core/di';
import { replace } from 'core/util';
import { AnyT, IKeyValue, ChangeEventT } from 'core/definition.interface';
import { BasicTextField } from 'core/component/field/textfield';
import { IDateConverter } from 'core/converter';

import {
  IDateFieldInternalProps,
  IDateFieldInternalState,
  IMaterialDatePickerDialogComponent
} from './datefield.interface';

export class DateField extends BasicTextField<DateField,
                                              IDateFieldInternalProps,
                                              IDateFieldInternalState> {
  static defaultProps: IDateFieldInternalProps = {
    container: 'dialog',
    autoOk: true,
    disabled: false,
    disableYearSelection: false,
    firstDayOfWeek: 1,
    hideCalendarDate: false,
    style: {},
    openToYearSelection: false
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  };

  @lazyInject(DI_TYPES.DateConverter) private dateConverter: IDateConverter;

  constructor(props: IDateFieldInternalProps) {
    super(props);
    this.onAccept = this.onAccept.bind(this);
  }

  public onFocus(event: React.FocusEvent<any>): void {
    super.onFocus(event);
    this.dialogWindow.show();
  }

  public onKeyPress(event: React.KeyboardEvent<AnyT>): void {
    if (event.key === 'Enter' && this.dialogWindow.state.open) {
      this.stopEvent(event);
    }
    super.onKeyPress(event);
  }

  protected getRawValueFromEvent(event: ChangeEventT): Date {
    return this.dateConverter.tryConvertToDate(event.target.value);
  }

  protected getComponent(): JSX.Element {
    const props = this.props;
    return (
        <div className='app-textfield-input-wrapper'>
          {super.getComponent()}
          <DatePickerDialog ref='dialogWindow'
                            autoOk={props.autoOk}
                            cancelLabel={props.cancelLabel}
                            container={props.container}
                            containerStyle={props.dialogContainerStyle}
                            disableYearSelection={props.disableYearSelection}
                            firstDayOfWeek={props.firstDayOfWeek}
                            initialDate={this.dialogDate}
                            locale={props.locale}
                            maxDate={props.maxDate}
                            minDate={props.minDate}
                            mode={props.mode}
                            okLabel={props.okLabel}
                            onAccept={this.onAccept}
                            shouldDisableDate={props.shouldDisableDate}
                            hideCalendarDate={props.hideCalendarDate}
                            openToYearSelection={props.openToYearSelection}
                            utils={props.utils}/>
        </div>
    );
  }

  protected getComponentProps(): IKeyValue {
    const constants = this.dateConverter.localeSpecificConstants;
    return {
      ...super.getComponentProps(),
      mask: constants.dateMask,
      pattern: constants.datePattern,

      // We should bind a string value to the input field
      // because a state can hold the raw values
      // although at this case the state hold the string value
      value: this.formatDateValue(this.value)
    };
  }

  private onAccept(date: Date): void {
    this.onChangeValue(date, null);

    if (!this.isControlled) {
      // Propagate a string value to the form (a simulation)
      this.propsOnChangeForm(this.formatDateValue(date));
    }
    replace(this, this.onFocus, this.setFocus);
  };

  private formatDateValue(dateValue: AnyT): string {
    return this.dateConverter.formatDate(dateValue);
  }

  private get dialogDate(): Date {
    const defaultDate = this.defaultValue || this.dateConverter.getCurrentDate();
    if (ramda.isNil(this.value)) {
      return defaultDate;
    }
    const dateValue = this.dateConverter.tryConvertToDate(this.value);
    return this.dateConverter.isDate(dateValue)
        ? dateValue as Date
        : defaultDate;
  }

  private get dialogWindow(): IMaterialDatePickerDialogComponent {
    return this.refs.dialogWindow as IMaterialDatePickerDialogComponent;
  }
}
