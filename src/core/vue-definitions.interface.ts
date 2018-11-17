import Vue from 'vue';
import { VNode, VNodeData, VueConstructor } from 'vue';
import { ComponentOptions, Accessors, DefaultMethods } from 'vue/types/options';
import { CreateElement } from 'vue/types';

import { AnyT } from './definitions.interface';

/**
 * @stable [16.11.2018]
 */
export interface IVueOnMount$Wrapper {
  onMount$?(): void;
}

/**
 * @stable [11.11.2018]
 */
export interface IVueEvents$Wrapper<TEvents$ = AnyT> {
  events$?: TEvents$;
}

/**
 * @stable [11.11.2018]
 */
export interface IVueRenderer$Wrapper<TRenderer$> {
  renderer$?: TRenderer$;
}

/**
 * @stable [11.11.2018]
 */
export interface IVueName$Wrapper<TName$ = string> {
  name$?: TName$;
}

/**
 * @stable [11.11.2018]
 */
export interface IVueStyle$Wrapper<TStyle$ = string> {
  style$?: TStyle$;
}

/**
 * @stable [11.11.2018]
 */
export interface IVueBindings$Wrapper<TBindings$ = AnyT> {
  bindings$?: TBindings$;
}

/**
 * @stable [11.11.2018]
 */
export interface IVueComponent$Wrapper<TComponent$ = string> {
  component$?: TComponent$;
}

/**
 * @stable [21.10.2018]
 */
export interface IVueValue$Wrapper<TValue$ = AnyT> {
  value$?: TValue$;
}

/**
 * @stable [17.11.2018]
 */
export interface IVueOptions$Wrapper<TOptions$ = AnyT> {
  options$?: TOptions$;
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
 * @stable [17.11.2018]
 */
export type VueDefaultMethodsT = DefaultMethods<AnyT>;

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

/**
 * @stable [17.11.2018]
 */
export interface IVueRefs {
  [key: string]: Vue | Element | Vue[] | Element[];
}
