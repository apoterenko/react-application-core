import * as React from 'react';

import { BaseContainer } from '../../../component/base';
import { PageToolbar } from './page-toolbar.component';
import {
  IPageToolbarContainerProps,
  PAGER_NEXT_ACTION_TYPE,
  PAGER_PREVIOUS_ACTION_TYPE,
  PAGER_LAST_ACTION_TYPE,
  PAGER_FIRST_ACTION_TYPE,
} from './page-toolbar.interface';

export class PageToolbarContainer extends BaseContainer<IPageToolbarContainerProps> {

  /**
   * @stable [16.05.2018]
   * @param {IPageToolbarContainerProps} props
   */
  constructor(props: IPageToolbarContainerProps) {
    super(props);
    this.onPrevious = this.onPrevious.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onFirst = this.onFirst.bind(this);
    this.onLast = this.onLast.bind(this);
  }

  /**
   * @stable [16.05.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
        <PageToolbar {...props.list}
                     {...props.toolbarProps}
                     onNext={this.onNext}
                     onPrevious={this.onPrevious}
                     onLast={this.onLast}
                     onFirst={this.onFirst}>
          {props.children}
        </PageToolbar>
    );
  }

  /**
   * @stable [16.05.2018]
   */
  private onNext(): void {
    this.dispatch(PAGER_NEXT_ACTION_TYPE);
  }

  /**
   * @stable [16.05.2018]
   */
  private onPrevious(): void {
    this.dispatch(PAGER_PREVIOUS_ACTION_TYPE);
  }

  /**
   * @stable [16.05.2018]
   */
  private onLast(): void {
    this.dispatch(PAGER_LAST_ACTION_TYPE);
  }

  /**
   * @stable [16.05.2018]
   */
  private onFirst(): void {
    this.dispatch(PAGER_FIRST_ACTION_TYPE);
  }
}
