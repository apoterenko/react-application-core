import * as React from 'react';
import * as R from 'ramda';

import { BaseComponent } from '../../component/base';
import { toClassName } from '../../util';
import { Link } from '../../component/link';
import { isButtonDisabled, getButtonText, getButtonIcon } from './button.support';
import { IButtonProps } from '../../definition';

export class Button extends BaseComponent<Button, IButtonProps> {

  public static defaultProps: IButtonProps = {
    type: 'button',
  };

  /**
   * @stable [27.01.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const buttonText = getButtonText(props, this.settings.messages);
    const hasContent = !R.isNil(props.children) || (!R.isNil(buttonText) && !R.isEmpty(buttonText));
    const hasIcon = !R.isNil(props.icon) && props.icon !== false;

    const className = toClassName(
      'rac-button',
      'rac-flex',
      'rac-flex-row',
      'rac-flex-align-items-center',
      props.full && 'rac-flex-full',
      hasContent ? 'rac-button-filled' : 'rac-button-not-filled',
      hasIcon ? 'rac-button-decorated' : 'rac-button-not-decorated',
      props.mini && 'rac-button-mini',
      props.outlined && 'rac-button-outlined',
      props.raised && 'rac-button-raised',
      props.className,
      props.rippled !== false && this.uiFactory.rippleSurface
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

    return (
      <button
        type={props.type}
        title={props.title}
        style={props.style}
        onClick={props.onClick}
        className={className}
        disabled={isButtonDisabled(props)}
      >
        {
          hasIcon && this.uiFactory.makeIcon({
            type: getButtonIcon(props, 'timelapse', 'error'),
            className: props.iconCls,
          })
        }
        {
          hasContent && (
            <div className='rac-button-content'>
              {buttonText && this.t(buttonText)}
              {props.children}
            </div>
          )
        }
      </button>
    );
  }
}
