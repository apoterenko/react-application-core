import * as React from 'react';

import {
  IGenericSearchToolbarContainerProps,
} from './search-toolbar.interface';
import { GenericContainer } from '../../base/generic.container';
import { SearchToolbar } from './search-toolbar.component';
import { FilterActionBuilder } from '../../../action';

export class SearchToolbarContainer extends GenericContainer<IGenericSearchToolbarContainerProps> {

  /**
   * @stable [27.04.2020]
   * @param {IGenericSearchToolbarContainerProps} props
   */
  constructor(props: IGenericSearchToolbarContainerProps) {
    super(props);

    this.onActivate = this.onActivate.bind(this);
    this.onApply = this.onApply.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onDeactivate = this.onDeactivate.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    return (
      <SearchToolbar
        {...props.filter}
        {...props.filterConfiguration}
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
  }

  /**
   * @stable [27.04.2020]
   */
  private onActivate(): void {
    this.dispatchPlainAction(FilterActionBuilder.buildActivatePlainAction(this.sectionName));
  }

  /**
   * @stable [27.04.2020]
   */
  private onDeactivate(): void {
    this.dispatchPlainAction(FilterActionBuilder.buildDeactivatePlainAction(this.sectionName));
  }

  /**
   * @stable [27.04.2020]
   * @param {string} query
   */
  private onChange(query: string): void {
    this.dispatchPlainAction(FilterActionBuilder.buildChangePlainAction(this.sectionName, query));
  }
}
