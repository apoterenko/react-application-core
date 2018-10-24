import Vue from 'vue';
import { VNode, VNodeData, VueConstructor } from 'vue';
import { ComponentOptions, Accessors } from 'vue/types/options';
import { CreateElement } from 'vue/types';

import { AnyT } from './definitions.interface';

/**
 * @stable [21.10.2018]
 */
export const VUE_TYPE$_FIELD = 'type$';
export const VUE_VALUE$_FIELD = 'value$';

/**
 * @stable [21.10.2018]
 */
export interface IVueType$Wrapper<TType$ = string> {
  type$?: TType$;
}

/**
 * @stable [21.10.2018]
 */
export interface IVueValue$Wrapper<TValue$ = AnyT> {
  value$?: TValue$;
}

/**
 * @stable [21.10.2018]
 */
export interface IVueIsContainer$Wrapper {
  isContainer$?: boolean;
}

/**
 * @stable [21.10.2018]
 */
export interface IVueParentContainer$Wrapper<TParentContainer$> {
  parentContainer$?: TParentContainer$;
}

/**
 * @stable [21.10.2018]
 */
export interface IVueState$Wrapper<TState$> {
  state$?: TState$;
}

/**
 * @stable [21.10.2018]
 */
export interface IVueSection$Wrapper {
  section$?: string;
}

/**
 * @stable [23.10.2018]
 */
export interface IVueForceUpdateOnChangeData$Wrapper<TForceUpdateOnChangeData$> {
  forceUpdateOnChangeData$?: TForceUpdateOnChangeData$;
}

/**
 * @stable [22.10.2018]
 */
export interface IVueStore$Wrapper<TStore$> {
  store$?: TStore$;
}

/**
 * @stable [21.10.2018]
 */
export interface IVueCustomComputed$Wrapper<TCustomComputed$> {
  customComputed$?: TCustomComputed$;
}

/**
 * @stable [21.10.2018]
 */
export type VueCreateElementFactoryT = CreateElement;

/**
 * @stable [21.10.2018]
 */
export type VueComponentOptionsT<TComponent extends Vue = Vue> = ComponentOptions<TComponent>;

/**
 * @stable [21.10.2018]
 */
export type VueAccessorsT<TAccessors = AnyT> = Accessors<TAccessors>;

/**
 * @stable [22.10.2018]
 */
export type VueConstructorT = VueConstructor;

/**
 * @stable [21.10.2018]
 */
export type VueNodeT = VNode;

/**
 * @stable [24.10.2018]
 */
export type VNodeDataT = VNodeData;
