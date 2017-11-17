import * as React from 'react';

import { BaseComponent } from '../../component/base';
import { toClassName } from '../../util';
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
                onClick={props.onClick}
                className={toClassName(
                    'mdc-button',
                    props.isAccent && 'mdc-button--accent',
                    props.isRaised && 'mdc-button--raised',
                    props.className)}
                disabled={props.disabled || props.progress}>
          {statusText || props.children}
        </button>
    );
  }
}
