import * as React from 'react';
import * as R from 'ramda';

import {
  filterAndSortEntities,
  FilterUtils,
  NvlUtils,
  PageUtils,
  uuid,
} from '../../util';
import {
  AnyT,
  IEntity,
  IKeyValue,
} from '../../definitions.interface';
import { UniversalComponent } from '../base/universal.component';
import { Info } from '../info/info.component';
import { PageToolbar } from '../toolbar/page/page-toolbar.component';
import {
  DefaultEntities,
  IListRowsConfigEntity,
  SyntheticEmitterEventsEnum,
} from '../../definition';

export abstract class BaseList<TProps extends IKeyValue,  // TODO Props
  TState extends {page?: number} = any,
  TSelfRef = AnyT>
  extends UniversalComponent<TProps, TState, TSelfRef> {

  /**
   * @stable [16.07.2020]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.fireRefreshEvent = this.fireRefreshEvent.bind(this);
    this.onLocalPagingFirst = this.onLocalPagingFirst.bind(this);
    this.onLocalPagingNext = this.onLocalPagingNext.bind(this);
    this.onLocalPagingPrevious = this.onLocalPagingPrevious.bind(this);
  }

  /**
   * @stable [21.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    if (this.originalDataSourceDoesNotExist
          || this.areDataMissing
          || props.progress
          || props.error) {
      return this.getMessage();
    }
    return this.getView();
  }

  /**
   * @stable [16.07.2020]
   * @param {IListRowsConfigEntity} cfg
   * @returns {JSX.Element}
   */
  protected getPageToolbarElement(cfg: IListRowsConfigEntity): JSX.Element {
    const {
      localPagination,
      pageSize,
    } = this.originalProps;

    if (!localPagination) {
      return null;
    }
    const {
      page,
    } = this.state;

    return (
      <PageToolbar
        page={page}
        pageSize={pageSize}
        totalCount={cfg.totalCount}
        onFirst={this.onLocalPagingFirst}
        onLast={() => this.setState({page: cfg.pagesCount}, this.fireRefreshEvent)}
        onNext={this.onLocalPagingNext}
        onPrevious={this.onLocalPagingPrevious}/>
    );
  }

  protected getMessage(): JSX.Element {
    const {
      emptyDataMessage,
      emptyMessage,
      error,
      progress,
    } = this.props;
    const areDataMissing = this.areDataMissing;

    return (
      <Info
        error={error}
        message={emptyMessage}
        progress={progress}
        emptyData={
          areDataMissing
            ? NvlUtils.nvl(emptyDataMessage, areDataMissing)
            : areDataMissing
        }/>
    );
  }

  /**
   * @stable [23.04.2018]
   * @returns {JSX.Element}
   */
  protected abstract getView(): JSX.Element;

  /**
   * @stable [10.06.2020]
   * @param {IEntity} entity
   * @returns {boolean}
   */
  protected isEntitySelected(entity: IEntity): boolean {
    return FilterUtils.SAME_ENTITY_PREDICATE(this.originalProps.selected, entity);
  }

  /**
   * @stable [04.05.2020]
   * @param {IEntity} entity
   * @returns {string}
   */
  protected toRowKey(entity: IEntity): string {
    return `data-row-${R.isNil(entity.id) ? uuid() : entity.id}`;
  }

  /**
   * @stable [04.05.2020]
   * @returns {IEntity[]}
   */
  protected get originalDataSource(): IEntity[] {
    return this.props.data;
  }

  /**
   * @stable [17.06.2018]
   * @returns {IEntity[]}
   */
  protected get dataSource(): IEntity[] {
    const filteredAndSortedEntities = filterAndSortEntities(
      this.filterAndSortOriginalDataSourceUsingLocalFiltersAndSorters(),
      // @ts-ignore TODO
      this.props
    );
    const toNumber = this.toNumber;
    let pagedData;

    return R.isNil(toNumber)
        // Remote and local pagination are supported simultaneously.
        // The length result is equal to zero in a remote pagination case
      || (pagedData = filteredAndSortedEntities.slice(this.fromNumber, toNumber)).length === 0
      ? filteredAndSortedEntities
      : pagedData;
  }

  /**
   * @stable [06.06.2018]
   * @returns {IEntity[]}
   */
  protected filterAndSortOriginalDataSourceUsingLocalFiltersAndSorters(): IEntity[] {
    return this.originalDataSource;
  }

  /**
   * @stable [16.07.2020]
   */
  private onLocalPagingNext(): void {
    this.setState((previousState) => ({page: previousState.page + 1}), this.fireRefreshEvent);
  }

  /**
   * @stable [16.07.2020]
   */
  private onLocalPagingPrevious(): void {
    this.setState((previousState) => ({page: previousState.page - 1}), this.fireRefreshEvent);
  }

  /**
   * @stable [16.07.2020]
   */
  private onLocalPagingFirst(): void {
    this.setState((previousState) => ({page: DefaultEntities.FIRST_PAGE}), this.fireRefreshEvent);
  }

  /**
   * @stable [16.07.2020]
   */
  private fireRefreshEvent(): void {
    this.eventEmitter.emit(SyntheticEmitterEventsEnum.REFRESH); // To update synthetic scrollbar
  }

  /**
   * @stable [18.10.2018]
   * @returns {boolean}
   */
  protected get isRemoteMode(): boolean {
    return !this.props.localFiltration;
  }

  /**
   * @stable [17.06.2018]
   * @returns {boolean}
   */
  protected get areDataMissing(): boolean {
    if (this.originalDataSourceDoesNotExist) {
      return false; // It's important to show the difference between the conditions: length === 0 and data === null!
    }
    const dataSource = this.isRemoteMode
      ? this.dataSource
      : this.originalDataSource;  // In the case of a local filtering we need to get a false result

    return Array.isArray(dataSource) && dataSource.length === 0;
  }

  /**
   * @stable [17.06.2018]
   * @returns {boolean}
   */
  private get originalDataSourceDoesNotExist(): boolean {
    return R.isNil(this.originalDataSource);
  }

  /**
   * @stable [10.06.2020]
   * @returns {number}
   */
  private get fromNumber(): number {
    return PageUtils.pageCursorFrom(this.originalProps) - 1;
  }

  /**
   * @stable [10.06.2020]
   * @returns {number}
   */
  private get toNumber(): number {
    return PageUtils.pageCursorTo(this.originalProps);
  }
}
