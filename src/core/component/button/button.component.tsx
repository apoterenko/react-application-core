import * as React from 'react';
import * as R from 'ramda';

import {
  CalcUtils,
  ClsUtils,
  ConditionUtils,
  ObjectUtils,
  PropsUtils,
  WrapperUtils,
} from '../../util';
import {
  ButtonClassesEnum,
  IButtonProps,
  IconsEnum,
  UniversalIdProviderContext,
} from '../../definition';
import { Link } from '../link';
import { GenericComponent } from '../base/generic.component';

export class Button extends GenericComponent<IButtonProps> {

  public static readonly defaultProps: IButtonProps = {
    full: false,
    iconLeftAligned: true,
    touched: false,
    type: 'button',
  };

  /**
   * @stable [13.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const {
      iconLeftAligned,
    } = this.originalProps;
    const $mergedProps = this.mergedProps;
    const $text = this.getText($mergedProps);
    const $hasContent = this.hasContent($text);
    const $hasIcon = this.hasIcon($mergedProps);
    const className = this.getClassName($mergedProps, $hasContent, $hasIcon);

    if ($mergedProps.to) {
      return (
        <Link
          to={$mergedProps.to}
          style={$mergedProps.style}
          className={className}
        >
          {$text}
        </Link>
      );
    }

    const $disabled = this.isDisabled($mergedProps);
    const $iconElement = $hasIcon && this.getIconElement($mergedProps);

    return (
      <UniversalIdProviderContext.Consumer>
        {(identificator) => (
          <button
            id={this.getId(identificator)}
            ref={this.actualRef}
            type={$mergedProps.type}
            title={$mergedProps.title as string}
            style={$mergedProps.style}
            className={className}
            disabled={$disabled}
            {...PropsUtils.buildClickHandlerProps($mergedProps.onClick, !$disabled, $mergedProps.touched)}
            onMouseEnter={$mergedProps.onMouseEnter}
            onMouseLeave={$mergedProps.onMouseLeave}
          >
            {iconLeftAligned && $iconElement}
            {this.getContentElement($hasContent, $text)}
            {!iconLeftAligned && $iconElement}
          </button>
        )}
      </UniversalIdProviderContext.Consumer>
    );
  }

  /**
   * @stable [13.05.2020]
   */
  public blur(): void {
    this.actualRef.current.blur(); // document.activeElement === body
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
   * @stable [13.05.2020]
   * @param {boolean} $hasContent
   * @param {string} $text
   * @returns {JSX.Element}
   */
  private getContentElement($hasContent: boolean, $text: string): JSX.Element {
    return (
      $hasContent && (
        <div className={ButtonClassesEnum.BUTTON_CONTENT}>
          {$text && this.t($text)}
          {this.props.children}
        </div>
      )
    );
  }

  /**
   * @stable [13.05.2020]
   * @param {IButtonProps} $mergedProps
   * @returns {JSX.Element}
   */
  private getIconElement($mergedProps: IButtonProps): JSX.Element {
    const {
      error,
      icon,
      progress,
    } = $mergedProps;

    return this.uiFactory.makeIcon({
      type: progress
        ? IconsEnum.SPINNER
        : (error ? IconsEnum.EXCLAMATION_CIRCLE : icon as string),
    });
  }

  /**
   * @stable [13.05.2020]
   * @param {IButtonProps} $mergedProps
   * @returns {string}
   */
  private getText($mergedProps: IButtonProps): string {
    const {
      error,
      errorMessage,
      progress,
      progressMessage,
      text,
    } = $mergedProps;

    return (
      progress
        ? (progressMessage || this.settings.messages.WAITING)
        : (
          error
            ? (errorMessage || this.settings.messages.ERROR)
            : text
        )
    );
  }

  /**
   * @stable [13.05.2020]
   * @param {IButtonProps} $mergedProps
   * @param {boolean} $hasContent
   * @param {boolean} $hasIcon
   * @returns {string}
   */
  private getClassName($mergedProps: IButtonProps,
                       $hasContent: boolean,
                       $hasIcon: boolean): string {

    return ClsUtils.joinClassName(
      ButtonClassesEnum.BUTTON,
      CalcUtils.calc($mergedProps.className),
      $hasContent ? ButtonClassesEnum.BUTTON_FILLED : ButtonClassesEnum.BUTTON_NOT_FILLED,
      WrapperUtils.isFull($mergedProps) && ButtonClassesEnum.FULL_BUTTON,
      WrapperUtils.isDecorated($mergedProps) && $hasIcon && ButtonClassesEnum.BUTTON_DECORATED,
      $mergedProps.mini && ButtonClassesEnum.BUTTON_MINI,
      $mergedProps.outlined && ButtonClassesEnum.BUTTON_OUTLINED,
      $mergedProps.raised && ButtonClassesEnum.BUTTON_RAISED
    );
  }

  /**
   * @stable [13.05.2020]
   * @param text
   * @returns {boolean}
   */
  private hasContent(text): boolean {
    return ObjectUtils.isObjectNotEmpty(this.props.children) || ObjectUtils.isObjectNotEmpty(text);
  }

  /**
   * @stable [02.06.2020]
   * @param {IButtonProps} $mergedProps
   * @returns {boolean}
   */
  private hasIcon($mergedProps: IButtonProps): boolean {
    return ConditionUtils.ifNotNilThanValue(
      $mergedProps,
      (entity) => !R.isNil(entity.icon) && entity.icon !== false, false
    );
  }

  /**
   * @stable [13.05.2020]
   * @param {IButtonProps} $mergedProps
   * @returns {boolean}
   */
  private isDisabled($mergedProps: IButtonProps): boolean {
    return WrapperUtils.isDisabled($mergedProps) || WrapperUtils.inProgress($mergedProps);
  }

  /**
   * @stable [01.07.2021]
   */
  protected getComponentSettingsProps(): Readonly<IButtonProps> {
    return PropsUtils.extendProps(
      super.getComponentSettingsProps(),
      this.componentsSettings?.button
    );
  }
}
