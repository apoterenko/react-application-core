import * as React from 'react';

import { BaseContainer, IBaseContainerInternalProps } from '../base';
import { IEntity, ISelectedEntityWrapper } from '../../definitions.interface';
import {
  LIST_SELECT_ACTION_TYPE,
} from './list.interface';

export class BaseListContainer<TInternalProps extends IBaseContainerInternalProps>
  extends BaseContainer<TInternalProps, {}> {

  constructor(props: TInternalProps) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  protected onSelect(entity: IEntity): void {
    const actionParams: ISelectedEntityWrapper = {selected: entity};
    this.dispatch(LIST_SELECT_ACTION_TYPE, actionParams);
  }
}
