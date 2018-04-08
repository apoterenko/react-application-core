import * as React from 'react';
import * as R from 'ramda';

import { toClassName, orNull, uuid, scrollIntoView } from '../../util';
import { BaseComponent, IBaseComponentInternalProps } from '../base';
import { IEntity, IAnySelfWrapper } from '../../definitions.interface';
import { IBaseListEntity } from '../../entities-definitions.interface';
import { IBaseListConfiguration } from '../../configurations-definitions.interface';

export class BaseList<TList extends BaseList<TList, TInternalProps>,
                      TInternalProps extends IBaseComponentInternalProps
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

  /**
   * @stable - 08.04.2018
   */
  public componentDidMount(): void {
    super.componentDidMount();

    const selected = this.props.selected;
    if (selected) {
      const rowItem = this.refs[this.toRowKey(selected)] as IAnySelfWrapper;
      if (rowItem) {
        scrollIntoView(
          rowItem.self,
          this.refs.container instanceof HTMLElement
            ? this.refs.container as HTMLElement
            : (this.refs.container as IAnySelfWrapper).self
        );
      }
    }
  }

  /**
   * @stable - 04.04.2018
   * @returns {JSX.Element}
   */
  protected getAddAction(): JSX.Element {
    return orNull<JSX.Element>(
      this.props.useAddAction,
      () => this.uiFactory.makeIcon({
        type: 'add',
        className: toClassName(
          'rac-list-add-button',
          'rac-flex-center',
          this.uiFactory.fab
        ),
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

  /**
   * @stable - 08.04.2018
   * @returns {string}
   */
  protected get errorMessage(): string {
    return this.t(
      this.props.errorMessage || 'Something went wrong. There was a problem loading your data'
    );
  }

  /**
   * @stable - 08.04.2018
   * @returns {string}
   */
  protected get emptyDataMessage(): string {
    return this.t(this.props.emptyDataMessage || 'No data found');
  }

  /**
   * @stable - 08.04.2018
   * @returns {string}
   */
  protected get emptyMessage(): string {
    return this.t(this.props.emptyMessage || 'No data');
  }
}
