import * as React from 'react';

import { IPayloadWrapper } from '../../definitions.interface';
import { ISortDirectionEntity } from '../../entities-definitions.interface';
import { Grid } from './grid.component';
import { IGridContainerProps } from './grid.interface';
import {
  UniversalBaseListContainer,
  LIST_CHANGE_SORT_DIRECTION_ACTION_TYPE,
} from '../list';

export class GridContainer extends UniversalBaseListContainer<IGridContainerProps> {

  /**
   * @stable [06.06.2018]
   * @param {IGridContainerProps} props
   */
  constructor(props: IGridContainerProps) {
    super(props);
    this.onChangeSortDirection = this.onChangeSortDirection.bind(this);
  }

  /**
   * @stable [05.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return <Grid onChangeSortDirection={this.onChangeSortDirection}
                 {...this.getComponentProps()}
                 {...this.props.gridConfiguration}/>;
  }

  /**
   * @stable [06.06.2018]
   * @param {ISortDirectionEntity} sortDirectionEntity
   */
  private onChangeSortDirection(sortDirectionEntity: ISortDirectionEntity): void {
    const payloadWrapper: IPayloadWrapper<ISortDirectionEntity> = {payload: sortDirectionEntity};
    this.dispatch(LIST_CHANGE_SORT_DIRECTION_ACTION_TYPE, payloadWrapper);
  }
}
