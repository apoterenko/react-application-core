import * as React from 'react';

import { UniversalContainer } from '../../base/universal.container';
import {
  FILTER_ACTIVATE_ACTION_TYPE,
  FILTER_CHANGE_ACTION_TYPE,
  FILTER_APPLY_ACTION_TYPE,
  FILTER_OPEN_ACTION_TYPE,
} from '../../filter/filter.interface';
import {
  IUniversalSearchToolbarContainerProps,
  IUniversalSearchToolbarProps,
} from './search-toolbar.interface';

export class UniversalSearchToolbarContainer<TProps extends IUniversalSearchToolbarContainerProps, TState = {}>
  extends UniversalContainer<TProps, TState> {

  /**
   * @stable [18.05.2018]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.onApply = this.onApply.bind(this);
    this.onActivate = this.onActivate.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * @stable [18.05.2018]
   * @returns {IUniversalSearchToolbarProps}
   */
  protected getComponentProps(): IUniversalSearchToolbarProps {
    const props = this.props;
    return {
      onApply: this.onApply,
      onActivate: this.onActivate,
      onChange: this.onChange,
      onOpen: this.onOpen,
      ...props.filter as {},
      ...props.filterConfiguration as {},
    };
  }

  /**
   * @stable [18.05.2018]
   * @param {string} value
   */
  protected onApply(value?: string): void {
    this.dispatch(FILTER_APPLY_ACTION_TYPE, { value });
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
   * @param {string} query
   */
  protected onChange(query: string): void {
    this.dispatch(FILTER_CHANGE_ACTION_TYPE, { query });
  }
}
