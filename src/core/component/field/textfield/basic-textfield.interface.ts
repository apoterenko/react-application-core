import { IField, IFieldInternalState, IFieldInternalProps } from '../field';
import { IDelayedChangesFieldPluginProps } from '../field';
import { IFieldActionConfiguration } from '../../../configurations-definitions.interface';

export interface IBasicTextFieldInternalState extends IFieldInternalState {
  keyboard?: boolean;
}

export interface IBasicTextFieldInternalProps
    extends IFieldInternalProps, IDelayedChangesFieldPluginProps {
  actions?: IFieldActionConfiguration[];
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
