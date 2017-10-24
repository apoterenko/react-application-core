import * as React from 'react';

import { BaseContainer } from '../../../component/base';
import { PageToolbar } from './page-toolbar.component';
import {
  IPageToolbarContainerInternalProps,
  PAGER_NEXT_ACTION_TYPE,
  PAGER_PREVIOUS_ACTION_TYPE,
  PAGER_LAST_ACTION_TYPE,
  PAGER_FIRST_ACTION_TYPE,
} from './page-toolbar.interface';

export class PageToolbarContainer extends BaseContainer<IPageToolbarContainerInternalProps, {}> {

  constructor(props: IPageToolbarContainerInternalProps) {
    super(props);
    this.onPrevious = this.onPrevious.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onFirst = this.onFirst.bind(this);
    this.onLast = this.onLast.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    return (
        <PageToolbar {...props.list}
                     onNext={this.onNext}
                     onPrevious={this.onPrevious}
                     onLast={this.onLast}
                     onFirst={this.onFirst}
                     contentDisplay={this.isContentVisible}>
          {props.children}
        </PageToolbar>
    );
  }

  private get isContentVisible(): boolean {
    const props = this.props;

    // Here the list may not be defined
    return !!(
        props.list &&
        props.list.data &&
        props.list.data.length > 0 &&
        !props.list.progress
    );
  }

  private onNext(): void {
    this.dispatch(PAGER_NEXT_ACTION_TYPE);
  }

  private onPrevious(): void {
    this.dispatch(PAGER_PREVIOUS_ACTION_TYPE);
  }

  private onLast(): void {
    this.dispatch(PAGER_LAST_ACTION_TYPE);
  }

  private onFirst(): void {
    this.dispatch(PAGER_FIRST_ACTION_TYPE);
  }
}
