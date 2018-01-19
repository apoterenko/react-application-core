import * as React from 'react';

import { isUndef } from '../../../util';
import { toClassName } from '../../../util';
import { ITextArea, ITextAreaInternalProps, ITextAreaInternalState } from './textarea.interface';
import { BasicTextField } from '../textfield';
import { IFieldTextAreaProps } from '../field';

export class TextArea extends BasicTextField<TextArea,
                                             ITextAreaInternalProps,
                                             ITextAreaInternalState>
    implements ITextArea {

  public static defaultProps: ITextAreaInternalProps = {
    clearAction: false,
  };

  protected getComponent(): JSX.Element {
    return <textarea {...this.getComponentProps() as IFieldTextAreaProps}/>;
  }

  protected getComponentAttachment(): JSX.Element {
    return isUndef(this.props.maxLength)
        ? null
        : (
            <label className='rac-textarea-length-label'>
              {this.value.length} {this.t('of')} {this.props.maxLength}
            </label>
        );
  }

  protected getFieldBodyClassName(): string {
    return toClassName(
        super.getFieldBodyClassName(),
        'rac-textarea-field',
        this.uiFactory.textFieldTextArea,
    );
  }
}
