import * as React from 'react';

import { BaseContainer, IBaseContainerInternalProps } from '../base';
import { IEntity, ISelectedEntityWrapper } from '../../definitions.interface';
import {
  LIST_SELECT_ACTION_TYPE,
} from './list.interface';

export class BaseListContainer<TInternalProps extends IBaseContainerInternalProps>
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
