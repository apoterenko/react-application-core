import * as React from 'react';

import { BaseStoreProxy } from '../base-store.proxy';
import {
  IDialogFormChangesConfirmStoreProxy,
  IRouterStoreProxy,
  IRouterStoreProxyFactoryConfigEntity,
  IUniversalComponentProps,
  IUniversalContainer,
  IUniversalContainerProps,
  IDialog,
  IUniversalStoreEntity,
} from '../../../../definition';
import { getRouterStoreProxyFactoryFactory } from '../../../../di';
import { UNDEF } from '../../../../definitions.interface';

export class DialogFormChangesConfirmStoreProxy<TStore extends IUniversalStoreEntity = IUniversalStoreEntity,
                                                TProps extends IUniversalContainerProps = IUniversalContainerProps>
  extends BaseStoreProxy<TStore, TProps>
  implements IDialogFormChangesConfirmStoreProxy {

  private readonly dialogRef = React.createRef<IDialog>();
  private readonly routerStoreProxy: IRouterStoreProxy;
  private readonly originalGoBackFn: () => void;
  private cachedDepth: number;

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
    this.routerStoreProxy.goBack = this.interceptGoBack.bind(this); // Need to intercept a click event
    this.onDialogDeactivate = this.onDialogDeactivate.bind(this);
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
    this.dialogRef.current.activate({onDeactivate: this.onDialogDeactivate});
  }

  /**
   * @stable [18.12.2019]
   */
  public goBack(): void {
    this.originalGoBackFn.call(this.routerStoreProxy, this.cachedDepth);
  }

  /**
   * @stable [03.10.2019]
   * @returns {React.RefObject<T extends IDialog>}
   */
  public getDialogRef<T extends IDialog>(): React.RefObject<T> {
    return this.dialogRef as React.RefObject<T>;
  }

  /**
   * @stable [23.12.2019]
   * @param {number} depth
   */
  private interceptGoBack(depth?: number): void {
    this.cachedDepth = depth;
    this.activateDialog();
  }

  /**
   * @stable [23.12.2019]
   */
  private onDialogDeactivate(): void {
    this.cachedDepth = UNDEF;
  }
}
