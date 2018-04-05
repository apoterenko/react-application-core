import * as React from 'react';

import { BaseComponent } from '../../base';
import { toClassName, isNumber, defValuesFilter, orUndef } from '../../../util';
import { IGridColumnInternalProps } from './grid-column.interface';

export class GridColumn extends BaseComponent<GridColumn, IGridColumnInternalProps, {}> {

  public render(): JSX.Element {
    const props = this.props;

    return (
      <td style={defValuesFilter({
                  textAlign: props.align,
                  width: orUndef(isNumber(props.width), () => `${props.width}px`),
                })}
          className={toClassName(
                      'rac-grid-column',
                      props.className,
                    )}>
        <div className='rac-grid-column-content rac-overflow-ellipsis'>
          {props.children}
        </div>
      </td>
    );
  }
}
