import * as React from 'react';

import { IEntity, ISelectedEntityWrapper } from '../../definitions.interface';
import { LIST_SELECT_ACTION_TYPE, LIST_CREATE_ACTION_TYPE } from './list-reducer.interface';
import { IContainerProps } from '../../props-definitions.interface';
import { UniversalBaseContainer } from '../base/universal-base.container';

export class UniversalBaseListContainer<TProps extends IContainerProps> extends UniversalBaseContainer<TProps> {

  /**
   * @stable [05.05.2018]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  /**
   * @stable [05.05.2018]
   * @param {IEntity} entity
   */
  protected onSelect(entity: IEntity): void {
    const payload: ISelectedEntityWrapper = {selected: entity};
    this.dispatch(LIST_SELECT_ACTION_TYPE, payload);
  }

  /**
   * @stable [05.05.2018]
   */
  protected onCreate(): void {
    this.dispatch(LIST_CREATE_ACTION_TYPE);
  }
}
