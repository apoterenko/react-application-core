import * as React from 'react';

import { isDef, toClassName, orNull } from '../../../util';
import { ITextAreaInternalProps, ITextAreaInternalState } from './textarea.interface';
import { BaseTextField } from '../text-field';
import { IFieldTextAreaAttributes } from '../../../definition';

export class TextArea extends BaseTextField<ITextAreaInternalProps,
                                             ITextAreaInternalState> {

  public static defaultProps: ITextAreaInternalProps = {
    clearActionRendered: false,
  };

  protected getInputElement(): JSX.Element {
    return <textarea {...this.getInputElementProps() as IFieldTextAreaAttributes}/>;
  }

  /**
   * @inheritDoc
   */
  protected get inputAttachmentElement(): JSX.Element {
    return orNull(
      isDef(this.props.maxLength),
      () => (
        <label className='rac-text-area-length-label'>
          {(this.value || '').length} {this.t('of')} {this.props.maxLength}
        </label>
      )
    );
  }

  /**
   * @stable [22.11.2018]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return toClassName(super.getFieldClassName(), 'rac-text-area');
  }
}
