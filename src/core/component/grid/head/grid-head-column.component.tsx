import * as React from 'react';

import {
  GridClassesEnum,
  IconsEnum,
  IGridColumnProps,
  SortDirectionsEnum,
} from '../../../definition';
import {
  CalcUtils,
  ClsUtils,
  ConditionUtils,
  NvlUtils,
  TypeUtils,
} from '../../../util';
import { BaseGridColumn } from '../base-column';

export class GridHeadColumn extends BaseGridColumn {

  public static readonly defaultProps: IGridColumnProps = {
    headerRendered: true,
  };

  /**
   * @stable [28.07.2020]
   * @param originalProps
   */
  constructor(originalProps: IGridColumnProps) {
    super(originalProps);

    this.onAscSortingActionClick = this.onAscSortingActionClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onDescSortingActionClick = this.onDescSortingActionClick.bind(this);
  }

  /**
   * @stable [28.07.2020]
   */
  public render(): JSX.Element {
    const originalProps = this.originalProps;
    const {
      colSpan,
      headerClassName,
      headerColSpan,
      headerRendered,
      headerStyles,
    } = originalProps;

    return ConditionUtils.orNull(
      headerRendered,
      () => (
        <th
          style={{
            ...this.styles,
            ...CalcUtils.calc(headerStyles, originalProps),
          }}
          colSpan={NvlUtils.nvl(headerColSpan, colSpan)}
          className={this.getClassName(CalcUtils.calc(headerClassName, originalProps))}
        >
          {this.columnContentElement}
        </th>
      )
    );
  }

  /**
   * @stable [28.07.2020]
   * @param children
   */
  protected getColumnContentElement(children: React.ReactNode): React.ReactNode {
    const {
      closable,
      closed,
      onClose,
      sortable,
    } = this.originalProps;

    return (
      <React.Fragment>
        {
          sortable && (
            <div className={GridClassesEnum.GRID_COLUMN_SORT_ACTIONS}>
              {
                this.uiFactory.makeIcon({
                  className: ClsUtils.joinClassName(
                    GridClassesEnum.GRID_SORT_ACTION,
                    GridClassesEnum.GRID_DESC_SORT_ACTION,
                    this.isDescSortingEnabled && GridClassesEnum.GRID_ACTIVE_SORT_ACTION
                  ),
                  type: IconsEnum.ARROW_DOWN,
                  onClick: this.onDescSortingActionClick,
                })
              }
              {
                this.uiFactory.makeIcon({
                  className: ClsUtils.joinClassName(
                    GridClassesEnum.GRID_SORT_ACTION,
                    GridClassesEnum.GRID_ASC_SORT_ACTION,
                    this.isAscSortingEnabled && GridClassesEnum.GRID_ACTIVE_SORT_ACTION
                  ),
                  type: IconsEnum.ARROW_UP,
                  onClick: this.onAscSortingActionClick,
                })
              }
            </div>
          )
        }
        {
          closable && TypeUtils.isFn(onClose)
            ? (
              <div className={GridClassesEnum.GRID_COLUMN_CLOSE_WRAPPER}>
                {children}
                {this.uiFactory.makeIcon({
                  type: closed ? IconsEnum.CHEVRON_DOWN : IconsEnum.CHEVRON_UP,
                  onClick: this.onCloseClick,
                })}
              </div>
            )
            : children
        }
      </React.Fragment>
    );
  }

  /**
   * @stable [28.07.2020]
   */
  private onCloseClick(): void {
    const {
      closed,
      onClose,
    } = this.originalProps;

    onClose(!closed);
  }

  /**
   * @stable [28.07.2020]
   */
  private onAscSortingActionClick(): void {
    this.doSortingDirectionChange(ConditionUtils.orNull(!this.isAscSortingEnabled, SortDirectionsEnum.ASC));
  }

  /**
   * @stable [28.07.2020]
   */
  private onDescSortingActionClick(): void {
    this.doSortingDirectionChange(ConditionUtils.orNull(!this.isDescSortingEnabled, SortDirectionsEnum.DESC));
  }

  /**
   * @stable [19.07.2020]
   * @param {SortDirectionsEnum} direction
   */
  private doSortingDirectionChange(direction: SortDirectionsEnum): void {
    const {
      name,
      onSortingDirectionChange,
    } = this.originalProps;

    if (TypeUtils.isFn(onSortingDirectionChange)) {
      onSortingDirectionChange({name, direction});
    }
  }

  /**
   * @stable [28.07.2020]
   */
  private get isDescSortingEnabled(): boolean {
    return this.originalProps.direction === SortDirectionsEnum.DESC;
  }

  /**
   * @stable [28.07.2020]
   */
  private get isAscSortingEnabled(): boolean {
    return this.originalProps.direction === SortDirectionsEnum.ASC;
  }

  /**
   * @stable [28.07.2020]
   */
  private get styles(): React.CSSProperties {
    return this.getStyle({width: this.originalProps.headerWidth});
  }
}
