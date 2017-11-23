import * as React from 'react';

import { BaseContainer } from '../../../component/base';
import { SearchToolbar } from '../../../component/toolbar';
import {
  FILTER_ACTIVATE_ACTION_TYPE,
  FILTER_CHANGE_ACTION_TYPE,
  FILTER_APPLY_ACTION_TYPE,
  FILTER_OPEN_ACTION_TYPE,
  FILTER_DESTROY_ACTION_TYPE,
} from '../../../component/filter';
import { ISearchToolbarContainerInternalProps } from './search-toolbar.interface';

export class SearchToolbarContainer extends BaseContainer<ISearchToolbarContainerInternalProps, {}> {

  constructor(props: ISearchToolbarContainerInternalProps) {
    super(props);

    this.onApply = this.onApply.bind(this);
    this.onActivate = this.onActivate.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  public componentWillUnmount(): void {
    this.dispatch(FILTER_DESTROY_ACTION_TYPE);
  }

  public render(): JSX.Element {
    const props = this.props;
    return (
        <SearchToolbar onApply={this.onApply}
                       onActivate={this.onActivate}
                       onChange={this.onChange}
                       onOpen={this.onOpen}
                       {...props.filter}
                       {...props.filterOptions}/>
    );
  }

  private onApply(value?: string): void {
    this.dispatch(FILTER_APPLY_ACTION_TYPE, { value });

    if (this.props.onApply) {
      this.props.onApply(value);
    }
  }

  private onOpen(): void {
    this.dispatch(FILTER_OPEN_ACTION_TYPE);
  }

  private onActivate(): void {
    this.dispatch(FILTER_ACTIVATE_ACTION_TYPE);
  }

  private onChange(query: string): void {
    this.dispatch(FILTER_CHANGE_ACTION_TYPE, { query });
  }
}
