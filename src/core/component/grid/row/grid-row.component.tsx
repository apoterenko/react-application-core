import * as React from 'react';
import * as R from 'ramda';

import { GenericBaseComponent } from '../../base/generic-base.component';
import {
  CalcUtils,
  ClsUtils,
  EntityUtils,
  HighlightUtils,
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
      disabled,
      entity,
      filter,
      group,
      indexed,
      onClick,
      onGroupClick,
      partOfGroup,
      selectable,
      selected,
    } = originalProps;
    const {
      hovered,
    } = mergedProps;

    const isOddHighlighted = HighlightUtils.isOddHighlighted(mergedProps);

    const isSelectable = selectable
      && !disabled
      && (
        group
          ? TypeUtils.isFn(onGroupClick)
          : TypeUtils.isFn(onClick)
      )
      && !EntityUtils.isPhantomEntity(entity);

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
                hovered && GridClassesEnum.GRID_ROW_HOVERED,
                indexed && !R.isNil(entity) && `rac-grid-row-${entity.id}`,
                isOddHighlighted && GridClassesEnum.GRID_ROW_ODD,
                isSelectable && GridClassesEnum.GRID_ROW_SELECTABLE,
                originalProps.groupExpanded && 'rac-grid-row-group-expanded',
                originalProps.total && 'rac-grid-row-total',
                partOfGroup && GridClassesEnum.GRID_ROW_PART_OF_GROUP,
                ...isSelectable && (
                  selected
                    ? [GridClassesEnum.GRID_ROW_SELECTED, selectedElementClassName]
                    : [GridClassesEnum.GRID_ROW_UNSELECTED]
                )
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
      group,
      onClick,
      onGroupClick,
    } = this.originalProps;

    if (group) {
      if (TypeUtils.isFn(onGroupClick)) {
        onGroupClick(entity);
      }
    } else {
      if (TypeUtils.isFn(onClick)) {
        onClick(entity);
      }
    }
  }

  /**
   * @stable [17.08.2020]
   */
  protected get componentsSettingsProps(): IGridRowProps {
    return this.componentsSettings.gridRow;
  }
}
