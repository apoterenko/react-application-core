import * as React from 'react';
import * as R from 'ramda';

import { orNull, toClassName } from '../../../util';
import { IPageToolbarProps } from './page-toolbar.interface';
import { UniversalPageToolbar } from './universal-page-toolbar.component';
import { FlexLayout } from '../../layout';

export class PageToolbar extends UniversalPageToolbar<IPageToolbarProps> {

  /**
   * @stable [16.05.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return orNull<JSX.Element>(
      this.isToolbarVisible(),
      () => (
        <FlexLayout className={toClassName('rac-toolbar', 'rac-page-toolbar', props.className)}>
          {this.getToolbarBody()}
        </FlexLayout>
      )
    );
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
        <FlexLayout alignItemsCenter={true}
                    row={true}
                    className='rac-toolbar-content'>
          {this.getLeftContent()}
          {controls}
          {this.getRightContent()}
        </FlexLayout>
      )
    );
  }

  /**
   * @stable [25.06.2018]
   * @returns {JSX.Element}
   */
  protected getRightContent(): JSX.Element {
    return <FlexLayout/>;
  }

  /**
   * @stable [16.05.2018]
   * @returns {JSX.Element}
   */
  protected getLeftContent(): JSX.Element {
    return (
      <FlexLayout row={true}>
        {this.props.children}
      </FlexLayout>
    );
  }

  /**
   * @stable [25.06.2018]
   * @returns {JSX.Element}
   */
  protected getPagesElement(): JSX.Element {
    return (
      <FlexLayout alignItemsCenter={true}
                  justifyContentCenter={true}
                  className='rac-toolbar-pages-info'>
        {this.pagesInfoLabel}
      </FlexLayout>
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
      <FlexLayout row={true}
                  full={false}>
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
      </FlexLayout>
    );
  }
}
