import * as React from 'react';
import * as R from 'ramda';

import { GenericBaseComponent } from '../../base/generic-base.component';
import {
  CalcUtils,
  ClsUtils,
  isSyntheticEntity,
  PropsUtils,
  TypeUtils,
} from '../../../util';
import {
  GridClassesEnum,
  IGridRowProps,
  UniversalScrollableContext,
} from '../../../definition';

export class GridRow extends GenericBaseComponent<IGridRowProps> {

  public static readonly defaultProps: IGridRowProps = {
    hovered: true,
    selectable: true,
  };

  /**
   * @stable [19.07.2020]
   * @param {IGridRowProps} originalProps
   */
  constructor(originalProps: IGridRowProps) {
    super(originalProps);

    this.onClick = this.onClick.bind(this);
  }

  /**
   * @stable [23.10.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const originalProps = this.originalProps;
    const {
      className,
      filter,
      group,
      hovered,
      indexed,
      onClick,
      onGroupClick,
      partOfGroup,
      rawData,
      selectable,
      selected,
    } = originalProps;

    const isSelectable = selectable && (
      group
        ? TypeUtils.isFn(onGroupClick)
        : TypeUtils.isFn(onClick)
    ) && !isSyntheticEntity(rawData);
    const isHovered = hovered && isSelectable;

    return (
      <UniversalScrollableContext.Consumer>
        {(selectedElementClassName) => (
          <tr
            ref={this.actualRef}
            className={
              ClsUtils.joinClassName(
                GridClassesEnum.GRID_ROW,
                CalcUtils.calc(className),
                filter && GridClassesEnum.GRID_ROW_FILTER,
                group && GridClassesEnum.GRID_ROW_GROUP,
                indexed && !R.isNil(rawData) && `rac-grid-row-${rawData.id}`,
                isHovered && 'rac-grid-row-hovered',
                isSelectable && GridClassesEnum.GRID_ROW_SELECTABLE,
                originalProps.groupExpanded && 'rac-grid-row-group-expanded',
                originalProps.odd && 'rac-grid-row-odd',
                originalProps.total && 'rac-grid-row-total',
                partOfGroup && GridClassesEnum.GRID_ROW_PART_OF_GROUP,
                selected && `${GridClassesEnum.GRID_ROW_SELECTED} ${selectedElementClassName}`
              )
            }
            {...PropsUtils.buildClickHandlerProps(this.onClick, isSelectable, false)}
          >
            {this.originalChildren}
          </tr>
        )}
      </UniversalScrollableContext.Consumer>
    );
  }

  /**
   * @stable [19.07.2020]
   */
  private onClick(): void {
    const {
      group,
      onClick,
      onGroupClick,
      rawData,
    } = this.originalProps;

    if (group) {
      if (TypeUtils.isFn(onGroupClick)) {
        onGroupClick(rawData);
      }
    } else {
      if (TypeUtils.isFn(onClick)) {
        onClick(rawData);
      }
    }
  }
}
