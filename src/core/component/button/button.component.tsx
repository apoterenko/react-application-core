import * as React from 'react';

import { BaseComponent } from '../../component/base';

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
        ? (this.t(props.progressText || 'Waiting...'))
        : (props.error
            ? (props.errorText || this.t('Error'))
            : null);

    const className = [
      'mdc-button',
      this.props.type === 'submit' && 'mdc-button--accent',
      props.className
    ];

    return (
        <button type={this.props.type}
                className={className.filter((cls) => !!cls).join(' ')}
                disabled={props.disabled || props.progress}>
          {statusText || props.children}
        </button>
    );
  }
}
