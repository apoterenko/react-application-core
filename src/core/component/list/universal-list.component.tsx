import * as React from 'react';
import * as R from 'ramda';

import {
  uuid,
  pageFromNumber,
  pageToNumber,
  orDefault,
  filterAndSortEntities,
  isDef,
} from '../../util';
import { IEntity, IAnySelfWrapper } from '../../definitions.interface';
import { UniversalComponent } from '../base/universal.component';
import { IUniversalListProps, IUniversalButtonProps } from '../../props-definitions.interface';
import { IUniversalMessageProps } from '../message/universal-message.interface';

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
   * @stable [09.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    if (R.isNil(this.getOriginalDataSource())
          || this.isOriginalDataSourceEmpty()
          || props.progress
          || props.error) {
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
   * @stable [09.06.2018]
   * @returns {JSX.Element}
   */
  protected abstract getEmptyMessageAction(): JSX.Element;

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
   * @stable [06.06.2018]
   * @returns {IEntity[]}
   */
  protected getDataSource(): IEntity[] {
    const filteredAndSortedEntities = filterAndSortEntities(
      this.filterAndSortOriginalDataSourceUsingLocalFiltersAndSorters(),
      this.props
    );
    const toNumber = this.toNumber;
    let pagedData;
    return orDefault<IEntity[], IEntity[]>(
      R.isNil(toNumber)
        // Remote and local pagination is supported simultaneously.
        // Length result is zero in the case of remote pagination
        || (pagedData = filteredAndSortedEntities.slice(this.fromNumber, toNumber)).length === 0,
      filteredAndSortedEntities,
      () => pagedData
    );
  }

  /**
   * @stable [09.06.2018]
   * @returns {TMessageComponentProps}
   */
  protected getMessageComponentProps<TMessageComponentProps extends IUniversalMessageProps>(): TMessageComponentProps {
    const props = this.props;
    return {
      error: props.error,
      progress: props.progress,
      emptyData: this.isOriginalDataSourceEmpty(),
      emptyMessage: this.getEmptyMessage(),
      emptyDataMessage: props.emptyDataMessage,
    } as TMessageComponentProps;
  }

  /**
   * @stable [09.06.2018]
   * @returns {TActionComponentProps}
   */
  protected getEmptyMessageActionComponentProps<TActionComponentProps extends IUniversalButtonProps>(): TActionComponentProps {
    const props = this.props;
    return {
      ...props.emptyMessageActionConfiguration as {},
      text: props.emptyMessage,
      onClick: props.onEmptyMessageClick,
    } as TActionComponentProps;
  }

  /**
   * @stable [23.04.2018]
   * @returns {IEntity[]}
   */
  protected getOriginalDataSource(): IEntity[] {
    return this.props.data;
  }

  /**
   * @stable [06.06.2018]
   * @returns {IEntity[]}
   */
  protected filterAndSortOriginalDataSourceUsingLocalFiltersAndSorters(): IEntity[] {
    return this.getOriginalDataSource();
  }

  /**
   * @stable [09.06.2018]
   * @returns {React.ReactNode}
   */
  private getEmptyMessage(): React.ReactNode {
    const props = this.props;
    return (
      orDefault<JSX.Element, string>(
        props.emptyMessageAction && isDef(props.onEmptyMessageClick),
        () => this.getEmptyMessageAction(),
        () => props.emptyMessage
      )
    );
  }

  /**
   * @stable [09.06.2018]
   * @returns {boolean}
   */
  private isOriginalDataSourceEmpty(): boolean {
    const originalDataSource = this.getOriginalDataSource();
    return Array.isArray(originalDataSource) && !originalDataSource.length;
  }

  /**
   * @stable [09.05.2018]
   * @returns {number}
   */
  private get fromNumber(): number {
    return pageFromNumber(this.props) - 1;
  }

  /**
   * @stable [09.05.2018]
   * @returns {number}
   */
  private get toNumber(): number {
    return pageToNumber(this.props);
  }
}
