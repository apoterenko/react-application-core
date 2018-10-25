import Vue from 'vue';
import { Store } from 'redux';

import { applySection } from '../../util';
import { FormActionBuilder } from '../form/form-action.builder';
import { lazyInject, DI_TYPES } from '../../di';
import { AnyT, IKeyValue } from '../../definitions.interface';
import {
  IVueApplicationStoreEntity,
  IVueComponent,
  IVueContainer,
} from '../../vue-entities-definitions.interface';
import { ROUTER_BACK_ACTION_TYPE } from '../../router/vue-index';
import { ApplicationTranslatorT } from '../../translation';

export class VueBaseContainer<TVueComponent extends IVueComponent = IVueComponent>
  extends Vue implements IVueContainer {

  public section$: string;
  @lazyInject(DI_TYPES.Store) public store$: Store<IVueApplicationStoreEntity>;
  @lazyInject(DI_TYPES.Translate) protected t: ApplicationTranslatorT;

  /**
   * @stable [21.10.2018]
   * @returns {IVueApplicationStoreEntity}
   */
  public get state$(): IVueApplicationStoreEntity {
    return this.store$.getState();
  }

  /**
   * @stable [25.10.2018]
   * @param {IKeyValue} changes
   */
  protected dispatchFormChanges(changes: IKeyValue): void {
    this.store$.dispatch(FormActionBuilder.buildChangesSimpleAction(this.section$, changes));
  }

  protected dispatch(type: string, data?: IKeyValue): void {
    this.dispatchCustomType(`${this.section$}.${type}`, applySection(this.section$, data));
  }

  /**
   * @stable [21.10.2018]
   * @param {string} type
   * @param {AnyT} data
   */
  protected dispatchCustomType(type: string, data?: AnyT): void {
    this.store$.dispatch({type, data});
  }

  protected navigateToBack(): void {
    this.dispatchCustomType(ROUTER_BACK_ACTION_TYPE);
  }

  /**
   * @stable [21.10.2018]
   * @returns {TVueComponent}
   */
  protected get vueComponent(): TVueComponent {
    return this.$vnode.componentInstance as TVueComponent;
  }
}
