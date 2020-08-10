import * as React from 'react';

import {
  CalcUtils,
  ClsUtils,
  ConditionUtils,
  PageUtils,
  WrapperUtils,
} from '../../../util';
import {
  IconsEnum,
  IPageToolbarProps,
  ToolbarClassesEnum,
} from '../../../definition';
import { GenericComponent } from '../../base/generic.component';
import { Button } from '../../button/button.component';

/**
 * @component-impl
 * @stable [10.06.2020]
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
    const originalProps = this.originalProps;
    const {
      className,
      style,
    } = originalProps;

    return (
      <div
        ref={this.actualRef}
        style={style}
        className={ClsUtils.joinClassName(
          ToolbarClassesEnum.PAGE_TOOLBAR,
          WrapperUtils.isFull(originalProps) && ToolbarClassesEnum.FULL_TOOLBAR,
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
   * @stable [10.06.2020]
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
    const pagesCount = this.pagesCount;
    const isNextActionRendered = nextPageNumber < pagesCount;
    const isPreviousActionRendered = previousPageNumber > 0;

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
                  className={
                    ClsUtils.joinClassName(
                      ToolbarClassesEnum.TOOLBAR_ACTION,
                      ToolbarClassesEnum.TOOLBAR_ACTION_FIRST
                    )
                  }
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
              isPreviousActionRendered && (
                <Button
                  raised={true}
                  {...actionConfiguration}
                  text={useShortDigitFormat ? String(previousPageNumber) : PREVIOUS}
                  disabled={isPreviousActionDisabled}
                  className={
                    ClsUtils.joinClassName(
                      ToolbarClassesEnum.TOOLBAR_ACTION,
                      useShortDigitFormat && ToolbarClassesEnum.TOOLBAR_ACTION_WITH_SHORT_DIGIT_FORMAT
                    )
                  }
                  onClick={onPrevious}/>
              )
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
              isNextActionRendered && (
                <Button
                  raised={true}
                  {...actionConfiguration}
                  text={useShortDigitFormat ? String(nextPageNumber) : NEXT}
                  disabled={isNextActionDisabled}
                  className={
                    ClsUtils.joinClassName(
                      ToolbarClassesEnum.TOOLBAR_ACTION,
                      useShortDigitFormat && ToolbarClassesEnum.TOOLBAR_ACTION_WITH_SHORT_DIGIT_FORMAT
                    )
                  }
                  onClick={onNext}/>
              )
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
                  className={
                    ClsUtils.joinClassName(
                      ToolbarClassesEnum.TOOLBAR_ACTION,
                      ToolbarClassesEnum.TOOLBAR_ACTION_LAST
                    )
                  }
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
   * @stable [10.06.2020]
   * @returns {string}
   */
  private get pagesInfo(): string {
    const {
      useShortDigitFormat,
      useShortFormat,
    } = this.mergedProps;

    const {
      page,
    } = this.originalProps;

    const {
      PAGES_INFO,
      SHORT_PAGES_INFO,
    } = this.settings.messages;

    return useShortDigitFormat
      ? String(page)
      : (
        this.t(
          useShortFormat
            ? SHORT_PAGES_INFO
            : PAGES_INFO,
          {
            page,
            count: useShortFormat ? this.pagesCount : this.totalCount,
            from: this.fromNumber,
            to: this.toNumber,
          }
        )
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
   * @stable [10.06.2020]
   * @returns {number}
   */
  private get toNumber(): number {
    return PageUtils.pageCursorTo(this.originalProps);
  }

  /**
   * @stable [10.06.2020]
   * @returns {number}
   */
  private get fromNumber(): number {
    return PageUtils.pageCursorFrom(this.originalProps);
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

  /**
   * @stable [10.06.2020]
   * @returns {IPageToolbarProps}
   */
  protected get componentsSettingsProps(): IPageToolbarProps {
    return this.componentsSettings.pageToolbar;
  }
}
