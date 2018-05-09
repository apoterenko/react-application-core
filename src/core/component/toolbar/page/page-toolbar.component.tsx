import * as React from 'react';

import { orNull, toClassName, pageFromNumber, pageToNumber } from '../../../util';
import { FIRST_PAGE } from '../../../definitions.interface';
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
        <div className={toClassName(
                          this.uiFactory.toolbar,
                          'rac-toolbar',
                          'rac-page-toolbar',
                          props.className
                       )}>
          {
            props.contentDisplay === false
                ? <div className={this.uiFactory.toolbarRow}/>
                : (
                    <div className={this.uiFactory.toolbarRow}>
                      <section className='rac-flex-full'>
                        {props.children}
                      </section>
                      <section className='rac-toolbar-page-info'>
                        {this.fromNumber}-{this.toNumber} {this.t('of')} {props.totalCount}
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

  /**
   * @stable [09.05.2018]
   * @returns {number}
   */
  private get fromNumber(): number {
    return pageFromNumber(this.props);
  }

  /**
   * @stable [09.05.2018]
   * @returns {number}
   */
  private get toNumber(): number {
    return pageToNumber(this.props);
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
