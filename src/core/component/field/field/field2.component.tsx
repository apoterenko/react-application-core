import * as React from 'react';

import {
  joinClassName,
  PropsUtils,
} from '../../../util';
import {
  ComponentClassesEnum,
  IField,
  IFieldState,
} from '../../../definition';
import { IFieldProps2 } from '../../../configurations-definitions.interface';
import { Field } from './field.component';

export class Field2<TProps extends IFieldProps2,
                   TState extends IFieldState = IFieldState>
    extends Field<TProps,
                           TState>
    implements IField<TProps, TState> {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<IFieldProps2>({}, Field);

  /**
   * @stable [06.10.2018]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    const props = this.props;

    return joinClassName(
      super.getFieldClassName(),
      props.full && ComponentClassesEnum.FLEX_X1, // TODO full-field
    );
  }
}
