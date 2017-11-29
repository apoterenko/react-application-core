import {
  IStylizable,
  ITitleable,
  ITypeable,
  IDisableable,
} from '../../../definition.interface';
import { FunctionT } from '../../../util';

import { IField, IFieldInternalState, IFieldInternalProps } from '../field';
import { IDelayedChangesFieldPluginInternalProps } from '../field';

export interface IBasicTextFieldAction extends IStylizable,
                                               ITitleable,
                                               IDisableable,
                                               ITypeable<string> {
  actionHandler: FunctionT;
}

export interface IBasicTextFieldInternalState extends IFieldInternalState {
}

export interface IBasicTextFieldInternalProps
    extends IFieldInternalProps, IDelayedChangesFieldPluginInternalProps {
  actions?: IBasicTextFieldAction[];
  actionsPosition?: ActionPositionEnum;
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
