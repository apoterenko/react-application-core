import { IEffectsAction } from 'redux-effects-promise';

import {
  AnyT,
  ICustomActionsWrapper,
  IDestroyWrapper,
  IFormsSectionsWrapper,
  IInitialStateWrapper,
  IListsSectionsWrapper,
  INextFormChangesWrapper,
  INextFormRouteWrapper,
  INextFormSectionWrapper,
  INextListSectionWrapper,
  IPreviousFormSectionWrapper,
  IReplaceRouteWrapper,
  ISectionNameWrapper,
  ISelectWrapper,
  ITypeWrapper,
  IUpdateWrapper,
} from '../definitions.interface';

/**
 * @stable [26.08.2019]
 */
export interface IEntityReducerFactoryConfigEntity
  extends IUpdateWrapper<string>,
    ISelectWrapper<string>,
    IDestroyWrapper<string>,
    IInitialStateWrapper<AnyT> {
}

/**
 * @stable [26.08.2019]
 */
export interface IEntityActionBuilder {
  buildUpdateAction(updated: AnyT): IEffectsAction;
  buildSelectAction(selected: AnyT): IEffectsAction;
}

/**
 * @stable [27.08.2019]
 */
export enum DestroyedContainerTypesEnum {
  LIST,
  FORM,
}

/**
 * @stable [27.08.2019]
 */
export interface IDestroyedContainerMiddlewareConfigEntity
  extends ISectionNameWrapper,
    ITypeWrapper<DestroyedContainerTypesEnum>,
    IListsSectionsWrapper<string[]>,
    IFormsSectionsWrapper<string[]>,
    ICustomActionsWrapper<string[]> {
}

/**
 * @stable [28.08.2019]
 */
export interface IChainedFormMiddlewareConfigEntity<TChanges>
  extends INextFormSectionWrapper,
    IPreviousFormSectionWrapper,
    INextFormChangesWrapper<TChanges>,
    INextFormRouteWrapper,
    INextListSectionWrapper,
    IReplaceRouteWrapper {
}
