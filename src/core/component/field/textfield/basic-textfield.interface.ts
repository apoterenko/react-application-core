import { ChangeEventT } from 'core/definition.interface';
import { FunctionT } from 'core/util';

import { IField, IFieldInternalState, IFieldInternalProps } from '../field/field.interface';
import { IDelayedChangesFieldPluginInternalProps } from '../field/plugin/delayed-changes-field.interface';

export interface IBasicTextFieldAction {
  type: string;
  actionHandler: FunctionT;
}

export interface IBasicTextFieldInternalState extends IFieldInternalState {
}

export interface IBasicTextFieldInternalProps
    extends IFieldInternalProps, IDelayedChangesFieldPluginInternalProps {
  actions?: IBasicTextFieldAction[];
}

export interface IBasicTextField<TInternalProps extends IBasicTextFieldInternalProps,
                                 TInternalState extends IBasicTextFieldInternalState>
    extends IField<TInternalProps,
                   TInternalState,
                   ChangeEventT> {
}
