import * as React from 'react';

import { toClassName } from '../../../util';
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
    return (
      <div className={toClassName(this.uiFactory.toolbarRow, 'rac-page-toolbar-content')}/>
    );
  }

  protected getContent(): JSX.Element {
    return (
      <div className={toClassName(this.uiFactory.toolbarRow, 'rac-page-toolbar-content')}>
        {this.getChildrenContent()}
        {this.getPagesElement()}
        {this.checkAndGetControls()}
      </div>
    );
  }

  /**
   * @stable [16.05.2018]
   * @returns {JSX.Element}
   */
  protected getChildrenContent(): JSX.Element {
    return (
      <div className='rac-flex-full'>
        {this.props.children}
      </div>
    );
  }

  /**
   * @stable [16.05.2018]
   * @returns {JSX.Element}
   */
  protected getPagesElement(): JSX.Element {
    return (
      <div className='rac-toolbar-pages-info'>
        {this.pagesInfoLabel}
      </div>
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
            disabled: isPreviousBtnDisabled,
            onClick: props.onFirst,
          })
        }
        {
          this.uiFactory.makeIcon({
            type: 'keyboard_arrow_left',
            disabled: isPreviousBtnDisabled,
            onClick: props.onPrevious,
          })
        }
        {
          this.uiFactory.makeIcon({
            type: 'keyboard_arrow_right',
            disabled: isNextBtnDisabled,
            onClick: props.onNext,
          })
        }
        {
          this.uiFactory.makeIcon({
            type: 'last_page',
            disabled: isNextBtnDisabled,
            onClick: props.onLast,
          })
        }
      </div>
    );
  }
}
