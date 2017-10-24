import * as React from 'react';

import { toClassName } from '../../../util';
import { FIRST_PAGE } from '../../../definition.interface';
import { BaseComponent } from '../../../component/base';
import { IPageToolbarInternalProps } from './page-toolbar.interface';

export class PageToolbar extends BaseComponent<PageToolbar, IPageToolbarInternalProps, {}> {

  constructor(props: IPageToolbarInternalProps) {
    super(props);
    this.onPrevious = this.onPrevious.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onFirst = this.onFirst.bind(this);
    this.onLast = this.onLast.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    const isPreviousBtnDisabled = this.isPreviousBtnDisabled;
    const isNextBtnDisabled = this.isNextBtnDisabled;

    const buttonsTpl = isPreviousBtnDisabled && isNextBtnDisabled ? null : (
        <section>
          <button className='material-icons mdc-toolbar__icon'
                  onClick={this.onFirst}
                  disabled={isPreviousBtnDisabled}>
            first_page
          </button>
          <button className='material-icons mdc-toolbar__icon'
                  onClick={this.onPrevious}
                  disabled={isPreviousBtnDisabled}>
            keyboard_arrow_left
          </button>
          <button className='material-icons mdc-toolbar__icon'
                  onClick={this.onNext}
                  disabled={isNextBtnDisabled}>
            keyboard_arrow_right
          </button>
          <button className='material-icons mdc-toolbar__icon'
                  onClick={this.onLast}
                  disabled={isNextBtnDisabled}>
            last_page
          </button>
        </section>
    );

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
              {buttonsTpl}
            </div>
        );

    return (
        <div className={toClassName('mdc-toolbar', 'app-toolbar', props.className)}>
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

  private get isPreviousBtnDisabled(): boolean {
    return this.props.page === FIRST_PAGE;
  }

  private get isNextBtnDisabled(): boolean {
    return this.toNumber === this.props.totalCount;
  }

  private onPrevious(): void {
    if (this.props.onPrevious) {
      this.props.onPrevious();
    }
  }

  private onNext(): void {
    if (this.props.onNext) {
      this.props.onNext();
    }
  }

  private onFirst(): void {
    if (this.props.onFirst) {
      this.props.onFirst();
    }
  }

  private onLast(): void {
    if (this.props.onLast) {
      this.props.onLast();
    }
  }
}
