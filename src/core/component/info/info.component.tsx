import * as React from 'react';

import {
  CalcUtils,
  formatJson,
  isFull,
  isStringNotEmpty,
  joinClassName,
  TypeUtils,
} from '../../util';
import {
  IconsEnum,
  IInfoComponentProps,
  InfoClassesEnum,
} from '../../definition';
import { GenericComponent } from '../base/generic.component';
import {
  IErrorWrapper,
  IProgressWrapper,
  ITextWrapper,
} from '../../definitions.interface';

export class Info extends GenericComponent<IInfoComponentProps> {

  /**
   * @stable [03.04.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const {
      emptyData,
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
                          TypeUtils.isObject(error)
                            ? {text: formatJson(error as {}), error: true}
                            : {
                              text: (
                                emptyData
                                  ? (
                                    TypeUtils.isString(emptyData)
                                      ? emptyData as string
                                      : messages.NOT_DATA_FOUND
                                  )
                                  : message || '?'
                              ),
                            }
                        )
                    )
                )
            )
        );

    return (
      <div className={
        joinClassName(
          InfoClassesEnum.INFO,
          isFull(props) && InfoClassesEnum.FULL_INFO,
          result.error && InfoClassesEnum.ERROR_INFO,
          result.progress && InfoClassesEnum.PROGRESS_INFO,
          !result.error && !result.progress && InfoClassesEnum.MESSAGE_INFO,
          CalcUtils.calc(props.className))}
      >
        {result.text && (
          <span className={InfoClassesEnum.INFO_TEXT}>
            {result.progress && this.uiFactory.makeIcon({type: IconsEnum.SPINNER, className: InfoClassesEnum.INFO_ICON})}
            {result.text}
          </span>
        )}
        {props.children}
      </div>
    );
  }
}
