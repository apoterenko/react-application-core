import * as React from 'react';

import { BaseComponent } from '../base';
import {
  fullFlexClassName,
  handlerPropsFactory,
  ifNotNilThanValue,
  isDecorated,
  isObjectNotEmpty,
  isRippled,
  joinClassName,
} from '../../util';
import {
  DEFAULT_FLEX_BUTTON_CLASS_NAMES,
  IButtonProps,
} from '../../definition';
import {
  getButtonIcon,
  getButtonText,
  hasIconButton,
  isButtonDisabled,
} from './button.support';
import { Link } from '../link';

export class Button extends BaseComponent<IButtonProps> {

  public static readonly defaultProps: IButtonProps = {
    full: false,
    touched: false,
    type: 'button',
  };

  /**
   * @stable [27.01.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const {iconRight} = props;
    const buttonText = getButtonText(props);
    const hasContent = isObjectNotEmpty(props.children) || isObjectNotEmpty(buttonText);
    const hasIcon = hasIconButton(props);

    const className = joinClassName(
      ...DEFAULT_FLEX_BUTTON_CLASS_NAMES,
      props.className,
      fullFlexClassName(props),
      hasContent ? 'rac-button-filled' : 'rac-button-not-filled',
      this.isDecorated && hasIcon && 'rac-button-decorated',
      props.mini && 'rac-button-mini',
      props.outlined && 'rac-button-outlined',
      props.raised && 'rac-button-raised',
      this.isRippled && this.uiFactory.rippleSurface
    );

    if (props.to) {
      return (
        <Link
          to={props.to}
          style={props.style}
          className={className}
        >
          {buttonText}
        </Link>
      );
    }
    const disabled = isButtonDisabled(props);

    const iconElement = hasIcon && this.uiFactory.makeIcon(getButtonIcon(props, 'spinner', 'error'));

    return (
      <button
        ref={this.selfRef}
        type={props.type}
        title={props.title as string}
        style={props.style}
        className={className}
        disabled={disabled}
        {...handlerPropsFactory(props.onClick, !disabled, props.touched)}
      >
        {!iconRight && iconElement}
        {
          hasContent && (
            <div className='rac-button-content'>
              {buttonText && this.t(buttonText)}
              {props.children}
            </div>
          )
        }
        {iconRight && iconElement}
      </button>
    );
  }

  /**
   * @stable [23.02.2019]
   */
  public blur(): void {
    this.getSelf().blur(); // document.activeElement === body
  }

  /**
   * @stable [24.01.2020]
   * @returns {boolean}
   */
  private get isRippled(): boolean {
    return isRippled(this.props) && isRippled(this.globalButtonSettings);
  }

  /**
   * @stable [24.01.2020]
   * @returns {boolean}
   */
  private get isDecorated(): boolean {
    return isDecorated(this.props);
  }

  /**
   * @stable [24.01.2020]
   * @returns {IButtonProps}
   */
  private get globalButtonSettings(): IButtonProps {
    return ifNotNilThanValue(this.settings.components, (components) => components.button, {}) || {};
  }
}
