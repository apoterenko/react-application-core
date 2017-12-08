import {
  IStylizable,
  ITitleable,
  ITypeable,
  IDisableable,
  BasicEventT,
} from '../../../definition.interface';

import { IField, IFieldInternalState, IFieldInternalProps } from '../field';
import { IDelayedChangesFieldPluginInternalProps } from '../field';

export interface IBasicTextFieldAction extends IStylizable,
                                               ITitleable,
                                               IDisableable,
                                               ITypeable<string> {
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
