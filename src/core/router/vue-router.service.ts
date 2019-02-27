import { Store } from 'redux';
import { injectable } from 'inversify';

import { isFn } from '../util';
import { ENV } from '../env';
import { DI_TYPES, lazyInject } from '../di';
import { ApplicationActionBuilder } from '../component/application/application-action.builder';

@injectable()
export class VueRouter { // TODO implements contract

  @lazyInject(DI_TYPES.Store) private store: Store<{}>;

  /**
   * @stable [23.10.2018]
   */
  constructor() {
    const prevOnPopState = window.onpopstate;
    window.onpopstate = () => {
      if (isFn(prevOnPopState)) {
        prevOnPopState.call(window);
      }
      this.dispatchPathAction(location.pathname);
    };
  }

  /**
   * @stable [23.10.2018]
   * @param path
   */
  public push(path: string): void {
    const fullPath = ENV.buildAppPath(path);
    history.pushState({}, fullPath, fullPath);
    this.dispatchPathAction(path);
  }

  public replace(path: string): void {
    const fullPath = ENV.buildAppPath(path);
    history.replaceState({}, fullPath, fullPath);
    this.dispatchPathAction(path);
  }

  public go(delta?: number) {
    history.go(delta);
  }

  /**
   * @stable [23.10.2018]
   */
  public goBack() {
    this.go(-1);
  }

  /**
   * @stable [23.10.2018]
   * @param {string} data
   */
  private dispatchPathAction(data: string): void {
    this.store.dispatch({type: ApplicationActionBuilder.buildPathActionType(), data});
  }
}
