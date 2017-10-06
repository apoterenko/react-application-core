import * as React from 'react';

import { BaseContainer } from '../../../component/base';
import { PageToolbar } from './page-toolbar.component';
import {
  IPageToolbarContainerInternalProps,
  PAGER_FORWARD_ACTION_TYPE,
  PAGER_BACKWARD_ACTION_TYPE,
} from './page-toolbar.interface';

export class PageToolbarContainer extends BaseContainer<IPageToolbarContainerInternalProps, {}> {

  constructor(props: IPageToolbarContainerInternalProps) {
    super(props);
    this.onBackward = this.onBackward.bind(this);
    this.onForward = this.onForward.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    return (
        <PageToolbar onForward={this.onForward}
                     onBackward={this.onBackward}
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

  private onForward(): void {
    this.dispatch(PAGER_FORWARD_ACTION_TYPE);
  }

  private onBackward(): void {
    this.dispatch(PAGER_BACKWARD_ACTION_TYPE);
  }
}
