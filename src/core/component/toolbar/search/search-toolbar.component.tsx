import * as React from 'react';

import { isUndef, toClassName, orNull } from '../../../util';
import { AnyT } from '../../../definition.interface';
import { BaseComponent } from '../../../component/base';
import {
  DelayedChangesFieldPlugin,
  IBasicTextFieldAction,
  FieldT,
  TextField,
} from '../../../component/field';
import { FilterActionEnum, IApplicationFilterAction } from '../../../component/filter';
import { ToolbarSection } from '../../../component/toolbar';
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

  private defaultActions: {[filter: number]: IBasicTextFieldAction} = {
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
    const actionsElements = this.actionsElements;

    return (
        <div className={toClassName(
                          this.uiFactory.toolbar,
                          'rac-toolbar',
                          'rac-search-toolbar',
                          props.className
                        )}>
          <div className={this.uiFactory.toolbarRow}>
            {
              orNull(
                  actionsElements.length > 0,
                  () => (
                      <ToolbarSection className={this.uiFactory.toolbarSectionAlignEnd}>
                        {actionsElements}
                      </ToolbarSection>
                  )
              )
            }
            {
              orNull(
                  this.isActive,
                  () => (
                      <ToolbarSection>
                        <TextField ref='queryField'
                                   className={this.uiFactory.textFieldBox}
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
                      </ToolbarSection>
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
    const props = this.props;
    const defaultFieldActions: IApplicationFilterAction[] = props.noSearchField
        ? []
        : [{type: FilterActionEnum.CLEAR_FILTER}];
    return defaultFieldActions
        .concat(props.fieldActions)
        .map((action) => ({
          ...this.defaultActions[action.type],
          disabled: props.disabledActions,
          className: action.className,
        }));
  }

  private get actionsElements(): JSX.Element[] {
    const props = this.props;
    const serviceActions = [];

    if (!this.isActive) {
      serviceActions.push(
          this.uiFactory.makeIcon({
            type: props.searchIcon,
            className: this.uiFactory.toolbarIcon,
            disabled: props.disabledActions,
            onClick: this.onActivate,
          })
      );
    }
    if (props.noSearchField) {
      const actions = this.actions;
      if (actions.length > 0) {
        return serviceActions.concat(
            this.actions.map((action) => this.uiFactory.makeIcon({
              type: action.type,
              disabled: props.disabledActions,
              className: toClassName(this.uiFactory.toolbarIcon, action.className),
              onClick: action.actionHandler,
            }))
        );
      }
    }
    return serviceActions;
  }
}
