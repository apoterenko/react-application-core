import * as React from 'react';

import { BaseSelect } from '../select';
import {
  IRadioGroupProps,
  RadioGroupClassesEnum,
} from '../../../definition';
import {
  ClsUtils,
  PropsUtils,
} from '../../../util';
import { Radio } from '../checkbox';

/**
 * @component-impl
 * @stable [22.12.2020]
 */
export class RadioGroup extends BaseSelect<IRadioGroupProps> {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<IRadioGroupProps>({
    fieldRendered: false,
  }, BaseSelect);

  /**
   * @stable [22.12.2020]
   * @protected
   */
  protected get inputAttachmentElement(): JSX.Element {
    return this.getSelfFieldWrapper(this.labelElement);
  }

  /**
   * @stable [22.12.2020]
   * @protected
   */
  protected get attachmentBodyElement(): JSX.Element {
    const {
      disabled,
      readOnly,
    } = this.originalProps;
    const options = this.options;
    const id = this.fromSelectValueToId(this.value);

    return (
      <React.Fragment>
        {options.map((option, index) => (
          <Radio
            key={`radio-option-${index}`}
            value={this.fromSelectValueToId(option) === id}
            label={this.fieldConverter.fromSelectValueToDisplayValue(option) as string}
            errorMessageRendered={false}
            disabled={disabled}
            readOnly={readOnly}
            onChange={() => this.onSelect(option)}/>
        ))}
      </React.Fragment>
    );
  }

  /**
   * @stable [22.12.2020]
   * @protected
   */
  protected getFieldClassName(): string {
    return ClsUtils.joinClassName(super.getFieldClassName(), RadioGroupClassesEnum.RADIO_GROUP);
  }

  /**
   * @stable [22.12.2020]
   * @protected
   */
  protected get baseTextFieldClassName(): string {
    return null;
  }
}
