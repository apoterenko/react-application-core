import * as React from 'react';

import { GenericComponent } from '../../base/generic.component';
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

export class GridRow extends GenericComponent<IGridRowProps> {

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
                GridClassesEnum.ROW,
                this.getOriginalClassName(mergedProps),
                filter && GridClassesEnum.ROW_FILTER,
                group && GridClassesEnum.ROW_GROUP,
                isHovered && GridClassesEnum.ROW_HOVERED,
                isIndexed && `${GridClassesEnum.ROW}-${entity.id}`,
                isOddHighlighted && GridClassesEnum.ROW_ODD,
                isSelectable && GridClassesEnum.ROW_SELECTABLE,
                originalProps.groupExpanded && 'rac-grid-row-group-expanded',
                originalProps.total && GridClassesEnum.ROW_TOTAL,
                partOfGroup && GridClassesEnum.ROW_PART_OF_GROUP,
                ...isSelectable && (
                  selected
                    ? [GridClassesEnum.ROW_SELECTED, selectedElementClassName]
                    : [GridClassesEnum.ROW_UNSELECTED]
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
   * @stable [01.07.2021]
   */
  protected getComponentSettingsProps(): IGridRowProps {
    return PropsUtils.extendProps(
      super.getComponentSettingsProps(),
      this.componentsSettings?.gridRow
    );
  }
}
