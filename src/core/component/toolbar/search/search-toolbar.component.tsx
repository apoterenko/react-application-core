import * as React from 'react';

import { isUndef, uuid, toClassName } from '../../../util';
import { AnyT } from '../../../definition.interface';
import { BaseComponent } from '../../../component/base';
import { DelayedChangesFieldPlugin, IBasicTextFieldAction, TextField } from '../../../component/field';
import { FilterActionEnum, IApplicationFilterAction } from '../../../component/filter';

import {
  ISearchToolbarInternalState,
  ISearchToolbarInternalProps,
} from './search-toolbar.interface';

export class SearchToolbar extends BaseComponent<SearchToolbar,
                                                 ISearchToolbarInternalProps,
                                                 ISearchToolbarInternalState> {

  public static defaultProps: ISearchToolbarInternalProps = {
    fieldActions: [],
    searchIcon: 'search',
  };

  private defaultActions = {
    [FilterActionEnum.OPEN_FILTER]: {
      type: 'filter_list',
      actionHandler: this.onFilterActionClick.bind(this),
    },
    [FilterActionEnum.CLEAR_FILTER]: {
      type: 'clear',
      actionHandler: this.onClearActionClick.bind(this),
    },
  };

  constructor(props: ISearchToolbarInternalProps) {
    super(props);
    this.onFilter = this.onFilter.bind(this);
    this.doSearch = this.doSearch.bind(this);
    this.onChangeQuery = this.onChangeQuery.bind(this);

    if (this.isPersistent) {
      this.state = {} as ISearchToolbarInternalProps;
    } else {
      this.state = {
        activated: this.definitePropsActivated,
        query: this.definitePropsQuery,
      };
    }
  }

  public componentWillReceiveProps(nextProps: Readonly<ISearchToolbarInternalProps>, nextContext: AnyT): void {
    super.componentWillReceiveProps(nextProps, nextContext);

    if (!this.isPersistent) {
      if (!isUndef(nextProps.activated)) {
        this.setState({ activated: nextProps.activated });
      }
      if (!isUndef(nextProps.query)) {
        this.setState({ query: nextProps.query });
      }
    }
  }

  public render(): JSX.Element {
    const props = this.props;
    let searchFieldTpl = null;

    if (this.isActivated) {
      searchFieldTpl = (
          <section className='mdc-toolbar__section visible'>
            <TextField persistent={false}
                       autoFocus={true}
                       notErrorMessageRequired={true}
                       value={this.query}
                       className='mdc-text-field--box'
                       placeholder={'Search'}
                       actions={this.actions}
                       onDelay={this.doSearch}
                       onChange={this.onChangeQuery}
                       plugins={DelayedChangesFieldPlugin}>
            </TextField>
          </section>
      );
    }
    if (props.noQuery && props.fieldActions.length) {
      const actionsTpl = (
          this.actions.map((action) => (
              <div key={uuid()}
                   className={toClassName('material-icons', 'mdc-toolbar__icon', 'app-action', action.className)}
                   onClick={action.actionHandler}>
                {action.type}
              </div>
          ))
      );
      searchFieldTpl = (
          <section>
            {actionsTpl}
          </section>
      );
    }

    return (
        <div className={toClassName('mdc-toolbar', 'app-toolbar', props.className)}>
          <div className='mdc-toolbar__row'>
            <section>
              <div className='material-icons mdc-toolbar__icon'
                   onClick={this.onFilter}>
                {props.searchIcon}
              </div>
            </section>
            {searchFieldTpl}
          </div>
        </div>
    );
  }

  private get isActivated(): boolean {
    return this.isPersistent ? this.props.activated : this.state.activated;
  }

  private get query(): boolean {
    return this.isPersistent ? this.props.query : this.state.query;
  }

  private onFilter(): void {
    const props = this.props;
    if (props.noQuery) {
      this.doSearch();
    } else {
      if (this.isPersistent) {
        if (props.onFilter) {
          props.onFilter();
        }
      } else {
        this.setState({ activated: true });
      }
    }
  }

  private onChangeQuery(value: string): void {
    if (this.isPersistent) {
      if (this.props.onChangeQuery) {
        this.props.onChangeQuery(value);
      }
    } else {
      this.setState({query: value});
    }
  }

  private onFilterActionClick(): void {
    if (this.props.onFilterAction) {
      this.props.onFilterAction();
    }
  }

  private onClearActionClick(): void {
    if (this.isPersistent) {
      if (this.props.onClearAction) {
        this.props.onClearAction();
      }
    } else {
      this.setState({query: ''});
    }
  }

  private doSearch(value?: string): void {
    if (this.props.onSearch) {
      this.props.onSearch(value);
    }
  }

  private get definitePropsActivated(): boolean {
    return isUndef(this.props.activated) ? false : this.props.activated;
  }

  private get definitePropsQuery(): string {
    return isUndef(this.props.query) ? '' : this.props.query;
  }

  private get actions(): IBasicTextFieldAction[] {
    const defaultFieldActions: IApplicationFilterAction[] = this.props.noQuery
        ? []
        : [{type: FilterActionEnum.CLEAR_FILTER}];
    return defaultFieldActions
        .concat(this.props.fieldActions)
        .map((action) => ({
          ...this.defaultActions[action.type],
          className: action.className,
        }));
  }
}
