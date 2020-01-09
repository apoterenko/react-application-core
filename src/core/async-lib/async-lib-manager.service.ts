import * as R from 'ramda';
import * as BPromise from 'bluebird';
import { Store } from 'redux';
import { injectable } from 'inversify';

import {
  DI_TYPES,
  lazyInject,
} from '../di';
import {
  $RAC_ASYNC_LIB_LOAD_ACTION_TYPE,
  $RAC_ASYNC_LIB_LOAD_DONE_ACTION_TYPE,
  IAsyncLibConfigEntity,
  IAsyncLibManager,
  IAsyncLibPayloadEntity,
  IDomAccessor,
  IUniversalStoreEntity,
} from '../definition';
import { ifNilThanValue } from '../util';
import { AnyT } from '../definitions.interface';

@injectable()
export class AsyncLibManager implements IAsyncLibManager {

  @lazyInject(DI_TYPES.DomAccessor) private readonly domAccessor: IDomAccessor;
  @lazyInject(DI_TYPES.Store) private readonly store: Store<IUniversalStoreEntity>;

  private readonly scriptsTasks = new Map<string, Promise<HTMLScriptElement>>();
  private readonly registeredLibs = new Map<string, IAsyncLibConfigEntity>();

  /**
   * @stable [09.01.2020]
   * @param {IAsyncLibConfigEntity} cfg
   */
  public registerLib(cfg: IAsyncLibConfigEntity): void {
    const alias = cfg.alias || cfg.url;
    this.registeredLibs.set(alias, cfg);
  }

  /**
   * @stable [08.01.2020]
   * @param {IAsyncLibConfigEntity} cfg
   * @returns {Promise<HTMLScriptElement>}
   */
  public loadLib(cfg: IAsyncLibConfigEntity): Promise<HTMLScriptElement> {
    const alias = cfg.alias || cfg.url;
    cfg = this.registeredLibs.get(alias) || cfg;

    let task = this.scriptsTasks.get(alias);
    if (R.isNil(task)) {
      const data: IAsyncLibPayloadEntity = {alias};
      this.store.dispatch({type: $RAC_ASYNC_LIB_LOAD_ACTION_TYPE, data});

      this.scriptsTasks.set(
        alias,
        task = this.domAccessor
          .createScript({src: cfg.url})
          .then((el) => {
            this.store.dispatch({type: $RAC_ASYNC_LIB_LOAD_DONE_ACTION_TYPE, data});
            return el;
          })
      );
    }
    return task;
  }

  /**
   * @stable [09.01.2020]
   * @param {IAsyncLibConfigEntity} cfg
   * @returns {Bluebird<HTMLScriptElement>}
   */
  public waitForLib(cfg: IAsyncLibConfigEntity): BPromise<HTMLScriptElement> | AnyT {
    // This new promise may be canceled, but not the original!
    return new BPromise((resolve) => this.loadLib(cfg).then(resolve));
  }

  /**
   * @stable [09.01.2020]
   * @param {Bluebird<HTMLScriptElement>} promise
   */
  public cancelWaiting(promise: BPromise<HTMLScriptElement> | AnyT): void {
    ifNilThanValue(
      promise,
      () => {
        if (promise.isPending()) {
          promise.cancel();
        }
      }
    );
  }
}
