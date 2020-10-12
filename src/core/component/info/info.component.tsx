import * as React from 'react';
import * as R from 'ramda';

import {
  CalcUtils,
  ClsUtils,
  isStringNotEmpty,
  JsonUtils,
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

  public static readonly defaultProps: IInfoComponentProps = {
    full: true,
  };

  /**
   * @stable [03.04.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const {
      full,
    } = this.originalProps;

    const props = this.props;
    const {
      emptyData,
      error,
      message,
      progress,
    } = props;

    const hasChildren = !R.isNil(props.children);
    const messages = this.settings.messages;

    const result: ITextWrapper<string | boolean> & IProgressWrapper<boolean> & IErrorWrapper<boolean> =
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
                            ? {text: JsonUtils.formatJson(error as {}), error: true}
                            : {
                              text: (
                                emptyData
                                  ? (
                                    TypeUtils.isString(emptyData)
                                      ? emptyData as string
                                      : messages.NOT_DATA_FOUND
                                  )
                                  : (
                                    message === false
                                      ? null
                                      : (
                                        R.isNil(message)
                                          ? (hasChildren ? message : messages.NO_DATA)
                                          : message
                                      )
                                  )
                              ),
                            }
                        )
                    )
                )
            )
        );

    return (
      <div className={
        ClsUtils.joinClassName(
          InfoClassesEnum.INFO,
          full && InfoClassesEnum.FULL_INFO,
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
