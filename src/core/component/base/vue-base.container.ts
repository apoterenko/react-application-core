import Vue from 'vue';
import { Prop } from 'vue-property-decorator';
import { Store } from 'redux';

import { IVueContainerEntity } from '../../vue-entities-definitions.interface';
import { FormActionBuilder } from '../form/form-action.builder';
import { lazyInject, DI_TYPES } from '../../di';

export class VueBaseContainer extends Vue implements IVueContainerEntity<any> { // TODO
  public sectionName: string;

  @Prop() public appState: any;
  @lazyInject(DI_TYPES.Store) protected store: Store<any>;

  protected dispatchFormChanges(fieldName: string, value: string) {
    this.store.dispatch({
      type: FormActionBuilder.buildChangeActionType(this.sectionName),
      data: {section: this.sectionName, fields: [{name: fieldName, value}]},
    });
  }
}
