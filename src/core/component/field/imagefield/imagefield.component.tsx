import * as React from 'react';

import { BasicEventT } from '../../../definition.interface';
import { Field, IFieldInputProps } from '../../field';
import { CenterLayout } from '../../layout';
import { toClassName } from '../../../util';
import {
  IImageFieldInternalState,
  IImageFieldInternalProps,
} from './imagefield.interface';

export class ImageField extends Field<ImageField,
                                      IImageFieldInternalProps,
                                      IImageFieldInternalState> {

  public render(): JSX.Element {
    const props = this.props;

    return (
      <div className={this.getFieldClassName()}>
        <CenterLayout ref='self'
                      className='rac-image-field'>
          {this.getComponent()}
          <img className={toClassName(
                  !props.value && 'rac-image-empty',
                  props.value && 'rac-image'
                )}
               style={props.style}
               src={props.value}/>
        </CenterLayout>
      </div>
    );
  }

  protected getComponentProps(): IFieldInputProps {
    return {
      ...super.getComponentProps() as IFieldInputProps,
      type: 'hidden',
    };
  }
}
