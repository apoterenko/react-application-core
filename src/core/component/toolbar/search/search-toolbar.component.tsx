import * as React from 'react';

import { BaseComponent } from 'core/component/base';
import { TextField } from 'core/component/field';
import { DelayedChangesFieldPlugin, IBasicTextFieldAction } from 'core/component/field';

import {
  ISearchToolbarInternalState,
  ISearchToolbarInternalProps
} from './search-toolbar.interface';

export class SearchToolbar extends BaseComponent<SearchToolbar,
                                                 ISearchToolbarInternalProps,
                                                 ISearchToolbarInternalState> {

  private actions: IBasicTextFieldAction[] = [{
    type: 'filter_list',
    actionHandler: this.onFilterClick.bind(this),
  }];

  constructor(props: ISearchToolbarInternalProps) {
    super(props);
    this.onSearchClick = this.onSearchClick.bind(this);
    this.doSearch = this.doSearch.bind(this);

    this.state = { activated: false };
  }

  public render(): JSX.Element {
    const state = this.state;
    const className = ['mdc-toolbar', 'app-search-toolbar', this.props.className];
    let searchFieldTpl;

    if (state.activated) {
      searchFieldTpl = (
          <section className={'mdc-toolbar__section visible'}>
            <TextField persistent={false}
                       autoFocus={true}
                       placeholder={'Search'}
                       actions={this.actions}
                       onDelay={this.doSearch}
                       plugins={DelayedChangesFieldPlugin}>
            </TextField>
          </section>
      );
    }
    return (
        <div className={className.filter((cls) => !!cls).join(' ')}>
          <div className='mdc-toolbar__row'>
            <section>
              <div className='material-icons mdc-toolbar__icon'
                   onClick={this.onSearchClick}>
                search
              </div>
            </section>
            {searchFieldTpl}
          </div>
        </div>
    );
  }

  private onSearchClick(): void {
    this.setState({ activated: true });
  }

  private onFilterClick(): void {
    if (this.props.onFilter) {
      this.props.onFilter();
    }
  }

  private doSearch(value: string): void {
    if (this.props.onSearch) {
      this.props.onSearch(value);
    }
  }
}
