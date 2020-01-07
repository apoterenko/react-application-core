import * as React from 'react';

import { BaseComponent } from '../base/base.component';
import {
  ICalendarDayEntity,
  ICalendarEntity,
  ICalendarProps,
  ICalendarWeekEntity,
  IGridColumnProps,
  IListEntity,
  INITIAL_LIST_ENTITY,
  NOT_SELECTABLE_GRID_ENTITY,
} from '../../definition';
import { Grid } from '../grid';
import {
  isFn,
  joinClassName,
} from '../../util';

export class Calendar extends BaseComponent<ICalendarProps> {

  public static readonly defaultProps: ICalendarProps = {
    showOnlyCurrentDays: false,
  };

  /**
   * @stable [04.01.2020]
   * @param {ICalendarProps} props
   */
  constructor(props: ICalendarProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.getCellElement = this.getCellElement.bind(this);
    this.getColumnClassName = this.getColumnClassName.bind(this);
  }

  /**
   * @stable [04.01.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const calendar = this.calendarEntity;

    const listEntity: IListEntity = {
      ...INITIAL_LIST_ENTITY,
      data: calendar.days,
    };

    const columns = calendar.daysLabels.map((day, index): IGridColumnProps => (
      {
        title: day,
        index,
        align: 'center',
        columnClassName: this.getColumnClassName,
        renderer: this.getCellElement,
        onColumnContentClick: this.onClick,
      }
    ));

    return (
      <Grid
        {...NOT_SELECTABLE_GRID_ENTITY}
        headerRendered={false}
        highlightOdd={false}
        {...props.gridConfiguration}
        columnsConfiguration={columns}
        className={joinClassName('rac-calendar', props.className)}
        {...listEntity}
      />
    );
  }

  /**
   * @stable [04.01.2020]
   * @param {IGridColumnProps<ICalendarDayEntity>} payload
   * @returns {string}
   */
  private getColumnClassName(payload: IGridColumnProps<ICalendarDayEntity>): string {
    const entity = this.asCalendarDayEntity(payload);
    const isDaySelected = this.isDaySelected(entity);

    return joinClassName(
      entity.current && 'rac-calendar-current-day',
      entity.today && 'rac-calendar-today',
      isDaySelected && 'rac-calendar-selected-day'
    );
  }

  /**
   * @stable [07.01.2020]
   * @param {ICalendarDayEntity} entity
   * @returns {boolean}
   */
  private isDaySelected(entity: ICalendarDayEntity): boolean {
    const {isSelected, selectedDays = []} = this.props;
    return isFn(isSelected)
      ? isSelected(entity)
      : selectedDays.includes(entity.day) && entity.current;
  }

  /**
   * @stable [04.01.2020]
   * @param {ICalendarWeekEntity} item
   * @param {IGridColumnProps<ICalendarDayEntity>} column
   * @returns {JSX.Element}
   */
  private getCellElement(item: ICalendarWeekEntity, column: IGridColumnProps<ICalendarDayEntity>): JSX.Element {
    const props = this.props;
    const weekDayEntity: ICalendarDayEntity = item[column.index];

    if (props.showOnlyCurrentDays && !weekDayEntity.current) {
      return null;
    }
    if (isFn(props.renderer)) {
      return props.renderer(weekDayEntity);
    }
    return <React.Fragment>{weekDayEntity.date.getDate()}</React.Fragment>;
  }

  /**
   * @stable [04.01.2020]
   * @param {IGridColumnProps} payload
   */
  private onClick(payload: IGridColumnProps): void {
    const props = this.props;
    if (isFn(props.onSelect)) {
      props.onSelect(this.asCalendarDayEntity(payload));
    }
  }

  /**
   * @stable [04.01.2020]
   * @param {IGridColumnProps} payload
   * @returns {ICalendarDayEntity}
   */
  private asCalendarDayEntity(payload: IGridColumnProps): ICalendarDayEntity {
    return payload.entity[payload.index];
  }

  /**
   * @stable [04.01.2020]
   * @returns {ICalendarEntity}
   */
  private get calendarEntity(): ICalendarEntity {
    const props = this.props;
    return props.calendarEntity || this.dc.asCalendar({useSyntheticCalendar: true});
  }
}
