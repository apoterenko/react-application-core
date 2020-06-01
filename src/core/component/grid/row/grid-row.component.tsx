import * as React from 'react';
import * as R from 'ramda';

import { GenericBaseComponent } from '../../base/generic-base.component';
import {
  CalcUtils,
  ClsUtils,
  isSyntheticEntity,
  PropsUtils,
  TypeUtils,
  WrapperUtils,
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
    const {
      rawData,
    } = props;

    const syntheticEntity = isSyntheticEntity(rawData);
    const isHovered = WrapperUtils.isHovered(props) && !syntheticEntity;
    const isSelectable = WrapperUtils.isSelectable(props) && !syntheticEntity;

    return (
      <UniversalScrollableContext.Consumer>
        {(selectedElementClassName) => (
          <tr
            ref={this.selfRef}
            className={ClsUtils.joinClassName(
              'rac-grid-row',
              CalcUtils.calc(props.className),
              props.indexed && !R.isNil(rawData) && `rac-grid-row-${rawData.id}`,
              props.grouped && 'rac-grid-row-grouped',
              props.filter && 'rac-grid-row-filter',
              props.groupExpanded && 'rac-grid-row-group-expanded',
              isHovered && 'rac-grid-row-hovered',
              props.odd && 'rac-grid-row-odd',
              props.partOfGroup && 'rac-grid-row-part-of-group',
              props.total && 'rac-grid-row-total',
              isSelectable && 'rac-grid-row-selectable',
              props.selected && `rac-grid-row-selected ${selectedElementClassName}`
            )}
            {...PropsUtils.buildClickHandlerProps(this.onClick, isSelectable && TypeUtils.isFn(props.onClick), false)}
          >
            {this.props.children}
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
