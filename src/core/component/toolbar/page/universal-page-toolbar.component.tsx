import * as React from 'react';

import { FIRST_PAGE } from '../../../definitions.interface';
import { IUniversalPageToolbarProps } from './page-toolbar.interface';
import { orNull, pageFromNumber, pageToNumber, pagesCount } from '../../../util';
import { UniversalComponent } from '../../base/universal.component';

export abstract class UniversalPageToolbar<TProps extends IUniversalPageToolbarProps,
                                           TState = {}>
  extends UniversalComponent<TProps, TState> {

  /**
   * @stable [16.05.2018]
   * @returns {JSX.Element}
   */
  protected checkAndGetControls(): JSX.Element {
    return orNull<JSX.Element>(
      !(this.isPreviousBtnDisabled && this.isNextBtnDisabled),
      this.getControls()
    );
  }

  /**
   * @stable [16.05.2018]
   * @returns {JSX.Element}
   */
  protected getToolbarBody(): JSX.Element {
    const props = this.props;
    return props.totalCount > 0 && !props.progress
      ? this.getContent()
      : this.getDefaultContent();
  }

  /**
   * @stable [21.09.2018]
   * @returns {boolean}
   */
  protected isToolbarVisible(): boolean {
    const props = this.props;
    return props.totalCount > props.pageSize;
  }

  /**
   * @stable [16.05.2018]
   * @returns {boolean}
   */
  protected get isPreviousBtnDisabled(): boolean {
    return this.props.page === FIRST_PAGE;
  }

  /**
   * @stable [16.05.2018]
   * @returns {boolean}
   */
  protected get isNextBtnDisabled(): boolean {
    return this.toNumber === this.props.totalCount;
  }

  /**
   * @stable [16.05.2018]
   * @returns {number}
   */
  protected get toNumber(): number {
    return pageToNumber(this.props);
  }

  /**
   * @stable [16.05.2018]
   * @returns {number}
   */
  protected get fromNumber(): number {
    return pageFromNumber(this.props);
  }

  /**
   * @stable [23.06.2018]
   * @returns {string}
   */
  protected get pagesLabel(): string {
    const {useSimplePagesFormat, page} = this.props;
    const messages = this.settings.messages;
    return useSimplePagesFormat
      ? messages.simplePagesMessage
        .replace('{page}', `${page}`)
        .replace('{count}', `${pagesCount(this.props)}`)
      : messages.pagesMessage
        .replace('{from}', `${this.fromNumber}`)
        .replace('{to}', `${this.toNumber}`)
        .replace('{count}', `${this.props.totalCount}`);
  }

  /**
   * @stable [16.05.2018]
   * @returns {JSX.Element}
   */
  protected getDefaultContent(): JSX.Element {
    return null;
  }

  /**
   * @stable [16.05.2018]
   * @returns {JSX.Element}
   */
  protected abstract getContent(): JSX.Element;

  /**
   * @stable [16.05.2018]
   * @returns {JSX.Element}
   */
  protected abstract getControls(): JSX.Element;
}
