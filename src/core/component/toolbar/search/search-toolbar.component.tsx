import * as React from 'react';

import { isUndef, toClassName, orNull, orDefault } from '../../../util';
import { AnyT } from '../../../definition.interface';
import { BaseComponent } from '../../../component/base';
import {
  DelayedChangesFieldPlugin,
  IBasicTextFieldAction,
  FieldT,
  TextField,
} from '../../../component/field';
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
    searchFieldOptions: {
      placeholder: 'Search',
    },
  };

  private defaultActions = {
    [FilterActionEnum.OPEN_FILTER]: {
      type: 'filter_list',
      actionHandler: this.onOpen.bind(this),
    },
    [FilterActionEnum.CLEAR_FILTER]: {
      type: 'clear',
      actionHandler: this.onClear.bind(this),
    },
  };

  constructor(props: ISearchToolbarInternalProps) {
    super(props);

    this.onActivate = this.onActivate.bind(this);
    this.onApply = this.onApply.bind(this);
    this.onChange = this.onChange.bind(this);

    if (this.isPersistent) {
      this.state = {} as ISearchToolbarInternalProps;
    } else {
      this.state = {
        active: this.definiteActiveProps,
        query: this.definiteQueryProps,
      };
    }
  }

  public componentWillReceiveProps(nextProps: Readonly<ISearchToolbarInternalProps>, nextContext: AnyT): void {
    super.componentWillReceiveProps(nextProps, nextContext);

    if (!this.isPersistent) {
      if (!isUndef(nextProps.active)) {
        this.setState({ active: nextProps.active });
      }
      if (!isUndef(nextProps.query)) {
        this.setState({ query: nextProps.query });
      }
    }
  }

  public render(): JSX.Element {
    const props = this.props;

    return (
        <div className={toClassName('mdc-toolbar', 'app-toolbar', props.className)}>
          <div className='mdc-toolbar__row'>
            <section>
              {
                this.uiFactory.makeIcon({
                  type: props.searchIcon,
                  className: 'mdc-toolbar__icon',
                  onClick: this.onActivate,
                })
              }
            </section>
            {
              orDefault(
                  props.noSearchField && props.fieldActions.length > 0,
                  <section>
                    {
                      this.actions.map((action) => (
                          this.uiFactory.makeIcon({
                            type: action.type,
                            className: toClassName('mdc-toolbar__icon', action.className),
                            onClick: action.actionHandler,
                          })
                      ))
                    }
                  </section>,
                  orNull(
                      this.isActive,
                      <section className='mdc-toolbar__section visible'>
                        <TextField ref='queryField'
                                   className='mdc-text-field--box'
                                   persistent={false}
                                   autoFocus={true}
                                   noErrorMessage={true}
                                   value={this.query}
                                   actions={this.actions}
                                   plugins={DelayedChangesFieldPlugin}
                                   onDelay={this.onApply}
                                   onChange={this.onChange}
                                   {...props.searchFieldOptions}>
                        </TextField>
                      </section>
                  )
              )
            }
          </div>
        </div>
    );
  }

  private get isActive(): boolean {
    return this.isPersistent ? this.props.active : this.state.active;
  }

  private get query(): boolean {
    return this.isPersistent ? this.props.query : this.state.query;
  }

  private onActivate(): void {
    const props = this.props;
    if (props.noSearchField) {
      this.onApply();
    } else {
      if (this.isPersistent) {
        if (props.onActivate) {
          props.onActivate();
        }
      } else {
        this.setState({ active: true });
      }
    }
  }

  private onChange(query: string): void {
    const props = this.props;

    if (this.isPersistent) {
      if (props.onChange) {
        props.onChange(query);
      }
    } else {
      this.setState({query});
    }
  }

  private onOpen(): void {
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }

  private onClear(): void {
    const qField = this.refs.queryField as FieldT;
    if (qField) {
      qField.setFocus();
    }
    if (!this.query) {
      return;
    }

    if (this.isPersistent) {
      this.onChange('');
      this.onApply();
    } else {
      this.setState({ query: '' });
    }
  }

  private onApply(value?: string): void {
    if (this.props.onApply) {
      this.props.onApply(value);
    }
  }

  private get definiteActiveProps(): boolean {
    return isUndef(this.props.active) ? false : this.props.active;
  }

  private get definiteQueryProps(): string {
    return isUndef(this.props.query) ? '' : this.props.query;
  }

  private get actions(): IBasicTextFieldAction[] {
    const defaultFieldActions: IApplicationFilterAction[] = this.props.noSearchField
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
