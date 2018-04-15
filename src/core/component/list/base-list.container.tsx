import * as React from 'react';

import { BaseContainer } from '../base';
import { IEntity, ISelectedEntityWrapper } from '../../definitions.interface';
import {
  LIST_SELECT_ACTION_TYPE,
} from './list-reducer.interface';
import { IContainerEntity } from '../../entities-definitions.interface';

export class BaseListContainer<TInternalProps extends IContainerEntity>
  extends BaseContainer<TInternalProps, {}> {

  /**
   * @stable - 04.04.2018
   * @param {TInternalProps} props
   */
  constructor(props: TInternalProps) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  /**
   * @stable - 04.04.2018
   * @param {IEntity} entity
   */
  protected onSelect(entity: IEntity): void {
    const actionParams: ISelectedEntityWrapper = {selected: entity};
    this.dispatch(LIST_SELECT_ACTION_TYPE, actionParams);
  }
}
