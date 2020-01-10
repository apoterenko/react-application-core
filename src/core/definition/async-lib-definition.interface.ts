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
 * @stable [09.01.2020]
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
 * @stable [08.01.2020]
 */
export interface IAsyncLibEntity
  extends IDataWrapper<boolean>,
    ILoadingWrapper {
}

/**
 * @stable [08.01.2020]
 */
export interface IAsyncLibsEntity {
  [alias: string]: IAsyncLibEntity;
}

/**
 * @stable [10.01.2020]
 */
export interface IAsyncLibsWrapperEntity
  extends IAsyncLibsWrapper<IAsyncLibsEntity> {
}

/**
 * @stable [08.01.2020]
 */
export const INITIAL_ASYNC_LIBS_ENTITY = Object.freeze<IAsyncLibsEntity>({});

/**
 * @stable [08.01.2020]
 */
export const $RAC_ASYNC_LIB_LOAD_ACTION_TYPE = `${ACTION_PREFIX}async.lib.load`;
export const $RAC_ASYNC_LIB_LOAD_DONE_ACTION_TYPE = `${ACTION_PREFIX}async.lib.load.done`;
