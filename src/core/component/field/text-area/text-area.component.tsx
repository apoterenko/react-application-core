import * as React from 'react';

import {
  ClsUtils,
  ConditionUtils,
  PropsUtils,
} from '../../../util';
import {
  FieldClassesEnum,
  IFieldTextAreaProps,
  ITextAreaProps,
  TextAreaClassesEnum,
} from '../../../definition';
import { BaseTextField } from '../text-field';

/**
 * @component-impl
 * @stable [20.06.2020]
 */
export class TextArea extends BaseTextField<ITextAreaProps> {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<ITextAreaProps>({
    clearActionRendered: false,
  }, BaseTextField);

  /**
   * @stable [14.10.2020]
   * @protected
   */
  protected getInputElementProps(): IFieldTextAreaProps {
    const {
      cols,
      rows,
    } = this.originalProps;

    return {
      ...super.getInputElementProps() as IFieldTextAreaProps,
      cols,
      rows,
    };
  }

  /**
   * @stable [14.10.2020]
   * @protected
   */
  protected getInputElement(): JSX.Element {
    return <textarea {...this.getInputElementProps() as IFieldTextAreaProps}/>;
  }

  /**
   * @stable [14.10.2020]
   * @protected
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
          className={FieldClassesEnum.INPUT_LABEL}
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
   * @stable [14.10.2020]
   * @protected
   */
  protected getFieldClassName(): string {
    return ClsUtils.joinClassName(
      super.getFieldClassName(),
      TextAreaClassesEnum.TEXT_AREA
    );
  }

  /**
   * @stable [14.10.2020]
   * @protected
   */
  protected getComponentsSettingsProps(): ITextAreaProps {
    return PropsUtils.mergeWithSystemProps(
      super.getComponentsSettingsProps(),
      this.componentsSettings.textarea
    );
  }
}
