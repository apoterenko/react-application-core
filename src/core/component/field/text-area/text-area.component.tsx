import * as React from 'react';

import {
  ClsUtils,
  ConditionUtils,
} from '../../../util';
import {
  FieldClassesEnum,
  IFieldTextAreaAttributes,
  ITextAreaProps,
  TextAreaClassesEnum,
} from '../../../definition';
import { BaseTextField } from '../text-field';

/**
 * @component-impl
 * @stable [20.06.2020]
 */
export class TextArea extends BaseTextField<ITextAreaProps> {

  public static defaultProps: ITextAreaProps = {
    clearActionRendered: false,
  };

  /**
   * @stable [20.06.2020]
   * @returns {JSX.Element}
   */
  protected getInputElement(): JSX.Element {
    return <textarea {...this.getInputElementProps() as IFieldTextAreaAttributes}/>;
  }

  /**
   * @stable [20.06.2020]
   * @returns {JSX.Element}
   */
  protected get inputAttachmentElement(): JSX.Element {
    const {
      maxLength,
    } = this.mergedProps;
    const {
      MAX_LENGTH_OF,
    } = this.settings.messages;

    return ConditionUtils.ifNotNilThanValue(
      maxLength,
      () => (
        <label
          className={FieldClassesEnum.FIELD_INPUT_LABEL}
        >
          {this.t(MAX_LENGTH_OF, {
            length: (this.value || '').length,
            maxLength,
          })}
        </label>
      )
    );
  }

  /**
   * @stable [20.06.2020]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return ClsUtils.joinClassName(
      super.getFieldClassName(),
      TextAreaClassesEnum.TEXT_AREA
    );
  }
}
