import * as React from 'react';

import { orNull } from '../../util';
import { UniversalComponent } from '../base/universal.component';
import { IUniversalMessageProps } from './universal-message.interface';

export abstract class UniversalMessage<TComponent extends UniversalMessage<TComponent, TProps, TState>,
                                       TProps extends IUniversalMessageProps = IUniversalMessageProps,
                                       TState = {}>
  extends UniversalComponent<TComponent, TProps, TState> {

  /**
   * @stable [23.04.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const progress = props.progress;
    const error = props.error;
    let addChildren = false;

    return this.getMessageWrapper(
      progress
        ? this.getProgressLabel()
        : (
          error
            ? this.getErrorMessage()
            : ((addChildren = true) && (
              props.emptyData
                ? this.getEmptyDataMessage()
                : this.getEmptyMessage()
            ))
        ),
      orNull<React.ReactNode>(addChildren, props.children)
    );
  }

  /**
   * @stable [23.04.2018]
   * @returns {JSX.Element}
   */
  protected abstract getProgressLabel(): JSX.Element;

  /**
   * @stable [23.04.2018]
   * @param {string | JSX.Element} message
   * @param {React.ReactNode} node
   * @returns {JSX.Element}
   */
  protected abstract getMessageWrapper(message: string|JSX.Element, node: React.ReactNode): JSX.Element;

  /**
   * @stable [23.04.2018]
   * @returns {string}
   */
  private getErrorMessage(): string {
    return this.t(this.props.errorMessage || this.settings.messages.errorMessage);
  }

  /**
   * @stable [23.04.2018]
   * @returns {string}
   */
  private getEmptyMessage(): string {
    return this.t(this.props.emptyMessage || this.settings.messages.emptyMessage);
  }

  /**
   * @stable [23.04.2018]
   * @returns {string}
   */
  private getEmptyDataMessage(): string {
    return this.t(this.props.emptyDataMessage || this.settings.messages.emptyDataMessage);
  }
}
