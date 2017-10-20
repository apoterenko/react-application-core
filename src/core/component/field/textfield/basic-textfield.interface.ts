import {
  ChangeEventT,
  IStylizable,
  ITitleable,
  ITypeable,
  IDisableable,
} from '../../../definition.interface';
import { FunctionT } from '../../../util';
import { INativeMaterialComponent } from '../../../component/material';

import { IField, IFieldInternalState, IFieldInternalProps } from '../field/field.interface';
import { IDelayedChangesFieldPluginInternalProps } from '../field/plugin';

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
                   TInternalState,
                   ChangeEventT> {
}

export interface INativeMaterialBasicTextFieldComponent extends INativeMaterialComponent {
  setValid(valid: boolean): void;
}

export enum ActionPositionEnum {
  LEFT,
  RIGHT,
}
