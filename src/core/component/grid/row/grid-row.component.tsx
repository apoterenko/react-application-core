import * as React from 'react';
import * as R from 'ramda';

import { BaseComponent } from '../../base';
import {
  calc,
  handlerPropsFactory,
  isFn,
  isSelectable,
  joinClassName,
} from '../../../util';
import {
  IBaseEvent,
  IGridRowProps,
  UniversalScrollableContext,
} from '../../../definition';

export class GridRow extends BaseComponent<IGridRowProps> {

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
    const selectable = isSelectable(props);

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
              props.hovered && 'rac-grid-row-hovered',
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
