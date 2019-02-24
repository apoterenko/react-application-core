import * as React from 'react';

import { BaseComponent } from '../../base';
import { toClassName } from '../../../util';
import { IGridRowProps } from './grid-row.interface';
import { IBasicEvent } from '../../../react-definitions.interface';
import { UNIVERSAL_SELECTED_ELEMENT_SELECTOR } from '../../../definitions.interface';

export class GridRow extends BaseComponent<IGridRowProps, {}> {

  public static defaultProps: IGridRowProps = {
    excludeTargetsClasses: ['rac-field-input'],
  };

  /**
   * @stable - 05.04.2018
   * @param {IGridRowProps} props
   */
  constructor(props: IGridRowProps) {
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
      <tr ref='self'
          className={toClassName(
            'rac-grid-row',
            props.selected && `rac-grid-row-selected ${UNIVERSAL_SELECTED_ELEMENT_SELECTOR}`,
            props.className
          )}
          onClick={this.onClick}>
        {props.children}
      </tr>
    );
  }

  /**
   * @stable - 05.04.2018
   * @param {IBasicEvent} event
   */
  private onClick(event: IBasicEvent): void {
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
