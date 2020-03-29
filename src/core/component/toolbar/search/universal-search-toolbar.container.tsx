import * as React from 'react';

import { UniversalContainer } from '../../base/universal.container';
import {
  FILTER_ACTIVATE_ACTION_TYPE,
  FILTER_CHANGE_ACTION_TYPE,
  FILTER_APPLY_ACTION_TYPE,
  FILTER_DEACTIVATE_ACTION_TYPE,
  FILTER_OPEN_ACTION_TYPE,
  FILTER_REFRESH_ACTION_TYPE,
} from '../../filter/filter.interface';
import {
  IUniversalSearchToolbarContainerProps,
  IUniversalSearchToolbarProps,
} from './search-toolbar.interface';
import { TOOLBAR_CUSTOM_ACTION_ACTION_TYPE } from '../toolbar.interface';
import { IPayloadWrapper } from '../../../definitions.interface';
import { ToolbarToolsEnum } from '../../../definition';

export class UniversalSearchToolbarContainer<TProps extends IUniversalSearchToolbarContainerProps, TState = {}>
  extends UniversalContainer<TProps, TState> {

  /**
   * @stable [18.05.2018]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.onApply = this.onApply.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onActivate = this.onActivate.bind(this);
    this.onDeactivate = this.onDeactivate.bind(this);
    this.onActionClick = this.onActionClick.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * @stable [18.05.2018]
   * @returns {IUniversalSearchToolbarProps}
   */
  protected getComponentProps<TComponentProps extends IUniversalSearchToolbarProps>(): TComponentProps {
    const props = this.props;
    return {
      onApply: this.onApply,
      onRefresh: this.onRefresh,
      onActionClick: this.onActionClick,
      onActivate: this.onActivate,
      onDeactivate: this.onDeactivate,
      onChange: this.onChange,
      onOpen: this.onOpen,
      ...props.filter as {},
      ...props.filterConfiguration as {},
    } as TComponentProps;
  }

  /**
   * @stable [18.05.2018]
   */
  protected onApply(): void {
    this.dispatch(FILTER_APPLY_ACTION_TYPE);
  }

  /**
   * @stable [18.05.2018]
   */
  protected onOpen(): void {
    this.dispatch(FILTER_OPEN_ACTION_TYPE);
  }

  /**
   * @stable [18.05.2018]
   */
  protected onActivate(): void {
    this.dispatch(FILTER_ACTIVATE_ACTION_TYPE);
  }

  /**
   * @stable [18.05.2018]
   */
  protected onDeactivate(): void {
    this.dispatch(FILTER_DEACTIVATE_ACTION_TYPE);
  }

  /**
   * @stable [18.05.2018]
   * @param {string} query
   */
  protected onChange(query: string): void {
    this.dispatch(FILTER_CHANGE_ACTION_TYPE, { query });
  }

  /**
   * @stable [26.08.2018]
   */
  protected onRefresh(): void {
    this.dispatchFrameworkAction(FILTER_REFRESH_ACTION_TYPE);
  }

  /**
   * @stable [13.09.2018]
   */
  private onActionClick(action: ToolbarToolsEnum): void {
    const payloadWrapper: IPayloadWrapper<ToolbarToolsEnum> = {payload: action};
    this.dispatchFrameworkAction(TOOLBAR_CUSTOM_ACTION_ACTION_TYPE, payloadWrapper);
  }
}
