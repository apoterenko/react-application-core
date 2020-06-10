import * as React from 'react';

import {
  CalcUtils,
  ClsUtils,
  ConditionUtils,
  pageCursorFrom,
  pageCursorTo,
  PageUtils,
  WrapperUtils,
} from '../../../util';
import {
  IconsEnum,
  IPageToolbarProps,
  ToolbarClassesEnum,
} from '../../../definition';
import { GenericComponent } from '../../base/generic.component';
import { Button } from '../../button';

/**
 * @component-impl
 * @stable [12.05.2020]
 *
 * Please use the "Mappers.pageToolbarProps"
 */
export class PageToolbar extends GenericComponent<IPageToolbarProps> {

  public static readonly defaultProps: IPageToolbarProps = {
    firstAllowed: true,
    full: false,
    lastAllowed: true,
  };

  /**
   * @stable [10.06.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    if (!this.isToolbarVisible) {
      return null;
    }
    const mergedProps = this.mergedProps;
    const {
      className,
      style,
    } = mergedProps;

    return (
      <div
        ref={this.actualRef}
        style={style}
        className={ClsUtils.joinClassName(
          ToolbarClassesEnum.PAGE_TOOLBAR,
          WrapperUtils.isFull(mergedProps) && ToolbarClassesEnum.FULL_TOOLBAR,
          CalcUtils.calc(className),
        )}
      >
        {this.bodyElement}
      </div>
    );
  }

  /**
   * @stable [10.06.2020]
   * @returns {JSX.Element}
   */
  private get pagesElement(): JSX.Element {
    return (
      <div className={ToolbarClassesEnum.TOOLBAR_PAGES}>
        {this.pagesInfo}
      </div>
    );
  }

  /**
   * @stable [10.06.2020]
   * @returns {JSX.Element}
   */
  private get bodyElement(): JSX.Element {
    const originalProps = this.originalProps;

    return ConditionUtils.orNull(
      this.totalCount > 0 && !WrapperUtils.inProgress(originalProps),
      () => (
        <div className={ToolbarClassesEnum.TOOLBAR_CONTENT}>
          {this.actionsElement}
        </div>
      )
    );
  }

