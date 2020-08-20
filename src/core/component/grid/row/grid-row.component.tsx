import * as React from 'react';

import { GenericBaseComponent } from '../../base/generic-base.component';
import {
  CalcUtils,
  ClsUtils,
  PropsUtils,
  RowUtils,
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
  };

  /**
   * @stable [17.08.2020]
   * @param originalProps
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
    const mergedProps = this.mergedProps;
    const {
      className,
      entity,
      filter,
      group,
      partOfGroup,
      selected,
    } = originalProps;

    const isHovered = RowUtils.isHovered(mergedProps);
    const isOddHighlighted = RowUtils.isOddHighlighted(mergedProps);
    const isSelectable = RowUtils.isSelectable(originalProps);
    const isIndexed = RowUtils.isIndexed(originalProps);

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
                isHovered && GridClassesEnum.GRID_ROW_HOVERED,
                isIndexed && `${GridClassesEnum.GRID_ROW}-${entity.id}`,
                isOddHighlighted && GridClassesEnum.GRID_ROW_ODD,
                isSelectable && GridClassesEnum.GRID_ROW_SELECTABLE,
                originalProps.groupExpanded && 'rac-grid-row-group-expanded',
                originalProps.total && 'rac-grid-row-total',
                partOfGroup && GridClassesEnum.GRID_ROW_PART_OF_GROUP,
                ...isSelectable && (
                  selected
                    ? [GridClassesEnum.GRID_ROW_SELECTED, selectedElementClassName]
                    : [GridClassesEnum.GRID_ROW_UNSELECTED]
                ) || []
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
      entity,
      onClick,
    } = this.originalProps;

    if (TypeUtils.isFn(onClick)) {
      onClick(entity);
    }
  }

  /**
   * @stable [17.08.2020]
   */
  protected get componentsSettingsProps(): IGridRowProps {
    return this.componentsSettings.gridRow;
  }
}
