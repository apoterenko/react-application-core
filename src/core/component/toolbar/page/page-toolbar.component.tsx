import * as React from 'react';

import { FIRST_PAGE } from '../../../definition.interface';
import { BaseComponent } from '../../../component/base';
import { IPageToolbarInternalProps } from './page-toolbar.interface';

export class PageToolbar extends BaseComponent<PageToolbar, IPageToolbarInternalProps, {}> {

  constructor(props: IPageToolbarInternalProps) {
    super(props);
    this.onLeft = this.onLeft.bind(this);
    this.onRight = this.onRight.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    const className = ['mdc-toolbar', 'app-toolbar', props.className];
    const contentTpl = props.contentDisplay === false
        ? (
            <div className='mdc-toolbar__row'/>
        )
        : (
            <div className='mdc-toolbar__row'>
              <section className='app-toolbar-west-column'>
                {props.children}
              </section>
              <section>
                <div className='app-toolbar-page-info'>
                  {this.fromNumber}-{this.toNumber} {this.t('of')} {props.totalCount}
                </div>
              </section>
              <section>
                <button className='material-icons mdc-toolbar__icon'
                        onClick={this.onLeft}
                        disabled={this.isLeftBtnDisabled}>
                  keyboard_arrow_left
                </button>
                <button className='material-icons mdc-toolbar__icon'
                        onClick={this.onRight}
                        disabled={this.isRightBtnDisabled}>
                  keyboard_arrow_right
                </button>
              </section>
            </div>
        );

    return (
        <div className={className.filter((cls) => !!cls).join(' ')}>
          {contentTpl}
        </div>
    );
  }

  private get fromNumber(): number {
    return 1 + (this.props.page - FIRST_PAGE) * this.props.pageSize;
  }

  private get toNumber(): number {
    return Math.min(this.props.page * this.props.pageSize, this.props.totalCount);
  }

  private get isLeftBtnDisabled(): boolean {
    return this.props.page === FIRST_PAGE;
  }

  private get isRightBtnDisabled(): boolean {
    return this.toNumber === this.props.totalCount;
  }

  private onLeft(): void {
    if (this.props.onBackward) {
      this.props.onBackward();
    }
  }

  private onRight(): void {
    if (this.props.onForward) {
      this.props.onForward();
    }
  }
}
