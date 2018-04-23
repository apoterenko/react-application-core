import * as React from 'react';
import * as R from 'ramda';

import { uuid } from '../../util';
import { IEntity, IAnySelfWrapper } from '../../definitions.interface';
import { IUniversalListProps } from './universal-list.interface';
import { UniversalComponent } from '../base/universal.component';

export abstract class UniversalList<TComponent extends UniversalList<TComponent, TProps, TState>,
                                    TProps extends IUniversalListProps,
                                    TState = {}>
  extends UniversalComponent<TComponent, TProps, TState> {

  /**
   * @stable [23.04.2018]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.onCreate = this.onCreate.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  /**
   * @stable [23.04.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    if (!this.getOriginalDataSource()
          || props.progress
          || props.error
          || this.isOriginalDataSourceEmpty()) {
      return this.getMessage();
    }
    return this.getView();
  }

  /**
   * @stable [23.04.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    const selected = this.props.selected;
    if (selected) {
      const rowItem = this.refs[this.toRowKey(selected)] as IAnySelfWrapper;
      if (rowItem) {
        const container = this.refs.container;
        this.doScrollIntoView(
          rowItem.self,
          container instanceof Element
            ? container as Element
            : (container as IAnySelfWrapper).self
        );
      }
    }
  }

  /**
   * @stable [23.04.2018]
   * @param {Element} item
   * @param {Element} view
   */
  protected abstract doScrollIntoView(item: Element, view: Element): void;

  /**
   * @stable [23.04.2018]
   * @returns {JSX.Element}
   */
  protected abstract getMessage(): JSX.Element;

  /**
   * @stable [23.04.2018]
   * @returns {JSX.Element}
   */
  protected abstract getView(): JSX.Element;

  /**
   * @stable [23.04.2018]
   */
  protected onCreate(): void {
    if (this.props.onCreate) {
      this.props.onCreate();
    }
  }

  /**
   * @stable [23.04.2018]
   * @param {IEntity} entity
   */
  protected onSelect(entity: IEntity): void {
    if (this.props.onSelect) {
      this.props.onSelect(entity);
    }
  }

  /**
   * @stable [23.04.2018]
   * @param {IEntity} entity
   * @returns {boolean}
   */
  protected isEntitySelected(entity: IEntity): boolean {
    const props = this.props;
    return props.selected === entity || (props.selected && props.selected.id === entity.id);
  }

  /**
   * @stable [23.04.2018]
   * @param {IEntity} entity
   * @returns {string}
   */
  protected toRowKey(entity: IEntity): string {
    return `data-row-${entity.id || uuid()}`;   // Infinity scroll supporting
  }

  /**
   * @stable [23.04.2018]
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
   * @stable [23.04.2018]
   * @returns {IEntity[]}
   */
  protected getOriginalDataSource(): IEntity[] {
    return this.props.data;
  }

  /**
   * @stable [23.04.2018]
   * @returns {boolean}
   */
  protected isOriginalDataSourceEmpty(): boolean {
    const originalDataSource = this.getOriginalDataSource();
    return Array.isArray(originalDataSource) && !originalDataSource.length;
  }
}
