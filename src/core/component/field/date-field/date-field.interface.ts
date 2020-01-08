import { CSSProperties, Component } from 'react';

import {
  IBaseTextFieldProps,
  IBaseTextFieldState,
} from '../textfield/base-textfield.interface';
import {
  ICurrentTimeWrapper,
  IDialogOpenedWrapper,
} from '../../../definitions.interface';
import { IGenericDateFieldEntity } from '../../../definition';

export interface IDateFieldProps
  extends IBaseTextFieldProps,
    IGenericDateFieldEntity {
}

export interface IDateFieldState
  extends IBaseTextFieldState,
    ICurrentTimeWrapper<Date>,
    IDialogOpenedWrapper {
  year?: number; // TODO
  date?: Date;
}
