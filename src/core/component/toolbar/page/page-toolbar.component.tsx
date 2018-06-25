import * as React from 'react';
import * as R from 'ramda';

import { orNull, toClassName } from '../../../util';
import { IPageToolbarProps } from './page-toolbar.interface';
import { UniversalPageToolbar } from './universal-page-toolbar.component';

export class PageToolbar extends UniversalPageToolbar<PageToolbar, IPageToolbarProps> {

  /**
   * @stable [16.05.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
        <div className={toClassName(this.uiFactory.toolbar, 'rac-toolbar', 'rac-page-toolbar', props.className)}>
          {this.getToolbarBody()}
        </div>
    );
  }

  /**
   * @stable [16.05.2018]
   * @returns {JSX.Element}
   */
  protected getDefaultContent(): JSX.Element {
    return null;
  }

  /**
   * @stable [25.06.2018]
   * @returns {JSX.Element}
   */
  protected getContent(): JSX.Element {
    const controls = this.checkAndGetControls();

    return orNull<JSX.Element>(
      !(R.isNil(this.props.children) && R.isNil(controls)),
      () => (
        <div className={toClassName(this.uiFactory.toolbarRow, 'rac-page-toolbar-content')}>
          {this.getLeftContent()}
          {controls}
          {this.getRightContent()}
        </div>
      )
    );
  }

  /**
   * @stable [25.06.2018]
   * @returns {JSX.Element}
   */
  protected getRightContent(): JSX.Element {
    return (
      <div className='rac-flex-full'/>
    );
  }

  /**
   * @stable [16.05.2018]
   * @returns {JSX.Element}
   */
  protected getLeftContent(): JSX.Element {
    return (
      <div className='rac-flex-full'>
        {this.props.children}
      </div>
    );
  }

  /**
   * @stable [25.06.2018]
   * @returns {JSX.Element}
   */
  protected getPagesElement(): JSX.Element {
    return (
      <span className='rac-toolbar-pages-info'>
        {this.pagesInfoLabel}
      </span>
    );
  }

  /**
   * @stable [16.05.2018]
   * @returns {JSX.Element}
   */
  protected getControls(): JSX.Element {
    const props = this.props;
    const isPreviousBtnDisabled = this.isPreviousBtnDisabled;
    const isNextBtnDisabled = this.isNextBtnDisabled;

    return (
      <div>
        {
          this.uiFactory.makeIcon({
            type: 'first_page',
            className: 'rac-button-page-icon',
            disabled: isPreviousBtnDisabled,
            onClick: props.onFirst,
          })
        }
        {
          this.uiFactory.makeIcon({
            type: 'keyboard_arrow_left',
            className: 'rac-button-page-icon',
            disabled: isPreviousBtnDisabled,
            onClick: props.onPrevious,
          })
        }
        {this.getPagesElement()}
        {
          this.uiFactory.makeIcon({
            type: 'keyboard_arrow_right',
            className: 'rac-button-page-icon',
            disabled: isNextBtnDisabled,
            onClick: props.onNext,
          })
        }
        {
          this.uiFactory.makeIcon({
            type: 'last_page',
            className: 'rac-button-page-icon',
            disabled: isNextBtnDisabled,
            onClick: props.onLast,
          })
        }
      </div>
    );
  }
}
