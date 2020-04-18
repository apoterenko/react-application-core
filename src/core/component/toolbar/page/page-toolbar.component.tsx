import * as React from 'react';
import * as R from 'ramda';

import { FlexLayout } from '../../layout/flex';
import { IPageToolbarProps } from './page-toolbar.interface';
import {
  calc,
  ifNotFalseThanValue,
  joinClassName,
  orNull,
} from '../../../util';
import { UniversalPageToolbar } from './universal-page-toolbar.component';

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
        <FlexLayout className={joinClassName('rac-toolbar', 'rac-page-toolbar', calc(props.className))}>
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
      <FlexLayout
        alignItemsCenter={true}
        justifyContentCenter={true}
        className='rac-toolbar-pages'>
        {this.pagesLabel}
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
      <FlexLayout
        row={true}
        full={false}>
        {
          ifNotFalseThanValue(
            props.allowFirst,
            () => (
              this.uiFactory.makeIcon({
                type: 'first_page',
                className: 'rac-toolbar-icon',
                disabled: isPreviousBtnDisabled,
                onClick: props.onFirst,
              })
            )
          )
        }
        {
          this.uiFactory.makeIcon({
            type: props.previousIcon || 'angle_left',
            className: 'rac-toolbar-icon',
            disabled: isPreviousBtnDisabled,
            onClick: props.onPrevious,
          })
        }
        {this.getPagesElement()}
        {
          this.uiFactory.makeIcon({
            type: props.nextIcon || 'angle_right',
            className: 'rac-toolbar-icon',
            disabled: isNextBtnDisabled,
            onClick: props.onNext,
          })
        }
        {
          ifNotFalseThanValue(
            props.allowLast,
            () => (
              this.uiFactory.makeIcon({
                type: 'angle_double_right',
                className: 'rac-toolbar-icon',
                disabled: isNextBtnDisabled,
                onClick: props.onLast,
              })
            )
          )
        }
      </FlexLayout>
    );
  }
}
