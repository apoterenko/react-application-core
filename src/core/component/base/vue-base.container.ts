import Vue from 'vue';
import { Store } from 'redux';

import { applySection } from '../../util';
import { lazyInject, DI_TYPES } from '../../di';
import { ApplicationTranslatorT } from '../../translation';
import {
  AnyT,
  IKeyValue,
  IEntity,
  ISelectedEntityWrapper,
} from '../../definitions.interface';
import { INavigateEntity } from '../../entities-definitions.interface';
import {
  IVueApplicationStoreEntity,
  IVueContainer,
} from '../../vue-entities-definitions.interface';
import { FormActionBuilder } from '../form/vue-index';
import {
  LIST_CREATE_ACTION_TYPE,
  LIST_SELECT_ACTION_TYPE,
} from '../list/vue-index';
import { ROUTER_BACK_ACTION_TYPE, ROUTER_NAVIGATE_ACTION_TYPE } from '../../router/vue-index';

export class VueBaseContainer extends Vue implements IVueContainer {

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
   * @stable [13.11.2018]
   * @param {TChanges} changes
   */
  public dispatchFormChanges<TChanges = IKeyValue>(changes: TChanges): void {
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

  /**
   * @stable [25.10.2018]
   */
  protected navigateToBack(): void {
    this.dispatchCustomType(ROUTER_BACK_ACTION_TYPE);
  }

  /**
   * @stable [25.10.2018]
   */
  protected dispatchListCreate(): void {
    this.dispatch(LIST_CREATE_ACTION_TYPE);
  }

  /**
   * @stable [25.10.2018]
   * @param {IEntity} entity
   */
  protected dispatchListSelect(entity: IEntity): void {
    const payload: ISelectedEntityWrapper = {selected: entity};
    this.dispatch(LIST_SELECT_ACTION_TYPE, payload);
  }

  /**
   * @stable [25.10.2018]
   * @param {TPath0} path
   * @param {TState0} state
   */
  protected navigate<TPath0, TState0>(path: TPath0, state?: TState0): void {
    const payload: INavigateEntity<TPath0, TState0> = { path, state };
    this.dispatchCustomType(ROUTER_NAVIGATE_ACTION_TYPE, payload);
  }

  /**
   * @stable [11.11.2018]
   * @returns {this}
   */
  private get self(): VueBaseContainer {
    return this;
  }
}
