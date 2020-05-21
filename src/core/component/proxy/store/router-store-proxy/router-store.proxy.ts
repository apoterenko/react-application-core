import * as React from 'react';
import * as R from 'ramda';

import { StoreProxy } from '../store.proxy';
import {
  IGenericContainer,
  IGenericContainerProps,
  IGenericStoreEntity,
  IRouterStoreProxy,
  IRouterStoreProxyFactoryConfigEntity,
} from '../../../../definition';
import { RouterActionBuilder } from '../../../../action';
import {
  FilterUtils,
  handlerPropsFactory,
  Selectors,
} from '../../../../util';

export class RouterStoreProxy<TStore extends IGenericStoreEntity = IGenericStoreEntity,
                              TProps extends IGenericContainerProps = IGenericContainerProps>
  extends StoreProxy<TStore, TProps>
  implements IRouterStoreProxy {

  /**
   * @stable [30.03.2020]
   * @param {IGenericContainer<TProps extends IGenericContainerProps>} container
   */
  constructor(readonly container: IGenericContainer<TProps>) {
    super(container);
    this.navigateBack = this.navigateBack.bind(this);
  }

  /**
   * @stable [06.02.2020]
   * @param {string} path
   */
  public navigate(path: string): void {
    this.dispatchPlainAction(RouterActionBuilder.buildNavigatePlainAction(path));
  }

  /**
   * @stable [30.03.2020]
   * @param {string} path
   */
  public rewrite(path: string): void {
    this.dispatchPlainAction(RouterActionBuilder.buildRewritePlainAction(path));
  }

  /**
   * @stable [20.12.2019]
   * @param {number} depth
   */
  public goBack(depth?: number): void {
    this.dispatchPlainAction(RouterActionBuilder.buildNavigateBackPlainAction(depth));
  }

  /**
   * @stable [20.12.2019]
   */
  public navigateBack(): void {
    this.goBack();
  }

  /**
   * @stable [19.12.2019]
   * @param {(cfg: IRouterStoreProxyFactoryConfigEntity) => JSX.Element} factory
   * @returns {React.ReactNode[]}
   */
  public buildNavigationSteps(factory: (cfg: IRouterStoreProxyFactoryConfigEntity) => JSX.Element): React.ReactNode[] {
    const entities = Selectors.stackItemEntities(this.props) || [];
    const length = entities.length;

    return FilterUtils.notNilValuesArrayFilter(
      ...entities.map((item, index) => {
        const last = index === length - 1;
        const stepElement = factory({item, first: index === 0, last});
        if (R.isNil(stepElement)) {
          return null;
        }
        return React.cloneElement(stepElement, {
          key: item.url,
          ...(
            last
              ? {}
              : handlerPropsFactory(() => this.goBack(length - entities.indexOf(item) - 1), true, false)
          ),
        });
      })
    );
  }
}
