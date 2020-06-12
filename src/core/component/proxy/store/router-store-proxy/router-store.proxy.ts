import * as React from 'react';
import * as R from 'ramda';

import { StoreProxy } from '../store.proxy';
import {
  DefaultEntities,
  IGenericContainer,
  IGenericContainerProps,
  IReduxStoreEntity,
  IReduxStackItemEntity,
  IRouterStoreProxy,
  IRouterStoreProxyFactoryConfigEntity,
} from '../../../../definition';
import { RouterActionBuilder } from '../../../../action';
import {
  FilterUtils,
  PropsUtils,
  Selectors,
} from '../../../../util';

export class RouterStoreProxy<TStore extends IReduxStoreEntity = IReduxStoreEntity,
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
   * @stable [22.05.2020]
   * @param {(cfg: IRouterStoreProxyFactoryConfigEntity) => JSX.Element} factory
   * @returns {React.ReactNode[]}
   */
  public buildNavigationSteps(factory: (cfg: IRouterStoreProxyFactoryConfigEntity) => JSX.Element): React.ReactNode[] {
    const steps: IReduxStackItemEntity[] = [
      {
        section: DefaultEntities.ROOT_SECTION,
        url: this.settings.routes.home,
      },
      ...(Selectors.stackItemEntities(this.props) || [])
    ];
    const stepsCount = steps.length;

    return FilterUtils.notNilValuesArrayFilter(
      ...steps.map((item, index) => {
        const isFirst = index === 0;
        const isLast = index === stepsCount - 1;
        const isMiddle = !isFirst && !isLast;

        const stepElement = factory({
          first: isFirst,
          item,
          last: isLast,
          middle: isMiddle,
        });

        if (R.isNil(stepElement)) {
          return null;
        }
        return React.cloneElement(stepElement, {
          key: `navigation-step-key-${index}`,
          ...(
            isLast
              ? {}
              : PropsUtils.buildClickHandlerProps(() => this.goBack(stepsCount - steps.indexOf(item) - 1), true, false)
          ),
        });
      })
    );
  }
}
