import {
  IStringTypeWrapper,
  IDisabledWrapper,
  BasicEventT,
  IStringTitleWrapper,
  IClassNameWrapper,
} from '../../../definitions.interface';

import { IField, IFieldInternalState, IFieldInternalProps } from '../field';
import { IDelayedChangesFieldPluginInternalProps } from '../field';

export interface IBasicTextFieldAction extends IClassNameWrapper,
                                               IStringTitleWrapper,
                                               IDisabledWrapper,
                                               IStringTypeWrapper {
  actionHandler?(event: BasicEventT): void;
}

export interface IBasicTextFieldInternalState extends IFieldInternalState {
}

export interface IBasicTextFieldInternalProps
    extends IFieldInternalProps, IDelayedChangesFieldPluginInternalProps {
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
