import * as React from 'react';
import * as R from 'ramda';

import { BaseComponent } from '../base';
import {
  calc,
  handlerPropsFactory,
  hasIcon,
  inProgress,
  isDecorated,
  isDisabled,
  isFull,
  isIconLeftAligned,
  isObjectNotEmpty,
  joinClassName,
  nvl,
} from '../../util';
import {
  ButtonClassesEnum,
  IButtonProps,
  UniversalIdProviderContext,
} from '../../definition';
import { Link } from '../link';

export class Button extends BaseComponent<IButtonProps> {

  public static readonly defaultProps: IButtonProps = {
    full: false,
    touched: false,
    type: 'button',
  };

  /**
   * @stable [02.02.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const $text = this.text;
    const $hasContent = this.hasContent($text);
    const $hasIcon = hasIcon(props);
    const $isIconLeftAligned = isIconLeftAligned(props);

    const className = joinClassName(
      ButtonClassesEnum.BUTTON,
      calc(props.className),
      $hasContent ? 'rac-button-filled' : 'rac-button-not-filled',
      this.isFull && ButtonClassesEnum.FULL_BUTTON,
      this.isDecorated && $hasIcon && 'rac-button-decorated',
      props.mini && 'rac-button-mini',
      props.outlined && 'rac-button-outlined',
      props.raised && ButtonClassesEnum.BUTTON_RAISED
    );

    if (props.to) {
      return (
        <Link
          to={props.to}
          style={props.style}
          className={className}
        >
          {$text}
        </Link>
      );
    }
    const disabled = this.isDisabled;
    const iconElement = $hasIcon && this.iconElement;

    return (
      <UniversalIdProviderContext.Consumer>
        {(identificator) => (
          <button
            id={this.getId(identificator)}
            ref={this.selfRef}
            type={props.type}
            title={props.title as string}
            style={props.style}
            className={className}
            disabled={disabled}
            {...handlerPropsFactory(props.onClick, !disabled, props.touched)}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
          >
            {$isIconLeftAligned && iconElement}
            {
              $hasContent && (
                <div className='rac-button__content'>
                  {$text && this.t($text)}
                  {props.children}
                </div>
              )
            }
            {!$isIconLeftAligned && iconElement}
          </button>
        )}
      </UniversalIdProviderContext.Consumer>
    );
  }

  /**
   * @stable [23.02.2019]
   */
  public blur(): void {
    this.getSelf().blur(); // document.activeElement === body
  }

  // TODO
  public getId(identificator: string): string {
    if (R.isNil(identificator)) {
      return identificator;
    }
    const names = [this.props.text];
    return names.map((name) => (name || '').split(' ').map((part) => (part[0] || '').toLowerCase()).join('-')).join('-');
  }

  /**
   * @stable [02.02.2020]
   * @returns {boolean}
   */
  private get isDecorated(): boolean {
    return isDecorated(this.props);
  }

  /**
   * @stable [02.02.2020]
   * @param text
   * @returns {boolean}
   */
  private hasContent(text): boolean {
    return isObjectNotEmpty(this.props.children) || isObjectNotEmpty(text);
  }

  /**
   * @stable [02.02.2020]
   * @returns {boolean}
   */
  private get isDisabled(): boolean {
    return isDisabled(this.props) || inProgress(this.props);
  }

  /**
   * @stable [02.02.2020]
   * @returns {boolean}
   */
  private get isFull(): boolean {
    return isFull(this.props);
  }

  /**
   * @stable [02.02.2020]
   * @returns {JSX.Element}
   */
  private get iconElement(): JSX.Element {
    const {
      error,
      icon,
      progress,
    } = this.props;

    return this.uiFactory.makeIcon({
      type: progress
        ? 'spinner'
        : (error ? 'error' : icon as string),
    });
  }

  /**
   * @stable [02.02.2020]
   * @returns {string}
   */
  private get text(): string {
    const {
      error,
      errorMessage,
      progress,
      progressMessage,
      text,
    } = this.props;

    return (
      progress
        ? nvl(progressMessage, this.settings.messages.WAITING)
        : (
          error
            ? nvl(errorMessage, this.settings.messages.ERROR)
            : text
        )
    );
  }
}
