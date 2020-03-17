import * as React from 'react';

import {
  calc,
  formatJson,
  isObject,
  isStringNotEmpty,
  joinClassName,
} from '../../util';
import { IInfoComponentProps } from '../../definition';
import { GenericComponent } from '../base/generic.component';
import {
  IErrorWrapper,
  IProgressWrapper,
  ITextWrapper,
} from '../../definitions.interface';

export class Info extends GenericComponent<IInfoComponentProps> {

  /**
   * @stable [23.04.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const {
      error,
      message,
      progress,
    } = props;
    const messages = this.settings.messages;

    const result: ITextWrapper & IProgressWrapper<boolean> & IErrorWrapper<boolean> =
      progress === true
        ? {text: messages.PLEASE_WAIT, progress: true}
        : (
          isStringNotEmpty(progress)
            ? {text: this.t(progress as string), progress: true}
            : (
              error === true
                ? {text: messages.ERROR, error: true}
                : (
                  isStringNotEmpty(error)
                    ? {text: this.t(error as string), error: true}
                    : (
                      error instanceof Error
                        ? {text: ((error as Error).stack), error: true}
                        : (
                          isObject(error)
                            ? {text: formatJson(error as {}), error: true}
                            : {text: message}
                        )
                    )
                )
            )
        );

    return (
      <div className={
        joinClassName(
          'rac-info',
          result.error && 'rac-info-error',
          result.progress && 'rac-info-progress',
          !result.error && !result.progress && 'rac-info-message',
          calc(props.className))}
      >
        {result}
        {props.children}
      </div>
    );
  }
}
