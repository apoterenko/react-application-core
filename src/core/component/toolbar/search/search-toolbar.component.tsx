import * as React from 'react';

import { toClassName, orNull } from '../../../util';
import { BaseComponent } from '../../base';
import {
  DelayedChangesFieldPlugin,
  IField,
  TextField,
} from '../../field';
import { ToolbarSection } from '../../toolbar';
import { ISearchToolbarProps } from './search-toolbar.interface';
import { IFieldActionConfiguration, FilterActionEnum, IFilterActionConfiguration } from '../../../configurations-definitions.interface';

export class SearchToolbar extends BaseComponent<SearchToolbar, ISearchToolbarProps> {

  public static defaultProps: ISearchToolbarProps = {
    actions: [],
    icon: 'search',
    fieldConfiguration: {
      placeholder: 'Search',
    },
  };

  private defaultActions: {[filter: number]: IFieldActionConfiguration} = {
    [FilterActionEnum.OPEN_FILTER]: {
      type: 'filter_list',
      onClick: this.onOpen.bind(this),
    },
    [FilterActionEnum.CLEAR_FILTER]: {
      type: 'clear',
      onClick: this.onClear.bind(this),
    },
  };

  constructor(props: ISearchToolbarProps) {
    super(props);

    this.onActivate = this.onActivate.bind(this);
    this.onApply = this.onApply.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {} as ISearchToolbarProps;
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
                                   {...props.fieldConfiguration}>
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
    if (props.notUseField) {
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
    const qField = this.refs.queryField as IField;
    if (qField) {
      qField.setFocus();
    }
    if (!this.query) {
      return;
    }

    this.onChange('');
    this.onApply();
  }

  private onApply(): void {
    if (this.props.onApply) {
      this.props.onApply();
    }
  }

  private get actions(): IFieldActionConfiguration[] {
    const props = this.props;
    const defaultFieldActions: IFilterActionConfiguration[] = props.notUseField
        ? []
        : [{type: FilterActionEnum.CLEAR_FILTER}];
    return defaultFieldActions
        .concat(props.actions)
        .map((action) => ({
          ...this.defaultActions[action.type],
          disabled: props.actionsDisabled,
          className: action.className,
        }));
  }

  private get actionsElements(): JSX.Element[] {
    const props = this.props;
    const serviceActions = [];

    if (!this.isActive) {
      serviceActions.push(
          this.uiFactory.makeIcon({
            type: props.icon,
            disabled: props.actionsDisabled,
            onClick: this.onActivate,
          })
      );
    }
    if (props.notUseField) {
      const actions = this.actions;
      if (actions.length > 0) {
        return serviceActions.concat(
            this.actions.map((action) => this.uiFactory.makeIcon({
              ...action,
              disabled: props.actionsDisabled,
            }))
        );
      }
    }
    return serviceActions;
  }
}
