import { IFieldInternalState, IFieldInternalProps } from 'core/component/field/field';
import { INativeMaterialComponent } from 'core/component/material';

export interface ICheckboxInternalState extends IFieldInternalState {
}

export interface ICheckboxInternalProps extends IFieldInternalProps {
}

export interface INativeMaterialCheckboxComponent extends INativeMaterialComponent {
  checked: boolean;
}
