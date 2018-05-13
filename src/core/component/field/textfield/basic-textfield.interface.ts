import {
  ITypeWrapper,
  IDisabledWrapper,
  BasicEventT,
  IStringTitleWrapper,
  IClassNameWrapper,
} from '../../../definitions.interface';

import { IField, IFieldInternalState, IFieldInternalProps } from '../field';
import { IDelayedChangesFieldPluginProps } from '../field';

export interface IBasicTextFieldAction extends IClassNameWrapper,
                                               IStringTitleWrapper,
                                               IDisabledWrapper,
                                               ITypeWrapper {
  actionHandler?(event: BasicEventT): void;
}

export interface IBasicTextFieldInternalState extends IFieldInternalState {
  keyboard?: boolean;
}

export interface IBasicTextFieldInternalProps
    extends IFieldInternalProps, IDelayedChangesFieldPluginProps {
  actions?: IBasicTextFieldAction[];
  actionsPosition?: ActionPositionEnum;
  clearAction?: boolean;
}

export interface IBasicTextField<TInternalProps extends IBasicTextFieldInternalProps,
                                 TInternalState extends IBasicTextFieldInternalState>
    extends IField<TInternalProps,
                   TInternalState> {
}

export enum ActionPositionEnum {
  LEFT,
  RIGHT,
}
