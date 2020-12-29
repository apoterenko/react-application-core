import * as React from 'react';

import { GenericComponent } from '../base/generic.component';
import {
  CalendarClassesEnum,
  ICalendarDayEntity,
  ICalendarEntity,
  ICalendarProps,
  ICalendarWeekEntity,
  IGridColumnProps,
  INITIAL_REDUX_LIST_ENTITY,
  IReduxListEntity,
} from '../../definition';
import { Grid } from '../grid';
import {
  CalcUtils,
  ClsUtils,
  TypeUtils,
} from '../../util';

export class Calendar extends GenericComponent<ICalendarProps> {

  public static readonly defaultProps: ICalendarProps = {
    showOnlyCurrentDays: false,
    gridConfiguration: {},
  };

  /**
   * @stable [27.12.2020]
   * @param originalProps
   */
  constructor(originalProps: ICalendarProps) {
    super(originalProps);

    this.getCellElement = this.getCellElement.bind(this);
    this.getColumnClassName = this.getColumnClassName.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  /**
   * @stable [27.12.2020]
   */
  public render(): JSX.Element {
    const {
      className,
      gridConfiguration,
    } = this.originalProps;

    const $calendarEntity = this.calendarEntity;
    const listEntity: IReduxListEntity = {
      ...INITIAL_REDUX_LIST_ENTITY,
      data: $calendarEntity.days,
    };

    const columns = $calendarEntity
      .daysLabels
      .map((day, index): IGridColumnProps => (
        {
          align: 'center',
          columnClassName: this.getColumnClassName,
          index,
          onColumnContentClick: this.onClick,
          renderer: this.getCellElement,
          title: day,
        }
      ));

    return (
      <Grid
        headerRendered={false}
        {...gridConfiguration}
        itemConfiguration={{
          ...gridConfiguration.itemConfiguration,
          highlightOdd: false,
          hovered: false,
        }}
        columnsConfiguration={columns}
        className={
          ClsUtils.joinClassName(
            CalendarClassesEnum.CALENDAR,
            CalcUtils.calc(className)
          )
        }
        {...listEntity}
      />
    );
  }

  /**
   * @stable [29.12.2020]
   * @param payload
   * @private
   */
  private getColumnClassName(payload: IGridColumnProps<ICalendarDayEntity>): string {
    const entity = this.asCalendarDayEntity(payload);
    const isDaySelected = this.isDaySelected(entity);
    const isFirstSelectedDay = this.isFirstSelectedDay(entity);
    const isLastSelectedDay = this.isLastSelectedDay(entity);
    const isMiddleSelectedDay = this.isMiddleSelectedDay(entity);

    return ClsUtils.joinClassName(
      entity.current && CalendarClassesEnum.CURRENT_DAY,
      entity.today && CalendarClassesEnum.TODAY,
      isDaySelected && CalendarClassesEnum.SELECTED_DAY,
      !isDaySelected && !entity.today && CalendarClassesEnum.BASIC_DAY,
      isFirstSelectedDay && 'rac-calendar__first-selected-day',
      isMiddleSelectedDay && CalendarClassesEnum.MIDDLE_SELECTED_DAY,
      isLastSelectedDay && CalendarClassesEnum.LAST_SELECTED_DAY
    );
  }

  /**
   * @stable [29.12.2020]
   * @param entity
   * @private
   */
  private isDaySelected(entity: ICalendarDayEntity): boolean {
    const {
      isSelected,
      selectedDays = [],
    } = this.originalProps;

    return TypeUtils.isFn(isSelected)
      ? isSelected(entity)
      : selectedDays.includes(entity.day) && entity.current;
  }

  /**
   * @stable [29.12.2020]
   * @param entity
   * @private
   */
  private isFirstSelectedDay(entity: ICalendarDayEntity): boolean {
    const {
      isFirstSelected,
    } = this.originalProps;

    return TypeUtils.isFn(isFirstSelected) && isFirstSelected(entity);
  }

  /**
   * @stable [21.01.2020]
   * @param {ICalendarDayEntity} entity
   * @returns {boolean}
   */
  private isLastSelectedDay(entity: ICalendarDayEntity): boolean {
    const {isLastSelected} = this.props;
    return TypeUtils.isFn(isLastSelected) && isLastSelected(entity);
  }

  /**
   * @stable [07.03.2020]
   * @param {ICalendarDayEntity} entity
   * @returns {boolean}
   */
  private isMiddleSelectedDay(entity: ICalendarDayEntity): boolean {
    const {isMiddleSelected} = this.props;
    return TypeUtils.isFn(isMiddleSelected)
      ? isMiddleSelected(entity)
      : (!this.isFirstSelectedDay(entity) && !this.isLastSelectedDay(entity));
  }

  /**
   * @stable [27.12.2020]
   * @param item
   * @param column
   * @private
   */
  private getCellElement(item: ICalendarWeekEntity, column: IGridColumnProps<ICalendarDayEntity>): JSX.Element {
    const {
      renderer,
      showOnlyCurrentDays,
    } = this.originalProps;

    const weekDayEntity = item[column.index];

    if (showOnlyCurrentDays && !weekDayEntity.current) {
      return null;
    }
    if (TypeUtils.isFn(renderer)) {
      return renderer(weekDayEntity);
    }
    return (
      <React.Fragment>
        {weekDayEntity.date.getDate()}
      </React.Fragment>
    );
  }

  /**
   * @stable [27.12.2020]
   * @param payload
   * @private
   */
  private onClick(payload: IGridColumnProps): void {
    const {
      onSelect,
    } = this.originalProps;

    if (TypeUtils.isFn(onSelect)) {
      onSelect(this.asCalendarDayEntity(payload));
    }
  }

  /**
   * @stable [27.12.2020]
   * @param payload
   * @private
   */
  private asCalendarDayEntity(payload: IGridColumnProps): ICalendarDayEntity {
    return payload.entity[payload.index];
  }

  /**
   * @stable [27.12.2020]
   * @private
   */
  private get calendarEntity(): ICalendarEntity {
    const {
      calendarEntity,
    } = this.originalProps;
    return calendarEntity || this.dc.asCalendar({useSyntheticCalendar: true});
  }
}
