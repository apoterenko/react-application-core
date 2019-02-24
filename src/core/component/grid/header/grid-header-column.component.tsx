import * as React from 'react';

import { IBasicEvent } from '../../../react-definitions.interface';
import { SortDirectionEnum } from '../../../entities-definitions.interface';
import { nvl, orNull, cancelEvent, isFn } from '../../../util';
import { IGridHeaderColumnProps } from './grid-header-column.interface';
import { BaseGridColumn } from '../base-column';
import { FlexLayout } from '../../layout';

export class GridHeaderColumn extends BaseGridColumn<IGridHeaderColumnProps> {

  /**
   * @stable [12.02.2019]
   * @param {IGridHeaderColumnProps} props
   */
  constructor(props: IGridHeaderColumnProps) {
    super(props);
    this.onAscSortDirectionClick = this.onAscSortDirectionClick.bind(this);
    this.onDescSortDirectionClick = this.onDescSortDirectionClick.bind(this);
  }

  /**
   * @stable [05.04.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return orNull<JSX.Element>(
      props.headerRendered !== false,
      () => (
        <th style={this.getStyle({width: props.headerWidth})}
            colSpan={nvl(props.headerColSpan, props.colSpan)}
            className={this.getClassName(
              props.useSorting && 'rac-grid-sorted-column',
              'rac-no-user-select',
              props.headerClassName
            )}>
          <FlexLayout
            row={true}
            alignItemsCenter={true}
            justifyContentCenter={true}>
            {this.getColumnContentElement()}
            {
              orNull<JSX.Element>(
                props.useSorting,
                () => (
                  <React.Fragment>
                    {
                      this.uiFactory.makeIcon({
                        className: 'rac-grid-column-sorter-icon',
                        type: 'bottom',
                        onClick: this.onDescSortDirectionClick,
                      })
                    }
                    {
                      this.uiFactory.makeIcon({
                        className: 'rac-grid-column-sorter-icon',
                        type: 'top',
                        onClick: this.onAscSortDirectionClick,
                      })
                    }
                  </React.Fragment>
                )
              )
            }
          </FlexLayout>
        </th>
      )
    );
  }

  /**
   * @stable [12.02.2019]
   * @param {IBasicEvent} event
   */
  private onAscSortDirectionClick(event: IBasicEvent): void {
    cancelEvent(event);

    const props = this.props;
    if (isFn(this.onDescSortDirectionClick)) {
      props.onSortingDirectionChange({
        name: props.name,
        direction: orNull(props.direction !== SortDirectionEnum.ASC, SortDirectionEnum.ASC),
      });
    }
  }

  /**
   * @stable [12.02.2019]
   * @param {IBasicEvent} event
   */
  private onDescSortDirectionClick(event: IBasicEvent): void {
    cancelEvent(event);

    const props = this.props;
    if (isFn(this.onDescSortDirectionClick)) {
      props.onSortingDirectionChange({
        name: props.name,
        direction: orNull(props.direction !== SortDirectionEnum.DESC, SortDirectionEnum.DESC),
      });
    }
  }
}
