import * as React from 'react';

import { isDef, toClassName, orNull } from '../../../util';
import { ITextArea, ITextAreaInternalProps, ITextAreaInternalState } from './textarea.interface';
import { BasicTextField } from '../textfield';
import { IFieldTextAreaProps } from '../field';

export class TextArea extends BasicTextField<TextArea,
                                             ITextAreaInternalProps,
                                             ITextAreaInternalState>
    implements ITextArea {

  public static defaultProps: ITextAreaInternalProps = {
    clearActionRendered: false,
  };

  protected getInputElement(): JSX.Element {
    return <textarea {...this.getInputElementProps() as IFieldTextAreaProps}/>;
  }

  /**
   * @inheritDoc
   */
  protected getInputAttachmentElement(): JSX.Element {
    return orNull(
      isDef(this.props.maxLength),
      () => (
        <label className='rac-textarea-length-label'>
          {this.definiteValue.length} {this.t('of')} {this.props.maxLength}
        </label>
      )
    );
  }

  /**
   * @stable [07.11.2018]
   * @returns {string}
   */
  protected getSelfElementClassName(): string {
    return `${super.getSelfElementClassName()} rac-textarea-field`;
  }
}