  /**
   * @stable [05.05.2020]
   * @returns {JSX.Element}
   */
  private get actionsElement(): JSX.Element {
    const {
      actionConfiguration,
      firstAllowed,
      lastAllowed,
      nextIcon,
      onFirst,
      onLast,
      onNext,
      onPrevious,
      previousIcon,
      useActions,
      useShortDigitFormat,
    } = this.mergedProps;

    const {
      page,
    } = this.originalProps;

    const {
      FIRST,
      LAST,
      NEXT,
      PREVIOUS,
    } = this.settings.messages;

    const isNextActionDisabled = this.isNextActionDisabled;
    const isPreviousActionDisabled = this.isPreviousActionDisabled;
    const nextPageNumber = page + 1;
    const previousPageNumber = page - 1;

    return (
      <React.Fragment>
        {
          firstAllowed && (
            useActions
              ? (
                <Button
                  raised={true}
                  {...actionConfiguration}
                  text={FIRST}
                  disabled={isPreviousActionDisabled}
                  className={ToolbarClassesEnum.TOOLBAR_ACTION}
                  onClick={onFirst}/>
              )
              : (
                this.uiFactory.makeIcon({
                  type: IconsEnum.ANGLE_DOUBLE_LEFT,
                  className: ToolbarClassesEnum.TOOLBAR_ICON,
                  disabled: isPreviousActionDisabled,
                  onClick: onFirst,
                })
              )
          )
        }
        {
          useActions
            ? (
              <Button
                raised={true}
                {...actionConfiguration}
                text={useShortDigitFormat ? String(previousPageNumber) : PREVIOUS}
                disabled={isPreviousActionDisabled}
                className={
                  ClsUtils.joinClassName(
                    ToolbarClassesEnum.TOOLBAR_ACTION,
                    ToolbarClassesEnum.TOOLBAR_ACTION_MIDDLE,
                    useShortDigitFormat && ToolbarClassesEnum.TOOLBAR_ACTION_WITH_SHORT_DIGIT_FORMAT
                  )
                }
                onClick={onPrevious}/>
            )
            : (
              this.uiFactory.makeIcon({
                type: previousIcon || IconsEnum.ANGLE_LEFT,
                className: ToolbarClassesEnum.TOOLBAR_ICON,
                disabled: isPreviousActionDisabled,
                onClick: onPrevious,
              })
            )
        }
        {this.pagesElement}
        {
          useActions
            ? (
              <Button
                raised={true}
                {...actionConfiguration}
                text={useShortDigitFormat ? String(nextPageNumber) : NEXT}
                disabled={isNextActionDisabled}
                className={
                  ClsUtils.joinClassName(
                    ToolbarClassesEnum.TOOLBAR_ACTION,
                    ToolbarClassesEnum.TOOLBAR_ACTION_MIDDLE,
                    useShortDigitFormat && ToolbarClassesEnum.TOOLBAR_ACTION_WITH_SHORT_DIGIT_FORMAT
                  )
                }
                onClick={onNext}/>
            )
            : (
              this.uiFactory.makeIcon({
                type: nextIcon || IconsEnum.ANGLE_RIGHT,
                className: ToolbarClassesEnum.TOOLBAR_ICON,
                disabled: isNextActionDisabled,
                onClick: onNext,
              })
            )
        }
        {
          lastAllowed && (
            useActions
              ? (
                <Button
                  raised={true}
                  {...actionConfiguration}
                  text={LAST}
                  disabled={isNextActionDisabled}
                  className={ToolbarClassesEnum.TOOLBAR_ACTION}
                  onClick={onLast}/>
              )
              : (
                this.uiFactory.makeIcon({
                  type: IconsEnum.ANGLE_DOUBLE_RIGHT,
                  className: ToolbarClassesEnum.TOOLBAR_ICON,
                  disabled: isNextActionDisabled,
                  onClick: onLast,
                })
              )
          )
        }
      </React.Fragment>
    );
  }

  /**
   * @stable [05.05.2020]
   * @returns {string}
   */
  private get pagesInfo(): string {
    const {
      useShortFormat,
    } = this.mergedProps;
    const {
      page,
    } = this.originalProps;
    const {
      PAGES_INFO,
      SHORT_PAGES_INFO,
    } = this.settings.messages;

    return this.t(
      useShortFormat
        ? SHORT_PAGES_INFO
        : PAGES_INFO,
      {
        page,
        count: useShortFormat ? this.pagesCount : this.totalCount,
        from: this.fromNumber,
        to: this.toNumber,
      }
    );
  }

  /**
   * @stable [10.06.2020]
   * @returns {boolean}
   */
  private get isToolbarVisible(): boolean {
    return PageUtils.isPageable(this.originalProps);
  }

  /**
   * @stable [10.06.2020]
   * @returns {boolean}
   */
  private get isPreviousActionDisabled(): boolean {
    return PageUtils.isPageCursorInStartPosition(this.originalProps);
  }

  /**
   * @stable [10.06.2020]
   * @returns {boolean}
   */
  private get isNextActionDisabled(): boolean {
    return PageUtils.isPageCursorInEndPosition(this.originalProps);
  }

  /**
   * @stable [05.05.2020]
   * @returns {number}
   */
  private get toNumber(): number {
    return pageCursorTo(this.props);
  }

  /**
   * @stable [05.05.2020]
   * @returns {number}
   */
  private get fromNumber(): number {
    return pageCursorFrom(this.props);
  }

  /**
   * @stable [10.06.2020]
   * @returns {number}
   */
  private get pagesCount(): number {
    return PageUtils.pagesCount(this.originalProps);
  }

  /**
   * @stable [10.06.2020]
   * @returns {number}
   */
  private get totalCount(): number {
    return this.originalProps.totalCount;
  }
}
