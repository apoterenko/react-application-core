import * as React from 'react';

import { BaseStoreProxy } from '../base-store.proxy';
import {
  IDialogFormChangesConfirmStoreProxy,
  IRouterStoreProxy,
  IRouterStoreProxyFactoryConfigEntity,
  IUniversalComponentProps,
  IUniversalContainer,
  IUniversalContainerProps,
  IUniversalDialog,
  IUniversalStoreEntity,
} from '../../../../definition';
import { getRouterStoreProxyFactoryFactory } from '../../../../di';

export class DialogFormChangesConfirmStoreProxy<TStore extends IUniversalStoreEntity = IUniversalStoreEntity,
                                                TProps extends IUniversalContainerProps = IUniversalContainerProps>
  extends BaseStoreProxy<TStore, TProps>
  implements IDialogFormChangesConfirmStoreProxy {

  public readonly dialogRef = React.createRef<IUniversalDialog>();
  private readonly routerStoreProxy: IRouterStoreProxy;
  private originalGoBackFn: () => void;

  /**
   * @stable [09.10.2019]
   * @param {IUniversalContainer<TProps extends IUniversalContainerProps>} container
   */
  constructor(readonly container: IUniversalContainer<TProps>) {
    super(container);

    this.goBack = this.goBack.bind(this);
    this.activateDialog = this.activateDialog.bind(this);

    this.routerStoreProxy = getRouterStoreProxyFactoryFactory()(container);
    this.originalGoBackFn = this.routerStoreProxy.goBack;
    this.routerStoreProxy.goBack = this.activateDialog; // Need to intercept a click event
  }

  /**
   * @stable [20.12.2019]
   * @param {(cfg: IRouterStoreProxyFactoryConfigEntity) => JSX.Element} factory
   * @returns {React.ReactNode[]}
   */
  public buildNavigationSteps(factory: (cfg: IRouterStoreProxyFactoryConfigEntity) => JSX.Element): React.ReactNode[] {
    return this.routerStoreProxy.buildNavigationSteps(factory);
  }

  /**
   * @stable [03.10.2019]
   */
  public activateDialog(): void {
    this.dialogRef.current.activate();
  }

  /**
   * @stable [18.12.2019]
   */
  public goBack(): void {
    this.originalGoBackFn.call(this.routerStoreProxy);
  }

  /**
   * @stable [03.10.2019]
   * @returns {React.RefObject<T extends IUniversalDialog>}
   */
  public getDialogRef<T extends IUniversalDialog>(): React.RefObject<T> {
    return this.dialogRef as React.RefObject<T>;
  }
}
