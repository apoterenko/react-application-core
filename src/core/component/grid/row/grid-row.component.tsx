import * as React from 'react';

import { BaseComponent } from '../../base';
import { toClassName } from '../../../util';
import { IGridRowInternalProps } from './grid-row.interface';
import { IDefaultBasicEvent } from '../../../definitions.interface';

export class GridRow extends BaseComponent<GridRow, IGridRowInternalProps, {}> {

  public static defaultProps: IGridRowInternalProps = {
    excludeTargetsClasses: ['rac-field-input'],
  };

  /**
   * @stable - 05.04.2018
   * @param {IGridRowInternalProps} props
   */
  constructor(props: IGridRowInternalProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  /**
   * @stable - 05.04.2018
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
      <tr className={toClassName(
            'grid-row',
            props.selected && 'grid-row-selected',
            props.className
          )}
          onClick={this.onClick}>
        {props.children}
      </tr>
    );
  }

  /**
   * @stable - 05.04.2018
   * @param {IDefaultBasicEvent} event
   */
  private onClick(event: IDefaultBasicEvent): void {
    const elClassList = (event.target as HTMLElement).classList;
    const props = this.props;

    if (!props.onClick) {
      return;
    }
    if (props.excludeTargetsClasses.find((cls) => elClassList.contains(cls))) {
      // We cannot call a stopEvent method because framework
      return;
    }
    props.onClick();
  }
}
