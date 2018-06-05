import * as React from 'react';

import { IUniversalListProps } from '../../props-definitions.interface';
import { IEntity, ISelectedEntityWrapper } from '../../definitions.interface';
import { IFieldChangeEntity } from '../../entities-definitions.interface';
import {
  LIST_SELECT_ACTION_TYPE,
  LIST_CREATE_ACTION_TYPE,
  LIST_CHANGE_ACTION_TYPE,
  IUniversalListContainerProps,
} from './list.interface';
import { UniversalContainer } from '../base/universal.container';

export class UniversalBaseListContainer<TProps extends IUniversalListContainerProps> extends UniversalContainer<TProps> {

  /**
   * @stable [06.06.2018]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onChange = this.onChange.bind(this);
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

  /**
   * @stable - 05.04.2018
   * @param {IFieldChangeEntity} payload
   */
  protected onChange(payload: IFieldChangeEntity): void {
    this.dispatch(LIST_CHANGE_ACTION_TYPE, payload);
  }

  /**
   * @stable [05.06.2018]
   * @returns {TComponentProps}
   */
  protected getComponentProps<TComponentProps extends IUniversalListProps>(): TComponentProps {
    return {
      onChange: this.onChange,
      onSelect: this.onSelect,
      onCreate: this.onCreate,
      ...this.props.list as {},
    } as TComponentProps;
  }
}
