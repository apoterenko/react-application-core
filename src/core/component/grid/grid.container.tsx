import * as React from 'react';

import { ISortDirectionEntity, IFieldChangeEntity } from '../../entities-definitions.interface';
import { Grid } from './grid.component';
import { IGridContainerInternalProps } from './grid.interface';
import {
  BaseListContainer,
  LIST_CHANGE_ACTION_TYPE,
  LIST_CHANGE_SORT_DIRECTION_ACTION_TYPE,
} from '../list';

export class GridContainer extends BaseListContainer<IGridContainerInternalProps> {

  /**
   * @stable - 05.04.2018
   * @param {IGridContainerInternalProps} props
   */
  constructor(props: IGridContainerInternalProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onChangeSortDirection = this.onChangeSortDirection.bind(this);
  }

  /**
   * @stable - 05.04.2018
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return <Grid onChange={this.onChange}
                 onSelect={this.onSelect}
                 onChangeSortDirection={this.onChangeSortDirection}
                 {...props.gridConfiguration}
                 {...props.list}/>;
  }

  /**
   * @stable - 05.04.2018
   * @param {IFieldChangeEntity} payload
   */
  private onChange(payload: IFieldChangeEntity): void {
    this.dispatch(LIST_CHANGE_ACTION_TYPE, payload);
  }

  /**
   * @stable - 05.04.2018
   * @param {ISortDirectionEntity} payload
   */
  private onChangeSortDirection(payload: ISortDirectionEntity): void {
    this.dispatch(LIST_CHANGE_SORT_DIRECTION_ACTION_TYPE, payload);
  }
}
