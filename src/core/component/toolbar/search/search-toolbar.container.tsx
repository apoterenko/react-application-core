import * as React from 'react';

import { BaseContainer } from '../../../component/base';
import { SearchToolbar } from '../../../component/toolbar';
import {
  FILTER_ACTIVATE_ACTION_TYPE,
  FILTER_QUERY_ACTION_TYPE,
  FILTER_APPLY_ACTION_TYPE,
  FILTER_OPEN_ACTION_TYPE,
  FILTER_DESTROY_ACTION_TYPE,
} from '../../../component/filter';

import { ISearchToolbarContainerInternalProps } from './search-toolbar.interface';

export class SearchToolbarContainer extends BaseContainer<ISearchToolbarContainerInternalProps, {}> {

  constructor(props: ISearchToolbarContainerInternalProps) {
    super(props);

    this.onSearch = this.onSearch.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.onFilterAction = this.onFilterAction.bind(this);
    this.onChangeFilterQuery = this.onChangeFilterQuery.bind(this);
  }

  public componentWillUnmount(): void {
    this.dispatch(FILTER_DESTROY_ACTION_TYPE);
  }

  public render(): JSX.Element {
    const props = this.props;
    return (
        <SearchToolbar {...props.filter}
                       {...props.filterOptions}
                       onSearch={this.onSearch}
                       onFilter={this.onFilter}
                       onChangeQuery={this.onChangeFilterQuery}
                       onFilterAction={this.onFilterAction}>
        </SearchToolbar>
    );
  }

  private onSearch(value: string): void {
    this.dispatch(FILTER_APPLY_ACTION_TYPE, { value });

    if (this.props.onSearch) {
      this.props.onSearch(value);
    }
  }

  private onFilterAction(): void {
    this.dispatch(FILTER_OPEN_ACTION_TYPE);
  }

  private onFilter(): void {
    this.dispatch(FILTER_ACTIVATE_ACTION_TYPE);
  }

  private onChangeFilterQuery(value: string): void {
    this.dispatch(FILTER_QUERY_ACTION_TYPE, { query: value.trim() });
  }
}
