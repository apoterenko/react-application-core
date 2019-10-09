import Vue from 'vue';
import { Store } from 'redux';

import { applySection } from '../../util';
import { lazyInject, DI_TYPES } from '../../di';
import { TranslatorT } from '../../translation';
import {
  AnyT,
  IKeyValue,
  IEntity,
  ACTION_PREFIX,
} from '../../definitions.interface';
import {
  INavigateEntity,
  ROUTER_BACK_ACTION_TYPE,
  ROUTER_NAVIGATE_ACTION_TYPE,
} from '../../definition';
import { DictionariesActionBuilder } from '../../dictionary';
import {
  IVueApplicationStoreEntity,
  IVueContainer,
} from '../../vue-entities-definitions.interface';
import { FormActionBuilder } from '../form/vue-index';
import { ListActionBuilder } from '../list/vue-index';

export class VueBaseContainer<TState = IKeyValue> extends Vue implements IVueContainer {
  public sectionName: string;
  @lazyInject(DI_TYPES.Store) public store$: Store<IVueApplicationStoreEntity>;
  @lazyInject(DI_TYPES.Translate) protected t: TranslatorT;

  /**
   * @stable [21.10.2018]
   * @returns {IVueApplicationStoreEntity}
   */
  public get state$(): IVueApplicationStoreEntity {
    return this.store$.getState();
  }

  /**
   * @stable [21.10.2018]
   * @param {string} type
   * @param {AnyT} data
   */
  public dispatchCustomType<TData = IKeyValue>(type: string, data?: TData): void {
    this.store$.dispatch({type, data});
  }

  /**
   * @stable [18.11.2018]
   * @param {string} type
   * @param {TChanges} data
   */
  public dispatch<TChanges = IKeyValue>(type: string, data?: TChanges): void {
    this.dispatchCustomType(`${this.sectionName}.${type}`, applySection(this.sectionName, data));
  }

  /**
   * @stable [24.02.2019]
   * @param {string} type
   * @param {TData} data
   * @param {string} otherSection
   */
  public dispatchFrameworkAction<TData = IKeyValue>(type: string, data?: TData, otherSection?: string): void {
    const section = otherSection || this.sectionName;
    this.dispatchCustomType(`${ACTION_PREFIX}${section}.${type}`, applySection(section, data));
  }

  /**
   * @stable [24.02.2019]
   * @param {TChanges} changes
   * @param {string} otherSection
   */
  public dispatchFormChanges<TChanges = IKeyValue>(changes: TChanges, otherSection?: string): void {
    this.store$.dispatch(FormActionBuilder.buildChangesPlainAction(otherSection || this.sectionName, changes));
  }

  /**
   * @stable [24.02.2019]
   * @param {string} fieldName
   * @param {AnyT} fieldValue
   * @param {string} otherSection
   */
  public dispatchFormChange(fieldName: string, fieldValue?: AnyT, otherSection?: string): void {
    this.store$.dispatch(FormActionBuilder.buildChangePlainAction(otherSection || this.sectionName, fieldName, fieldValue));
  }

  /**
   * @stable [19.11.2018]
   */
  public dispatchFormSubmit(): void {
    this.dispatchCustomType(FormActionBuilder.buildSubmitActionType(this.sectionName), applySection(this.sectionName));
  }

  /**
   * @stable [18.11.2018]
   * @param {string} dictionary
   * @param {TData} data
   */
  public dispatchLoadDictionary<TData = IKeyValue>(dictionary: string, data?: TData): void {
    this.dispatchCustomType(DictionariesActionBuilder.buildLoadActionType(dictionary), applySection(dictionary, data));
  }

  /**
   * @stable [20.01.2019]
   */
  public dispatchListCreate(): void {
    this.store$.dispatch(ListActionBuilder.buildCreateSimpleAction(this.sectionName));
  }

  /**
   * @stable [29.01.2019]
   * @returns {TState}
   */
  protected getData(): TState {
    return this.$data as TState;
  }

  /**
   * @stable [25.10.2018]
   */
  protected navigateToBack(): void {
    this.dispatchCustomType(ROUTER_BACK_ACTION_TYPE);
  }

  /**
   * @stable [08.12.2018]
   * @param {IEntity} entity
   */
  protected dispatchListSelect(entity: IEntity): void {
    this.store$.dispatch(ListActionBuilder.buildSelectSimpleAction(this.sectionName, {selected: entity}));
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
   * @stable [17.11.2018]
   * @returns {VueBaseContainer}
   */
  protected getSelf(): VueBaseContainer {
    return this;
  }
}
