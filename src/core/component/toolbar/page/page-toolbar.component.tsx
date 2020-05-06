import * as React from 'react';

import {
  calc,
  inProgress,
  isFirstAllowedWrapper,
  isFull,
  isLastAllowedWrapper,
  isPageable,
  isPageCursorInEndPosition,
  isPageCursorInStartPosition,
  joinClassName,
  orNull,
  pageCursorFrom,
  pageCursorTo,
  pagesCount,
} from '../../../util';
import {
  IconsEnum,
  IPageToolbarProps,
  ToolbarClassesEnum,
} from '../../../definition';
import { GenericComponent } from '../../base/generic.component';

/**
 * @component-impl
 * @stable [05.05.2020]
 *
 * Please use the "Mappers.pageToolbarProps"
 */
export class PageToolbar extends GenericComponent<IPageToolbarProps> {

  public static readonly defaultProps: IPageToolbarProps = {
    full: false,
  };

  /**
   * @stable [05.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    if (!this.isToolbarVisible) {
      return null;
    }

    return (
      <div
        ref={this.actualRef}
        style={props.style}
        className={joinClassName(
          ToolbarClassesEnum.PAGE_TOOLBAR,
          isFull(props) && ToolbarClassesEnum.FULL_TOOLBAR,
          calc(props.className),
        )}
      >
        {this.bodyElement}
      </div>
    );
  }

  /**
   * @stable [05.05.2020]
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
   * @stable [05.05.2020]
   * @returns {JSX.Element}
   */
  private get bodyElement(): JSX.Element {
    const props = this.props;

    return orNull(
      props.totalCount > 0 && !inProgress(props),
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
    const props = this.props;
    const isPreviousActionDisabled = this.isPreviousActionDisabled;
    const isNextActionDisabled = this.isNextActionDisabled;

    return (
      <React.Fragment>
        {
          isFirstAllowedWrapper(props) && (
            this.uiFactory.makeIcon({
              type: IconsEnum.ANGLE_DOUBLE_LEFT,
              className: ToolbarClassesEnum.TOOLBAR_ICON,
              disabled: isPreviousActionDisabled,
              onClick: props.onFirst,
            })
          )
        }
        {
          this.uiFactory.makeIcon({
            type: props.previousIcon || IconsEnum.ANGLE_LEFT,
            className: ToolbarClassesEnum.TOOLBAR_ICON,
            disabled: isPreviousActionDisabled,
            onClick: props.onPrevious,
          })
        }
        {this.pagesElement}
        {
          this.uiFactory.makeIcon({
            type: props.nextIcon || IconsEnum.ANGLE_RIGHT,
            className: ToolbarClassesEnum.TOOLBAR_ICON,
            disabled: isNextActionDisabled,
            onClick: props.onNext,
          })
        }
        {
          isLastAllowedWrapper(props) && (
            this.uiFactory.makeIcon({
              type: IconsEnum.ANGLE_DOUBLE_RIGHT,
              className: ToolbarClassesEnum.TOOLBAR_ICON,
              disabled: isNextActionDisabled,
              onClick: props.onLast,
            })
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
      page,
      useShortFormat,
    } = this.props;
    const messages = this.settings.messages;

    return this.t(
      useShortFormat
        ? messages.SHORT_PAGES_INFO
        : messages.PAGES_INFO,
      {
        page,
        count: useShortFormat ? pagesCount(this.props) : this.props.totalCount,
        from: this.fromNumber,
        to: this.toNumber,
      }
    );
  }

  /**
   * @stable [05.05.2020]
   * @returns {boolean}
   */
  private get isToolbarVisible(): boolean {
    return isPageable(this.props);
  }

  /**
   * @stable [05.05.2020]
   * @returns {boolean}
   */
  private get isPreviousActionDisabled(): boolean {
    return isPageCursorInStartPosition(this.props);
  }

  /**
   * @stable [05.05.2020]
   * @returns {boolean}
   */
  private get isNextActionDisabled(): boolean {
    return isPageCursorInEndPosition(this.props);
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
}
