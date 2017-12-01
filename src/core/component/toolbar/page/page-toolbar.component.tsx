import * as React from 'react';

import { orNull, toClassName } from '../../../util';
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

    return (
        <div className={toClassName('mdc-toolbar', 'app-toolbar', props.className)}>
          {
            props.contentDisplay === false
                ? <div className='mdc-toolbar__row'/>
                : (
                    <div className='mdc-toolbar__row'>
                      <section className='app-full-layout'>
                        {props.children}
                      </section>
                      <section>
                        <div className='app-toolbar-page-info'>
                          {this.fromNumber}-{this.toNumber} {this.t('of')} {props.totalCount}
                        </div>
                      </section>
                      {
                        orNull(
                            !(isPreviousBtnDisabled && isNextBtnDisabled),
                            <section>
                              {
                                this.uiFactory.makeIcon({
                                  type: 'first_page',
                                  disabled: isPreviousBtnDisabled,
                                  onClick: this.onFirst,
                                })
                              }
                              {
                                this.uiFactory.makeIcon({
                                  type: 'keyboard_arrow_left',
                                  disabled: isPreviousBtnDisabled,
                                  onClick: this.onPrevious,
                                })
                              }
                              {
                                this.uiFactory.makeIcon({
                                  type: 'keyboard_arrow_right',
                                  disabled: isNextBtnDisabled,
                                  onClick: this.onNext,
                                })
                              }
                              {
                                this.uiFactory.makeIcon({
                                  type: 'last_page',
                                  disabled: isNextBtnDisabled,
                                  onClick: this.onLast,
                                })
                              }
                            </section>
                        )
                      }
                    </div>
                )
          }
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
