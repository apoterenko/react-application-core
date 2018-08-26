import * as React from 'react';

import { orNull, toClassName } from '../../../util';
import {
  IFieldActionConfiguration,
  IFilterActionConfiguration,
  FilterActionEnum,
} from '../../../configurations-definitions.interface';
import { IUniversalComponent, IUniversalField } from '../../../entities-definitions.interface';
import { IUniversalFieldProps } from '../../../props-definitions.interface';
import { IUniversalSearchToolbarProps } from './search-toolbar.interface';
import { DelayedChangesFieldPlugin } from '../../field/field/plugin/delayed-changes-field.plugin';
import { UniversalComponent } from '../../base/universal.component';

export abstract class UniversalSearchToolbar<TComponent extends IUniversalComponent<TProps, TState>,
                                             TProps extends IUniversalSearchToolbarProps,
                                             TState = {}>
  extends UniversalComponent<TComponent, TProps> {

  /**
   * @stable [18.05.2018]
   */
  public static readonly defaultProps: IUniversalSearchToolbarProps = {
    actions: [],
    icon: 'search',
    fieldConfiguration: {
      placeholder: 'Search',
    },
  };

  /**
   * @stable [18.05.2018]
   */
  protected readonly commonActionsProps: {[filter: number]: IFieldActionConfiguration} = {
    [FilterActionEnum.OPEN_FILTER]: {
      type: 'filter_list',
      onClick: this.onOpen.bind(this),
    },
    [FilterActionEnum.CLEAR_FILTER]: {
      type: 'clear',
      onClick: this.onDeactivate.bind(this),
    },
    [FilterActionEnum.REFRESH_DATA]: {
      type: 'refresh',
      onClick: this.onRefresh.bind(this),
    },
  };

  /**
   * @stable [18.05.2018]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.onActivate = this.onActivate.bind(this);
    this.onApply = this.onApply.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * @stable [18.05.2018]
   * @returns {boolean}
   */
  protected get isActive(): boolean {
    return this.props.active;
  }

  /**
   * @stable [18.05.2018]
   * @returns {string}
   */
  protected get query(): string {
    return this.props.query;
  }

  /**
   * @stable [18.05.2018]
   */
  protected onActivate(): void {
    const props = this.props;
    if (props.notUseField) {

      // Invoke a search
      this.onApply();
    } else {
      if (props.onActivate) {

        // Open a search field
        props.onActivate();
      }
    }
  }

  /**
   * @stable [18.05.2018]
   */
  protected onDeactivate(): void {
    const props = this.props;
    if (props.onDeactivate) {
      // Close a search field
      props.onDeactivate();
    }
  }

  /**
   * @stable [18.05.2018]
   * @param {string} query
   */
  protected onChange(query?: string): void {
    const props = this.props;
    if (props.onChange) {
      props.onChange(query);
    }
  }

  /**
   * @stable [18.05.2018]
   * @returns {IUniversalFieldProps}
   */
  protected get fieldProps(): IUniversalFieldProps {
    const props = this.props;
    return {
      ref: 'queryField',
      autoFocus: true,
      notUseErrorMessage: true,
      value: this.query,
      actions: this.actions,
      onChange: this.onChange,
      onDelay: this.onApply,
      plugins: DelayedChangesFieldPlugin,
      ...props.fieldConfiguration as {},
    };
  }

  /**
   * @stable [18.05.2018]
   * @returns {IFieldActionConfiguration[]}
   */
  protected get actions(): IFieldActionConfiguration[] {
    const props = this.props;
    const defaultActions: IFilterActionConfiguration[] = props.notUseField
      ? []
      : [{type: FilterActionEnum.CLEAR_FILTER}];

    return defaultActions
      .concat(props.actions)
      .map((action) => ({
        ...this.commonActionsProps[action.type],
        disabled: props.actionsDisabled,
        className: action.className,
      }));
  }

  /**
   * @stable [18.05.2018]
   * @returns {JSX.Element[]}
   */
  protected get actionsElements(): JSX.Element[] {
    let actions;
    const props = this.props;
    return []
      .concat(
        this.isActive
          ? []
          : this.uiFactory.makeIcon({
              type: props.icon,
              onClick: this.onActivate,
              disabled: props.actionsDisabled,
              className: 'rac-search-toolbar-action',
          })
      ).concat(
        props.notUseField && (actions = this.actions).length > 0
          ? actions.map((action) => this.uiFactory.makeIcon({
            ...action,
            disabled: props.actionsDisabled,
            className: toClassName(action.className, 'rac-search-toolbar-action'),
          }))
          : []
      );
  }

  /**
   * @stable [18.05.2018]
   * @returns {JSX.Element}
   */
  protected get fieldSection(): JSX.Element {
    return orNull<JSX.Element>(this.isActive, () => this.fieldWrapper);
  }

  /**
   * @stable [18.05.2018]
   * @returns {JSX.Element}
   */
  protected get actionsElementsSection(): JSX.Element {
    return orNull<JSX.Element>(this.actionsElements.length > 0, () => this.actionsElementsWrapper);
  }

  /**
   * @stable [18.05.2018]
   * @returns {JSX.Element}
   */
  protected abstract get fieldWrapper(): JSX.Element;

  /**
   * @stable [18.05.2018]
   * @returns {JSX.Element}
   */
  protected abstract get actionsElementsWrapper(): JSX.Element;

  /**
   * @stable [18.05.2018]
   * @returns {IUniversalField}
   */
  private get queryField(): IUniversalField {
    return this.refs.queryField as IUniversalField;
  }

  /**
   * @stable [18.05.2018]
   */
  private onOpen(): void {
    const props = this.props;
    if (props.onOpen) {
      props.onOpen();
    }
  }

  /**
   * @stable [18.05.2018]
   */
  private onApply(): void {
    const props = this.props;
    if (props.onApply) {
      props.onApply();
    }
  }

  /**
   * @stable [26.08.2018]
   */
  private onRefresh(): void {
    const props = this.props;
    if (props.onRefresh) {
      props.onRefresh();
    }
  }
}
