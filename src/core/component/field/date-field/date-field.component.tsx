import * as React from 'react';
import DayPicker from 'react-day-picker';

import { orNull, nvl, joinClassName, ifNotFalseThanValue } from '../../../util';
import { AnyT } from '../../../definitions.interface';
import {
  DateTimeLikeTypeT,
  FieldActionTypesEnum,
  IBaseEvent,
} from '../../../definition';
import { IDateTimeSettings } from '../../../settings';
import {
  IDateFieldProps,
  IDateFieldState,
} from './date-field.interface';
import { BaseTextField } from '../textfield';
import { Dialog } from '../../dialog';
import { FlexLayout } from '../../layout/flex';
import { NumberField } from '../numberfield';

export class DateField<TProps extends IDateFieldProps = IDateFieldProps,
                       TState extends IDateFieldState = IDateFieldState>
  extends BaseTextField<TProps, TState> {

  public static defaultProps: IDateFieldProps = {
    autoOk: true,
    firstDayOfWeek: 1,
    preventFocus: true,
    minDate: new Date('01/01/1900'),
    maxDate: new Date('01/01/4000'),
  };

  private readonly dialogRef = React.createRef<Dialog<AnyT>>();

  /**
   * @stable [07.01.2019]
   * @param {IDateFieldProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.onAccept = this.onAccept.bind(this);
    this.onCalendarClick = this.onCalendarClick.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);

    this.defaultActions = [
      {type: FieldActionTypesEnum.CALENDAR, onClick: this.onCalendarClick},
      ...this.defaultActions
    ];
  }

  /**
   * @stable [07.01.2018]
   * @param {DateTimeLikeTypeT} currentRawValue
   */
  public onChangeManually(currentRawValue: DateTimeLikeTypeT): void {
    super.onChangeManually(this.formatDate(currentRawValue));
  }

  protected getInputAttachmentElement(): JSX.Element {
    const props = this.props;
    const state = this.state;
    const yearPlaceholder = props.yearPlaceholder;
    const settings = this.settings;

    return orNull(
      state.dialogOpened,
      () => {
        const initialDate = this.dialogDate;
        return (
          <Dialog
            ref={this.dialogRef}
            acceptable={false}
            closable={false}
            className='rac-date-field-dialog'
          >
            <FlexLayout
              full={false}>
              <NumberField
                value={this.state.year}
                onChange={this.onChangeYear}
                pattern={'[0-9]{4}'}
                mask={[/\d/, /\d/, /\d/, /\d/]}
                placeholder={ifNotFalseThanValue(
                  yearPlaceholder as boolean,
                  () => nvl(
                    yearPlaceholder,
                    settings.messages.yearPlaceholderMessage.replace('{pattern}', settings.dateTime.yearPlaceholder))
                  )
                }>
              </NumberField>
            </FlexLayout>
            <DayPicker
              firstDayOfWeek={props.firstDayOfWeek}
              fixedWeeks={true}
              locale={props.locale}
              month={initialDate}
              selectedDays={initialDate}
              onDayClick={this.onAccept}/>
          </Dialog>
        );
      }
    );
  }

  /**
   * @stable [07.01.2018]
   * @returns {Array<string | RegExp>}
   */
  protected getFieldMask(): Array<string|RegExp> {
    return orNull<Array<string|RegExp>>(
      !this.isDisplayValueDefined,
      () => super.getFieldMask() || this.dateTimeSettings.uiDateMask
    );
  }

  /**
   * @stable [07.01.2019]
   * @returns {string}
   */
  protected getFieldPattern(): string {
    return orNull<string>(
      !this.isDisplayValueDefined,
      () => super.getFieldPattern() || this.dateTimeSettings.uiDatePattern
    );
  }

  /**
   * @stable [07.01.2019]
   * @returns {string}
   */
  protected getFieldFormat(): string {
    return nvl(this.props.format, this.dateTimeSettings.uiDateFormat);
  }

  /**
   * @stable [07.01.2018]
   * @param {IBaseEvent} event
   */
  protected onClick(event: IBaseEvent): void {
    super.onClick(event);
    this.onCalendarClick();
  }

  /**
   * @stable [07.01.2019]
   * @param {AnyT} value
   * @returns {string}
   */
  protected decorateValueBeforeDisplaying(value: DateTimeLikeTypeT): string {
    return this.formatDate(value);
  }

  /**
   * @stable [02.05.2019]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return joinClassName(super.getFieldClassName(), 'rac-date-field');
  }

  /**
   * @stable [19.04.2019]
   * @param {number} value
   */
  private onChangeYear(value: number): void {
    const props = this.props;
    this.setState({year: value});

    const date = new Date(this.dialogDate.getTime());
    date.setFullYear(value);

    if (this.dc.compare(date, props.minDate) >= 0
      && this.dc.compare(props.maxDate, date) >= 0) {
      this.onChangeManually(date);
    }
  }

  /**
   * @stable [24.02.2019]
   * @param {Date} currentTime
   */
  private onAccept(currentTime: Date): void {
    this.onChangeManually(currentTime);
    this.dialog.onAccept();
    this.setState({dialogOpened: false});
  }

  /**
   * @stable [07.01.2019]
   * @returns {Date}
   */
  private get dialogDate(): Date {
    if (this.isValueNotPresent) {
      return this.dc.getCurrentDate();
    }
    const dateValue = this.dc.tryConvertToDate(this.value, this.getFieldFormat());
    return dateValue instanceof Date
        ? dateValue
        : this.dc.getCurrentDate();
  }

  /**
   * @stable [24.02.2019]
   * @returns {Dialog}
   */
  private get dialog(): Dialog {
    return this.dialogRef.current;
  }

  /**
   * @stable [24.02.2019]
   * @returns {IDateTimeSettings}
   */
  private get dateTimeSettings(): IDateTimeSettings {
    return this.settings.dateTime || {};
  }

  /**
   * @stable [07.01.2019]
   * @param {DateTimeLikeTypeT} value
   * @returns {string}
   */
  private formatDate(value: DateTimeLikeTypeT): string {
    return this.dc.format(value, this.getFieldFormat(), this.getFieldFormat());
  }

  /**
   * @stable [24.02.2019]
   */
  private onCalendarClick(): void {
    this.setState({dialogOpened: true}, () => this.dialog.activate());
  }
}
