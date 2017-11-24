import * as React from 'react';

import { BaseComponent } from '../../component/base';
import { orNull, toClassName } from '../../util';
import {
  IButtonInternalProps,
  IButtonInternalState,
} from './button.interface';

export class Button extends BaseComponent<Button,
                                          IButtonInternalProps,
                                          IButtonInternalState> {
  public static defaultProps: IButtonInternalProps = {
    type: 'button',
  };

  constructor(props: IButtonInternalProps) {
    super(props);
  }

  public render(): JSX.Element {
    const props = this.props;
    const statusText = props.progress
        ? (this.t(props.progressMessage || 'Waiting...'))
        : (props.error
            ? (props.errorMessage || this.t('Error'))
            : null);

    return (
        <button type={props.type}
                title={props.title}
                onClick={props.onClick}
                className={toClassName(
                    'mdc-button',
                    'app-button',
                    props.isAccent && 'mdc-button--accent',
                    props.isRaised && 'mdc-button--raised',
                    props.className)}
                disabled={props.disabled || props.progress}>
          {
            orNull(
                props.icon,
                <i className='material-icons app-button-icon'>{
                  props.progress
                      ? 'timelapse'
                      : (props.error ? 'error' : props.icon)
                }</i>
            )
          }
          {statusText || props.children}
        </button>
    );
  }
}
