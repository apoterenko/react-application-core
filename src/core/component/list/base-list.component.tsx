import * as React from 'react';
import * as R from 'ramda';

import { toClassName, orNull, uuid, scrollIntoView } from '../../util';
import { BaseComponent } from '../base';
import { IEntity, IAnySelfWrapper } from '../../definitions.interface';
import { IBaseListEntity } from '../../entities-definitions.interface';
import { IBaseListConfiguration } from '../../configurations-definitions.interface';
import { Message } from '../message';
import { IComponentEntity } from '../../entities-definitions.interface';

export class BaseList<TList extends BaseList<TList, TInternalProps>,
                      TInternalProps extends IComponentEntity
                                              & IBaseListConfiguration
                                              & IBaseListEntity>
  extends BaseComponent<TList, TInternalProps, {}> {

  /**
   * @stable - 04.04.2018
   * @param {TInternalProps} props
   */
  constructor(props: TInternalProps) {
    super(props);
    this.onCreate = this.onCreate.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    const originalDataSourceEmpty = this.isOriginalDataSourceEmpty();

    if (!this.getOriginalDataSource()
      || props.progress
      || props.error
      || originalDataSourceEmpty) {
      return (
        <Message emptyData={originalDataSourceEmpty}
                 error={props.error}
                 progress={props.progress}>
          {this.getAddAction()}
        </Message>
      );
    }
    return null;
  }

  /**
   * @stable - 08.04.2018
   */
  public componentDidMount(): void {
    super.componentDidMount();

    const selected = this.props.selected;
    if (selected) {
      const rowItem = this.refs[this.toRowKey(selected)] as IAnySelfWrapper;
      if (rowItem) {
        const container = this.refs.container;
        scrollIntoView(
          rowItem.self,
          container instanceof HTMLElement
            ? container as HTMLElement
            : (container as IAnySelfWrapper).self
        );
      }
    }
  }

  /**
   * @stable - 08.04.2018
   * @returns {JSX.Element}
   */
  protected getAddAction(): JSX.Element {
    return orNull<JSX.Element>(
      this.props.useAddAction,
      () => this.uiFactory.makeIcon({
        type: 'add',
        className: toClassName('rac-add-button', this.uiFactory.fab),
        onClick: this.onCreate,
      })
    );
  }

  /**
   * @stable - 04.04.2018
   */
  protected onCreate(): void {
    if (this.props.onCreate) {
      this.props.onCreate();
    }
  }

  /**
   * @stable - 04.04.2018
   * @param {IEntity} entity
   */
  protected onSelect(entity: IEntity): void {
    if (this.props.onSelect) {
      this.props.onSelect(entity);
    }
  }

  /**
   * @stable - 08.04.2018
   * @param {IEntity} entity
   * @returns {boolean}
   */
  protected isEntitySelected(entity: IEntity): boolean {
    const props = this.props;
    return props.selected === entity || (props.selected && props.selected.id === entity.id);
  }

  /**
   * @stable - 08.04.2018
   * @param {IEntity} entity
   * @returns {string}
   */
  protected toRowKey(entity: IEntity): string {
    return `data-row-${entity.id || uuid()}`;   // Infinity scroll supporting
  }

  /**
   * @stable - 08.04.2018
   * @returns {IEntity[]}
   */
  protected getDataSource(): IEntity[] {
    const props = this.props;
    const originalDataSource = this.getOriginalDataSource();
    return (
      props.sorter
        ? R.sort<IEntity>(props.sorter, originalDataSource)
        : originalDataSource
    );
  }

  /**
   * @stable - 08.04.2018
   * @returns {IEntity[]}
   */
  protected getOriginalDataSource(): IEntity[] {
    return this.props.data;
  }

  /**
   * @stable - 08.04.2018
   * @returns {boolean}
   */
  protected isOriginalDataSourceEmpty(): boolean {
    const originalDataSource = this.getOriginalDataSource();
    return Array.isArray(originalDataSource) && !originalDataSource.length;
  }
}
