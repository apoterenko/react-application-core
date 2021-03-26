import {
  ACTION_PREFIX,
  IAliasWrapper,
  IAsyncLibsWrapper,
  IDataWrapper,
  ILoadingWrapper,
  IUrlWrapper,
} from '../definitions.interface';
import { IFluxEntity } from './flux-definition.interface';

/**
 * @enum
 * @stable [26.03.2021]
 */
export enum AsyncLibsEnum {
  GOOGLE_MAPS = '$$GOOGLE_MAPS',
  UNLAYER = '$$UNLAYER',
}

/**
 * @entity
 * @stable [26.03.2021]
 */
export interface IAsyncLibEntity
  extends IAliasWrapper {
}

/**
 * @flux-entity
 * @stable [26.03.2021]
 */
export interface IAsyncLibFluxEntity
  extends IFluxEntity<IAsyncLibEntity> {
}

/**
 * @config-entity
 * @stable [08.06.2020]
 */
export interface IAsyncLibConfigEntity
  extends IAliasWrapper,
    IUrlWrapper {
}

/**
 * @service
 * @stable [08.06.2020]
 */
export interface IAsyncLibManager<TPromise extends Promise<HTMLScriptElement> = Promise<HTMLScriptElement>> {
  cancelWaiting(promise: TPromise): boolean;
  loadLib(cfg: IAsyncLibConfigEntity): Promise<HTMLScriptElement>;
  registerLib(cfg: IAsyncLibConfigEntity): void;
  waitForLib(cfg: IAsyncLibConfigEntity): TPromise;
}

/**
 * @redux-entity
 * @stable [08.06.2020]
 */
export interface IReduxAsyncLibEntity
  extends IDataWrapper<boolean>,
    ILoadingWrapper {
}

/**
 * @redux-entity
 * @stable [08.06.2020]
 */
export interface IReduxAsyncLibsEntity {
  [alias: string]: IReduxAsyncLibEntity;
}

/**
 * @redux-holder-entity
 * @stable [08.06.2020]
 */
export interface IReduxAsyncLibsHolderEntity<TEntity = IReduxAsyncLibsEntity>
  extends IAsyncLibsWrapper<TEntity> {
}

/**
 * @initial-redux-entity
 * @stable [31.07.2020]
 */
export const INITIAL_REDUX_ASYNC_LIBS_ENTITY = Object.freeze<IReduxAsyncLibsEntity>({});

/**
 * @stable [08.01.2020]
 */
export const $RAC_ASYNC_LIB_LOAD_ACTION_TYPE = `${ACTION_PREFIX}async.lib.load`;
export const $RAC_ASYNC_LIB_LOAD_DONE_ACTION_TYPE = `${ACTION_PREFIX}async.lib.load.done`;
