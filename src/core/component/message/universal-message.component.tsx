import * as React from 'react';

import { orNull, isString, join } from '../../util';
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
   * @returns {string | JSX.Element}
   */
  protected abstract getProgressLabel(): string | JSX.Element;

  /**
   * @stable [09.06.2018]
   * @param {React.ReactNode} message
   * @param {React.ReactNode} node
   * @returns {JSX.Element}
   */
  protected abstract getMessageWrapper(message: React.ReactNode, node: React.ReactNode): JSX.Element;

  /**
   * @stable [17.08.2018]
   * @returns {string}
   */
  private getErrorMessage(): string {
    const props = this.props;
    return join([this.t(props.errorMessage || this.settings.messages.errorMessage), props.error], '\n');
  }

  /**
   * @stable [09.06.2018]
   * @returns {React.ReactNode}
   */
  private getEmptyMessage(): React.ReactNode {
    const emptyMessage = this.props.emptyMessage;
    return isString(emptyMessage)
      ? this.t(emptyMessage as string)
      : (emptyMessage || this.t(this.settings.messages.emptyMessage));
  }

  /**
   * @stable [23.04.2018]
   * @returns {string}
   */
  private getEmptyDataMessage(): string {
    return this.t(this.props.emptyDataMessage || this.settings.messages.emptyDataMessage);
  }
}
