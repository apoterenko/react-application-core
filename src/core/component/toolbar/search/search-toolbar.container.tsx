import * as React from 'react';

import { FilterActionBuilder } from '../../../action';
import { GenericContainer } from '../../base/generic.container';
import { ISearchToolbarContainerProps } from '../../../definition';
import { Mappers } from '../../../util';
import { SearchToolbar } from './search-toolbar.component';

/**
 * @component-container-impl
 * @stable [31.07.2020]
 *
 * Please use the "Mappers.searchToolbarContainerProps"
 */
export class SearchToolbarContainer extends GenericContainer<ISearchToolbarContainerProps> {

  /**
   * @stable [31.07.2020]
   * @param props
   */
  constructor(props: ISearchToolbarContainerProps) {
    super(props);

    this.onActivate = this.onActivate.bind(this);
    this.onApply = this.onApply.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDeactivate = this.onDeactivate.bind(this);
  }

  /**
   * @stable [31.07.2020]
   */
  public render(): JSX.Element {
    return (
      <SearchToolbar
        {...Mappers.searchToolbarContainerPropsAsSearchToolbarProps(this.originalProps)}
        onActivate={this.onActivate}
        onApply={this.onApply}
        onChange={this.onChange}
        onDeactivate={this.onDeactivate}/>
    );
  }

  /**
   * @stable [31.07.2020]
   */
  private onApply(): void {
    this.dispatchPlainAction(FilterActionBuilder.buildApplyPlainAction(this.sectionName));
  }

  /**
   * @stable [31.07.2020]
   */
  private onActivate(): void {
    this.dispatchPlainAction(FilterActionBuilder.buildActivatePlainAction(this.sectionName));
  }

  /**
   * @stable [31.07.2020]
   */
  private onDeactivate(): void {
    this.dispatchPlainAction(FilterActionBuilder.buildDeactivatePlainAction(this.sectionName));
  }

  /**
   * @stable [31.07.2020]
   * @param {string} query
   */
  private onChange(query: string): void {
    this.dispatchPlainAction(FilterActionBuilder.buildChangePlainAction(this.sectionName, query));
  }
}
