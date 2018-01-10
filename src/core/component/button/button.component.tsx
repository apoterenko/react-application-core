import * as React from 'react';

import { BaseComponent } from '../../component/base';
import { toClassName } from '../../util';
import {
  IButtonInternalProps,
  IButtonInternalState,
} from './button.interface';
import { Link } from '../../component/link';

export class Button extends BaseComponent<Button,
                                          IButtonInternalProps,
                                          IButtonInternalState> {
  public static defaultProps: IButtonInternalProps = {
    type: 'button',
  };

  public render(): JSX.Element {
    const props = this.props;
    const statusText = props.progress
        ? this.t(props.progressMessage || 'Waiting...')
        : (props.error
            ? (props.errorMessage || this.t('Error'))
            : null);
    const className = toClassName(
        !props.noClassName && this.uiFactory.button,
        'rac-button',
        props.accent && 'mdc-button--accent',
        props.raised && 'mdc-button--raised',
        props.className);

    if (props.to) {
      return (
          <Link to={props.to}
                className={className}>
            {props.children}
          </Link>
      );
    }
    return (
        <button type={props.type}
                title={props.title}
                onClick={props.onClick}
                className={className}
                disabled={props.disabled || props.progress}>
          {
            this.uiFactory.makeIcon(props.progress
                ? 'timelapse'
                : (props.error ? 'error' : props.icon))
          }
          {statusText || props.children}
        </button>
    );
  }
}
