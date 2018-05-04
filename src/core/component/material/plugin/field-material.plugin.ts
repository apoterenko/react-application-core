import { sequence } from '../../../util';
import { IMaterialComponentFactory, INativeMaterialComponent } from '../../../component/material';
import { IField } from '../../../component/field';
import { MaterialPlugin } from './material.plugin';

export class FieldMaterialPlugin<TField extends IField,
                                 TNativeMaterialComponent extends INativeMaterialComponent>
    extends MaterialPlugin<TField, TNativeMaterialComponent> {

  constructor(field: TField,
              mdcFactory: IMaterialComponentFactory<TNativeMaterialComponent>) {
    super(field, mdcFactory);
    field.resetError = sequence(field.resetError, this.onResetError, this);
  }

  private onResetError() {
    this.mdc.foundation_.setValid(true);
  }
}
