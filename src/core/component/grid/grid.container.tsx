import * as React from 'react';

import { ISortDirectionPayloadEntity } from '../../definition';
import { ISortDirectionEntity } from '../../definition';
import { Grid } from './grid.component';
import { IGridContainerProps } from './grid.interface';
import {
  UniversalBaseListContainer,
  LIST_SORTING_DIRECTION_CHANGE_ACTION_TYPE,
} from '../list';

export class GridContainer extends UniversalBaseListContainer<IGridContainerProps> {

  /**
   * @stable [06.06.2018]
   * @param {IGridContainerProps} props
   */
  constructor(props: IGridContainerProps) {
    super(props);
    this.onSortingDirectionChange = this.onSortingDirectionChange.bind(this);
  }

  /**
   * @stable [05.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return <Grid onSortingDirectionChange={this.onSortingDirectionChange}
                 {...this.getComponentProps()}
                 {...this.props.gridConfiguration}/>;
  }

  /**
   * @stable [06.06.2018]
   * @param {ISortDirectionEntity} sortDirectionEntity
   */
  private onSortingDirectionChange(sortDirectionEntity: ISortDirectionEntity): void {
    const payloadWrapper: ISortDirectionPayloadEntity = {payload: sortDirectionEntity};
    this.dispatch(LIST_SORTING_DIRECTION_CHANGE_ACTION_TYPE, payloadWrapper);
  }
}
