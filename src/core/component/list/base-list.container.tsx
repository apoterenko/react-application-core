import * as React from 'react';

import { IEntity } from '../../definitions.interface';
import {
  IBaseListContainerProps,
  IListProps,
} from '../../definition';
import { GenericContainer } from '../base/generic.container';

export class BaseListContainer<TProps extends IBaseListContainerProps = IBaseListContainerProps,
                               TListProps extends IListProps = IListProps>
  extends GenericContainer<TProps> {

  /**
   * @stable [11.06.2020]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
  }

  /**
   * @stable [11.06.2020]
   */
  public componentWillUnmount(): void {
    this.listStoreProxy.dispatchListCancelLoad();
  }

  /**
   * @stable [30.03.2020]
   * @returns {TComponentProps}
   */
  protected getComponentProps(): TListProps {
    return {
      onSelect: this.onSelect,
      ...this.props.list as {},
    } as TListProps;
  }

  /**
   * @stable [11.06.2020]
   * @param {IEntity} entity
   */
  private onSelect(entity: IEntity): void {
    this.listStoreProxy.dispatchListSelect(entity);
  }
}
