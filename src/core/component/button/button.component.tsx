import * as React from 'react';

import { BaseComponent } from '../../component/base';
import { toClassName, orNull } from '../../util';
import { IButtonProps } from './button.interface';
import { Link } from '../../component/link';
import { isButtonDisabled, getButtonText, getButtonIcon } from './button.support';

export class Button extends BaseComponent<Button, IButtonProps> {

  public static defaultProps: IButtonProps = {
    type: 'button',
  };

  /**
   * @stable - 20.04.2018
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const buttonText = getButtonText(props, this.settings.messages);

    const className = toClassName(
        !props.notApplyFrameworkClassName && this.uiFactory.button,
        'rac-button',
        props.accent && 'mdc-button--accent',
        props.raised && 'mdc-button--raised',
        props.className
    );

    if (props.to) {
      return (
          <Link to={props.to}
                className={className}>
            {buttonText}
          </Link>
      );
    }
    return (
        <button type={props.type}
                title={props.title}
                onClick={props.onClick}
                className={className}
                disabled={isButtonDisabled(props)}>
          {
            this.uiFactory.makeIcon(getButtonIcon(props, 'timelapse', 'error'))
          }
          {orNull(buttonText, () => this.t(buttonText))}
          {props.children}
        </button>
    );
  }
}
