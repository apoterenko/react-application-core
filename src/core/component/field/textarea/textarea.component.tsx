import * as React from 'react';

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

  protected getInputWrapperClassName(): string {
    return toClassName(
        super.getInputWrapperClassName(),
        this.uiFactory.textFieldTextArea
    );
  }
}
