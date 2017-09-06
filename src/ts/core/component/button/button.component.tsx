import * as React from 'react';

import { BaseComponent } from 'core/component/base';

import {
  IButtonInternalProps,
  IButtonInternalState
} from './button.interface';

export class Button extends BaseComponent<Button,
                                          IButtonInternalProps,
                                          IButtonInternalState> {
  constructor(props: IButtonInternalProps) {
    super(props);
  }

  public render(): JSX.Element {
    const props = this.props;
    const text = props.progress
        ? (this.t(props.progressText || 'Waiting...'))
        : (props.error
            ? (props.errorText || this.t('Error'))
            : this.t(props.text));

    const className = ['mdc-button', 'mdc-button--accent', props.className];

    return (
        <button type='submit'
                className={className.filter(cls => !!cls).join(' ')}
                disabled={props.disabled || props.progress}>
          {props.children}
          {text}
        </button>
    );
  }
}
