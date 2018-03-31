import * as React from 'react';

import { isUndef, toClassName, orNull } from '../../../util';
import { BaseComponent } from '../../base';
import {
  DelayedChangesFieldPlugin,
  IBasicTextFieldAction,
  FieldT,
  TextField,
} from '../../field';
import { FilterActionEnum, IFilterActionEntity } from '../../filter';
import { ToolbarSection } from '../../toolbar';
import { ISearchToolbarInternalProps } from './search-toolbar.interface';

export class SearchToolbar extends BaseComponent<SearchToolbar,
                                                 ISearchToolbarInternalProps,
                                                 {}> {

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

    this.state = {} as ISearchToolbarInternalProps;
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
                                   inputWrapperClassName={this.uiFactory.textFieldBox}
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
    return this.props.active;
  }

  private get query(): string {
    return this.props.query;
  }

  private onActivate(): void {
    const props = this.props;
    if (props.noSearchField) {
      this.onApply();
    } else {
      if (props.onActivate) {
        props.onActivate();
      }
    }
  }

  private onChange(query: string): void {
    const props = this.props;

    if (props.onChange) {
      props.onChange(query);
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

    this.onChange('');
    this.onApply();
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
    const defaultFieldActions: IFilterActionEntity[] = props.noSearchField
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
              className: action.className,
              onClick: action.actionHandler,
            }))
        );
      }
    }
    return serviceActions;
  }
}
