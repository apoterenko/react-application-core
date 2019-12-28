import * as React from 'react';
import * as R from 'ramda';

import { BaseStoreProxy } from '../base-store.proxy';
import {
  IRouterStoreProxy,
  IRouterStoreProxyFactoryConfigEntity,
  IUniversalComponentProps,
  IUniversalContainer,
  IUniversalContainerProps,
  IUniversalStoreEntity,
} from '../../../../definition';
import { RouterActionBuilder } from '../../../../action';
import {
  handlerPropsFactory,
  NOT_NIL_VALUE_PREDICATE,
  selectStackWrapperItemEntities,
} from '../../../../util';

export class RouterStoreProxy<TStore extends IUniversalStoreEntity = IUniversalStoreEntity,
  TProps extends IUniversalContainerProps = IUniversalContainerProps>
  extends BaseStoreProxy<TStore, TProps>
  implements IRouterStoreProxy {

  /**
   * @stable [20.12.2019]
   * @param {IUniversalContainer<TProps extends IUniversalContainerProps>} container
   */
  constructor(readonly container: IUniversalContainer<TProps>) {
    super(container);
    this.navigateBack = this.navigateBack.bind(this);
  }

  /**
   * @stable [20.12.2019]
   * @param {number} depth
   */
  public goBack(depth?: number): void {
    this.dispatchAnyAction(RouterActionBuilder.buildNavigateBackPlainAction(depth));
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
    const entities = selectStackWrapperItemEntities(this.props) || [];
    const length = entities.length;

    return entities
      .map((item, index) => {
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
              : handlerPropsFactory(() => this.goBack(length - entities.indexOf(item) - 1))
          ),
        });
      })
      .filter(NOT_NIL_VALUE_PREDICATE);
  }
}
