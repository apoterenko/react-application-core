import * as React from 'react';
import * as R from 'ramda';

import { GenericBaseComponent } from '../../base/generic-base.component';
import {
  calc,
  handlerPropsFactory,
  isFn,
  isHovered,
  isSelectable,
  isSyntheticEntity,
  joinClassName,
} from '../../../util';
import {
  IBaseEvent,
  IGridRowProps,
  UniversalScrollableContext,
} from '../../../definition';

export class GridRow extends GenericBaseComponent<IGridRowProps> {

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
    const props = this.props;
    const entity = props.entity;
    const syntheticEntity = isSyntheticEntity(entity);
    const hovered = isHovered(props) && !syntheticEntity;
    const selectable = isSelectable(props) && !syntheticEntity;

    return (
      <UniversalScrollableContext.Consumer>
        {(selectedElementClassName) => (
          <tr
            ref={this.selfRef}
            className={joinClassName(
              'rac-grid-row',
              calc(props.className),
              props.indexed && !R.isNil(entity) && `rac-grid-row-${entity.id}`,
              props.grouped && 'rac-grid-row-grouped',
              props.filter && 'rac-grid-row-filter',
              props.groupExpanded && 'rac-grid-row-group-expanded',
              hovered && 'rac-grid-row-hovered',
              props.odd && 'rac-grid-row-odd',
              props.partOfGroup && 'rac-grid-row-part-of-group',
              props.total && 'rac-grid-row-total',
              selectable && 'rac-grid-row-selectable',
              props.selected && `rac-grid-row-selected ${selectedElementClassName}`
            )}
            {...handlerPropsFactory(this.onClick, selectable && isFn(props.onClick), false)}
          >
            {props.children}
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
    props.onClick(props.entity);
  }
}
