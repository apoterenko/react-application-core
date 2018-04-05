import * as React from 'react';

import { IDefaultBasicEvent, SortDirectionEnum, UNDEF } from '../../../definitions.interface';
import { BaseComponent } from '../../base';
import { toClassName, isNumber, defValuesFilter, orUndef, isUndef, orNull } from '../../../util';
import { IGridHeaderColumnInternalProps } from './grid-header-column.interface';

export class GridHeaderColumn extends BaseComponent<GridHeaderColumn, IGridHeaderColumnInternalProps, {}> {

  /**
   * @stable - 05.04.2018
   * @param {IGridHeaderColumnInternalProps} props
   */
  constructor(props: IGridHeaderColumnInternalProps) {
    super(props);
    this.onHeaderColumnClick = this.onHeaderColumnClick.bind(this);
  }

  /**
   * @stable - 05.04.2018
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <th style={defValuesFilter({
                  textAlign: props.align,
                  width: orUndef(isNumber(props.width), () => `${props.width}px`),
                })}
          className={toClassName(
                      'rac-grid-column',
                      'rac-grid-header-column',
                      props.useSorting && 'rac-grid-sorted-column',
                      'rac-no-user-select',
                      props.className
                    )}
          onClick={props.useSorting ? this.onHeaderColumnClick : UNDEF}>
        <div className='rac-grid-column-content rac-overflow-ellipsis'>
          {props.children}
        </div>
        {
          orNull(
            props.useSorting,
            () => (
              this.uiFactory.makeIcon({
                // Prevent text jumping
                className: `rac-grid-column-direction ${isUndef(props.direction) ? 'rac-visibility-hidden' : ''}`,
                type: props.direction === SortDirectionEnum.ASC
                  ? 'arrow_downward'
                  : 'arrow_upward',
              })
            )
          )
        }
      </th>
    );
  }

  /**
   * @stable - 05.04.2018
   * @param {IDefaultBasicEvent} event
   */
  private onHeaderColumnClick(event: IDefaultBasicEvent): void {
    this.stopEvent(event);

    const props = this.props;

    if (props.onClick) {
      props.onClick({
        name: props.name,
        direction: props.direction === SortDirectionEnum.ASC
          ? SortDirectionEnum.DESC
          : SortDirectionEnum.ASC,
      });
    }
  }
}
