import * as React from 'react';

import { orNull, orDefault, pageFromNumber, pageToNumber } from '../../../util';
import { FIRST_PAGE } from '../../../definitions.interface';
import { IUniversalPageToolbarProps } from './page-toolbar.interface';
import { UniversalComponent } from '../../base/universal.component';

export abstract class UniversalPageToolbar<TToolbar extends UniversalPageToolbar<TToolbar, TProps, TState>,
                                           TProps extends IUniversalPageToolbarProps,
                                           TState = {}>
  extends UniversalComponent<TToolbar, TProps, TState> {

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
    return orDefault<JSX.Element, JSX.Element>(
      props.totalCount > 0 && !props.progress,
      () => this.getContent(),
      () => this.getDefaultContent()
    );
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
   * @stable [16.05.2018]
   * @returns {string}
   */
  protected get pagesInfoLabel(): string {
    return `${this.fromNumber}-${this.toNumber} ${this.t('of')} ${this.props.totalCount}`;
  }

  /**
   * @stable [16.05.2018]
   * @returns {JSX.Element}
   */
  protected abstract getDefaultContent(): JSX.Element;

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
