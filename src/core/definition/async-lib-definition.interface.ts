import {
  ACTION_PREFIX,
  IAliasWrapper,
  IAsyncLibsWrapper,
  IDataWrapper,
  ILoadingWrapper,
  IUrlWrapper,
} from '../definitions.interface';

/**
 * @stable [09.01.2020]
 */
export enum AsyncLibsEnum {
  GOOGLE_MAPS = '$$GOOGLE_MAPS',
}

/**
 * @stable [09.01.2020]
 */
export interface IAsyncLibPayloadEntity
  extends IAliasWrapper {
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
 * @stable [09.01.2020]
 */
export interface IAsyncLibManager {
  cancelWaiting<TPromise>(promise: TPromise): boolean;
  loadLib(cfg: IAsyncLibConfigEntity): Promise<HTMLScriptElement>;
  registerLib(cfg: IAsyncLibConfigEntity): void;
  waitForLib<TPromise>(cfg: IAsyncLibConfigEntity): TPromise;
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
export interface IReduxHolderAsyncLibsEntity<TEntity = IReduxAsyncLibsEntity>
  extends IAsyncLibsWrapper<TEntity> {
}

/**
 * @stable [08.01.2020]
 */
export const INITIAL_ASYNC_LIBS_ENTITY = Object.freeze<IReduxAsyncLibsEntity>({});

/**
 * @stable [08.01.2020]
 */
export const $RAC_ASYNC_LIB_LOAD_ACTION_TYPE = `${ACTION_PREFIX}async.lib.load`;
export const $RAC_ASYNC_LIB_LOAD_DONE_ACTION_TYPE = `${ACTION_PREFIX}async.lib.load.done`;
