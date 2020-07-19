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
  IBaseEvent,
  IGridRowProps,
  UniversalScrollableContext,
} from '../../../definition';

export class GridRow extends GenericBaseComponent<IGridRowProps> {

  public static readonly defaultProps: IGridRowProps = {
    hovered: true,
    selectable: true,
  };

  /**
   * @stable [23.10.2019]
   * @param {IGridRowProps} props
   */
  constructor(props: IGridRowProps) {
    super(props);
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
      rawData,
      selectable,
      selected,
    } = originalProps;

    const syntheticEntity = isSyntheticEntity(rawData);
    const isHovered = hovered && !syntheticEntity;
    const isSelectable = selectable && !syntheticEntity;

    return (
      <UniversalScrollableContext.Consumer>
        {(selectedElementClassName) => (
          <tr
            ref={this.actualRef}
            className={
              ClsUtils.joinClassName(
                GridClassesEnum.GRID_ROW,
                CalcUtils.calc(className),
                indexed && !R.isNil(rawData) && `rac-grid-row-${rawData.id}`,
                group && GridClassesEnum.GRID_ROW_GROUP,
                filter && GridClassesEnum.GRID_ROW_FILTER,
                originalProps.groupExpanded && 'rac-grid-row-group-expanded',
                isHovered && 'rac-grid-row-hovered',
                originalProps.odd && 'rac-grid-row-odd',
                originalProps.partOfGroup && 'rac-grid-row-part-of-group',
                originalProps.total && 'rac-grid-row-total',
                isSelectable && GridClassesEnum.GRID_ROW_SELECTABLE,
                selected && `${GridClassesEnum.GRID_ROW_SELECTED} ${selectedElementClassName}`
              )
            }
            {...PropsUtils.buildClickHandlerProps(this.onClick, isSelectable && TypeUtils.isFn(onClick), false)}
          >
            {this.originalChildren}
          </tr>
        )}
      </UniversalScrollableContext.Consumer>
    );
  }

  /**
   * @stable [23.10.2019]
   * @param {IBaseEvent} event
   */
  private onClick(event: IBaseEvent): void {
    const props = this.props;
    props.onClick(props.rawData);
  }
}
