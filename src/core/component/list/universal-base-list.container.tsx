import * as React from 'react';

import { IEntity } from '../../definitions.interface';
import { IFieldChangeEntity, ISelectedEntity } from '../../definition';
import {
  LIST_SELECT_ACTION_TYPE,
  LIST_CREATE_ACTION_TYPE,
  LIST_CHANGE_ACTION_TYPE,
  LIST_CANCEL_LOAD_ACTION_TYPE,
} from './list.interface';
import { UniversalContainer } from '../base/universal.container';

export class UniversalBaseListContainer<TProps extends any> extends UniversalContainer<TProps> { // TODO

  /**
   * @stable [09.06.2018]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * @stable [31.08.2018]
   */
  public componentWillUnmount(): void {
    this.dispatchFrameworkAction(LIST_CANCEL_LOAD_ACTION_TYPE);
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
  protected getComponentProps<TComponentProps extends any>(): TComponentProps { // TODO
    return {
      onChange: this.onChange,
      onSelect: this.onSelect,
      onCreate: this.onCreate,
      ...this.props.list as {},
    } as any /* TComponentProps */;
  }

  /**
   * @stable [05.05.2018]
   */
  private onCreate(): void {
    this.dispatchFrameworkAction(LIST_CREATE_ACTION_TYPE);
  }

  /**
   * @stable [05.05.2018]
   * @param {IEntity} entity
   */
  private onSelect(entity: IEntity): void {
    this.dispatchFrameworkAction<ISelectedEntity>(LIST_SELECT_ACTION_TYPE, {selected: entity});
  }
}
