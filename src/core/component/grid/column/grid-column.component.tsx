import * as React from 'react';

import { AnyT } from '../../../definitions.interface';
import { BaseComponent } from '../../base';
import { toClassName, isNumber, defValuesFilter, orUndef, isPrimitive } from '../../../util';
import { IGridColumnProps } from './grid-column.interface';

export class GridColumn extends BaseComponent<GridColumn, IGridColumnProps> {

  /**
   * @stable - 05.04.2018
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
      <td style={defValuesFilter({
                  textAlign: props.align,
                  width: orUndef<string>(isNumber(props.width), () => `${props.width}px`),
                })}
          className={toClassName(
                        'rac-grid-column',
                        props.actioned && 'rac-grid-actioned-column',
                        props.align && `rac-grid-column-align-${props.align}`,
                        props.className
                      )}>
        <div className='rac-grid-column-content rac-overflow-ellipsis'
             title={orUndef<AnyT>(isPrimitive(props.children), props.children)}>
          {props.children}
        </div>
      </td>
    );
  }
}
