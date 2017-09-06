import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as ramda from 'ramda';
import DatePickerDialog from 'material-ui/DatePicker/DatePickerDialog';

import { DI_TYPES, lazyInject } from 'core/di';
import { isUndef } from 'core/util';
import { AnyT, IKeyValue, ChangeEventT } from 'core/definition.interface';
import { BasicTextField } from 'core/component/field/textfield';
import { IDateConverter } from 'core/converter';
import { INativeMaterialComponent } from 'core/component/material';

import {
  IDateFieldInternalProps,
  IDateFieldInternalState,
  IMaterialDateDialogComponent
} from './datefield.interface';

export class DateField extends BasicTextField<DateField,
                                              IDateFieldInternalProps,
                                              IDateFieldInternalState,
                                              INativeMaterialComponent> {
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

  private preventShowDialog: boolean;
  @lazyInject(DI_TYPES.DateConverter) private dateConverter: IDateConverter;

  constructor(props: IDateFieldInternalProps) {
    super(props);
    this.onAccept = this.onAccept.bind(this);
  }

  public onFocus(event: React.FocusEvent<any>): void {
    super.onFocus(event);

    if (isUndef(this.preventShowDialog) || this.preventShowDialog === true) {
      this.dialogWindow.show();
      delete this.preventShowDialog;
    }
  }

  public onKeyEnter(event: React.KeyboardEvent<AnyT>): void {
    super.onKeyEnter(event);

    if (this.dialogWindow.state.open) {
      this.stopEvent(event);
    }
  }

  protected getRawValueFromEvent(event: ChangeEventT): Date {
    return this.dateConverter.tryConvertToDate(event.target.value);
  }

  protected prepareStateValueBeforeSerialization(value: AnyT): AnyT {
    // Date object must be able to be serialized as a string
    return this.dateConverter.formatDate(value);
  }

  protected propsChangeForm(rawValue: AnyT): void {
    super.propsChangeForm(
        this.prepareStateValueBeforeSerialization(rawValue)
    );
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
      value: this.dateConverter.formatDate(this.value)
    };
  }

  private onAccept(date: Date): void {
    this.onChangeValue(date, null);

    this.preventShowDialog = true;
    this.input.focus();
  };

  private get dialogDate(): Date {
    const value = this.value;
    const defaultDate = this.dateConverter.getCurrentDate();
    if (ramda.isNil(value)) {
      return defaultDate;
    }
    const dateValue = this.dateConverter.tryConvertToDate(value);
    return this.dateConverter.isDate(dateValue)
        ? dateValue as Date
        : defaultDate;
  }

  private get dialogWindow(): IMaterialDateDialogComponent {
    return this.refs.dialogWindow as IMaterialDateDialogComponent;
  }
}
