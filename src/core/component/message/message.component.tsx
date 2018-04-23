import * as React from 'react';

import { orNull } from '../../util';
import { BaseComponent } from '../base';
import { IMessageInternalProps } from './message.interface';
import { CenterLayout } from '../layout';
import { ProgressLabel } from '../progress';

export class Message extends BaseComponent<Message, IMessageInternalProps, {}> {

  /**
   * @stable - 08.04.2018
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const progress = props.progress;
    const error = props.error;
    let addChildren = false;

    return (
      <CenterLayout>
        {
          progress
            ? <ProgressLabel/>
            : (
              error
                ? this.getErrorMessage()
                : ((addChildren = true) && (
                  props.emptyData
                    ? this.getEmptyDataMessage()
                    : this.getEmptyMessage()
                ))
            )
        }
        {orNull(addChildren, props.children)}
      </CenterLayout>
    );
  }

  /**
   * @stable - 08.04.2018
   * @returns {string}
   */
  private getErrorMessage(): string {
    return this.t(this.props.errorMessage || this.settings.messages.errorMessage);
  }

  /**
   * @stable - 08.04.2018
   * @returns {string}
   */
  private getEmptyMessage(): string {
    return this.t(this.props.emptyMessage || this.settings.messages.emptyMessage);
  }

  /**
   * @stable - 08.04.2018
   * @returns {string}
   */
  private getEmptyDataMessage(): string {
    return this.t(this.props.emptyDataMessage || this.settings.messages.emptyDataMessage);
  }
}
