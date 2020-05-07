import * as React from 'react';

import { FilterActionBuilder } from '../../../action';
import { GenericContainer } from '../../base/generic.container';
import {
  ISearchToolbarContainerProps,
  ISearchToolbarProps,
} from '../../../definition';
import { SearchToolbar } from './search-toolbar.component';
import {
  ComponentMappers,
  ifNotNilThanValue,
} from '../../../util';

/**
 * @component-container-impl
 * @stable [06.05.2020]
 *
 * Please use the "Mappers.searchToolbarContainerProps"
 */
export class SearchToolbarContainer extends GenericContainer<ISearchToolbarContainerProps> {

  /**
   * @stable [27.04.2020]
   * @param {ISearchToolbarContainerProps} props
   */
  constructor(props: ISearchToolbarContainerProps) {
    super(props);

    this.onActivate = this.onActivate.bind(this);
    this.onApply = this.onApply.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDeactivate = this.onDeactivate.bind(this);
  }

  /**
   * @stable [06.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
      <SearchToolbar
        {...ComponentMappers.searchToolbarContainerPropsAsSearchToolbarProps(this.props)}
        onApply={this.onApply}
        onActivate={this.onActivate}
        onDeactivate={this.onDeactivate}
        onChange={this.onChange}/>
    );
  }

  /**
   * @stable [27.04.2020]
   */
  private onApply(): void {
    this.dispatchPlainAction(FilterActionBuilder.buildApplyPlainAction(this.sectionName));
    ifNotNilThanValue(this.toolbarConfiguration.onApply, (onApply) => onApply());
  }

  /**
   * @stable [27.04.2020]
   */
  private onActivate(): void {
    this.dispatchPlainAction(FilterActionBuilder.buildActivatePlainAction(this.sectionName));
    ifNotNilThanValue(this.toolbarConfiguration.onActivate, (onActivate) => onActivate());
  }

  /**
   * @stable [27.04.2020]
   */
  private onDeactivate(): void {
    this.dispatchPlainAction(FilterActionBuilder.buildDeactivatePlainAction(this.sectionName));
    ifNotNilThanValue(this.toolbarConfiguration.onDeactivate, (onDeactivate) => onDeactivate());
  }

  /**
   * @stable [27.04.2020]
   * @param {string} query
   */
  private onChange(query: string): void {
    this.dispatchPlainAction(FilterActionBuilder.buildChangePlainAction(this.sectionName, query));
    ifNotNilThanValue(this.toolbarConfiguration.onChange, (onChange) => onChange(query));
  }

  /**
   * @stable [06.05.2020]
   * @returns {ISearchToolbarProps}
   */
  private get toolbarConfiguration(): ISearchToolbarProps {
    return this.props.toolbarConfiguration || {};
  }
}
