import { INativeMaterialComponent } from '../../../component/material';

import { IFieldInternalState, IFieldInternalProps } from '../field/field.interface';

export interface ICheckboxInternalState extends IFieldInternalState {
}

export interface ICheckboxInternalProps extends IFieldInternalProps {
}

export interface INativeMaterialCheckboxComponent extends INativeMaterialComponent {
  checked: boolean;
}
