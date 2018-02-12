import * as React from 'react';

import { Field, IFieldInputProps, IMultiEntity } from '../../field';
import { CenterLayout } from '../../layout';
import { Picture } from '../../picture';
import { isPrimitive, orNull } from '../../../util';
import {
  IImageFieldInternalState,
  IImageFieldInternalProps,
} from './imagefield.interface';

export class ImageField extends Field<ImageField,
                                      IImageFieldInternalProps,
                                      IImageFieldInternalState> {

  public render(): JSX.Element {
    return (
      <div className={this.getFieldClassName()}>
        <CenterLayout ref='self'
                      className='rac-image-field'>
          {this.getComponent()}
          <Picture src={this.src}/>
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

  private get src(): string {
    const value = this.props.value;
    if (!value) {
      return null;
    }
    if (isPrimitive(value)) {
      return value;
    }
    const valueAsMultiEntity = value as IMultiEntity;
    const add = valueAsMultiEntity.add;
    return orNull(add.length, () => add[0].id as string);
  }
}
