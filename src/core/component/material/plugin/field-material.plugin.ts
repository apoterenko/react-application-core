import { sequence } from '../../../util';
import { IMaterialComponentFactory, INativeMaterialComponent } from '../../../component/material';
import { FieldT } from '../../../component/field';
import { MaterialPlugin } from './material.plugin';

export class FieldMaterialPlugin
    extends MaterialPlugin<FieldT, INativeMaterialComponent> {

  constructor(field: FieldT,
              mdcFactory: IMaterialComponentFactory<INativeMaterialComponent>) {
    super(field, mdcFactory);
    field.resetError = sequence(field.resetError, this.onResetError, this);
  }

  private onResetError() {
    this.mdc.getDefaultFoundation().setValid(true);
  }
}
