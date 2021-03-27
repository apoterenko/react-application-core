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
  IAsyncLibFluxEntity,
  IAsyncLibManager,
  IDomAccessor,
  IUniversalStoreEntity,
} from '../definition';
import { ConditionUtils } from '../util';

/**
 * @service-impl
 * @stable [26.03.2021]
 */
@injectable()
export class AsyncLibManager implements IAsyncLibManager<BPromise<HTMLScriptElement>> {

  @lazyInject(DI_TYPES.DomAccessor) private readonly domAccessor: IDomAccessor;
  @lazyInject(DI_TYPES.Store) private readonly store: Store<IUniversalStoreEntity>;

  private readonly scriptsTasks = new Map<string, Promise<HTMLScriptElement>>();
  private readonly registeredLibs = new Map<string, IAsyncLibConfigEntity>();

  /**
   * @stable [26.03.2021]
   * @param cfg
   */
  public registerLib(cfg: IAsyncLibConfigEntity): void {
    this.registeredLibs.set(this.asAlias(cfg), cfg);
  }

  /**
   * @stable [26.03.2021]
   * @param cfg
   */
  public loadLib(cfg: IAsyncLibConfigEntity): Promise<HTMLScriptElement> {
    const alias = this.asAlias(cfg);
    cfg = this.registeredLibs.get(alias) || cfg;

    let task = this.scriptsTasks.get(alias);
    if (!R.isNil(task)) {
      return task;
    }

    const data: IAsyncLibFluxEntity = {payload: {alias}};
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
    return task;
  }

  /**
   * @stable [26.03.2021]
   * @param cfg
   */
  public waitForLib(cfg: IAsyncLibConfigEntity): BPromise<HTMLScriptElement> {
    // This new promise may be canceled, but not original!
    return new BPromise((resolve) => this.loadLib(cfg).then(resolve));
  }

  /**
   * @stable [26.03.2021]
   * @param promise
   */
  public cancelWaiting(promise: BPromise<HTMLScriptElement>): boolean {
    return ConditionUtils.ifNotNilThanValue(
      promise,
      () => {
        if (promise.isPending()) {
          promise.cancel();
          return true;
        }
        return false;
      },
      false
    );
  }

  /**
   * @stable [26.03.2021]
   * @param cfg
   */
  private asAlias(cfg: IAsyncLibConfigEntity): string {
    return cfg.alias || cfg.url;
  }
}
