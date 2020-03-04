import * as React from 'react';
import * as R from 'ramda';

import {
  filterAndSortEntities,
  pageFromNumber,
  pageToNumber,
  SAME_ENTITY_PREDICATE,
  uuid,
} from '../../util';
import {
  AnyT,
  IEntity,
} from '../../definitions.interface';
import { UniversalComponent } from '../base/universal.component';
import { IUniversalMessageProps } from '../message/universal-message.interface';

export abstract class UniversalList<TProps extends any,  // TODO Props
                                    TState = {},
                                    TSelfRef = AnyT>
  extends UniversalComponent<TProps, TState, TSelfRef> {

  /**
   * @stable [21.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    if (this.originalDataSourceDoesNotExist
          || this.emptyData
          || props.progress
          || props.error) {
      return this.getMessage();
    }
    return this.getView();
  }

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
   * @stable [23.10.2019]
   * @param {IEntity} entity
   * @returns {boolean}
   */
  protected isEntitySelected(entity: IEntity): boolean {
    return SAME_ENTITY_PREDICATE(this.props.selected, entity);
  }

  /**
   * @stable [19.08.2018]
   * @param {IEntity} entity
   * @returns {string}
   */
  protected toRowKey(entity: IEntity): string {
    return `data-row-${R.isNil(entity.id) ? uuid() : entity.id}`;   // Infinity scroll supporting
  }

  /**
   * @stable [17.06.2018]
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
   * @stable [09.06.2018]
   * @returns {TMessageComponentProps}
   */
  protected getMessageComponentProps<TMessageComponentProps extends IUniversalMessageProps>(): TMessageComponentProps {
    const props = this.props;
    return {
      error: props.error,
      progress: props.progress,
      emptyData: this.emptyData,
      emptyMessage: this.emptyMessage,
      emptyDataMessage: props.emptyDataMessage,
      errorMessage: props.error,
    } as TMessageComponentProps;
  }

  /**
   * @stable [06.06.2018]
   * @returns {IEntity[]}
   */
  protected filterAndSortOriginalDataSourceUsingLocalFiltersAndSorters(): IEntity[] {
    return this.originalDataSource;
  }

  /**
   * @stable [18.10.2018]
   * @returns {boolean}
   */
  protected get isRemoteMode(): boolean {
    return !this.props.localFiltration;
  }

  /**
   * @stable [09.06.2018]
   * @returns {React.ReactNode}
   */
  private get emptyMessage(): React.ReactNode {
    return this.props.emptyMessage;
  }

  /**
   * @stable [17.06.2018]
   * @returns {boolean}
   */
  private get emptyData(): boolean {
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
