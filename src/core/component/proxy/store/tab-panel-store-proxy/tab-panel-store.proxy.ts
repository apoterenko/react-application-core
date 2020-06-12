import { TabPanelActionBuilder } from '../../../../action';
import {
  IGenericContainer,
  IGenericContainerProps,
  IReduxStoreEntity,
  ITabPanelStoreProxy,
} from '../../../../definition';
import { StoreProxy } from '../store.proxy';

export class TabPanelStoreProxy<TStore extends IReduxStoreEntity = IReduxStoreEntity,
                                TProps extends IGenericContainerProps = IGenericContainerProps>
  extends StoreProxy<TStore, TProps>
  implements ITabPanelStoreProxy {

  /**
   * @stable [30.03.2020]
   * @param {IGenericContainer<TProps extends IGenericContainerProps>} container
   */
  constructor(readonly container: IGenericContainer<TProps>) {
    super(container);

    this.dispatchTabPanelActiveValue = this.dispatchTabPanelActiveValue.bind(this);
    this.dispatchTabPanelInactiveValue = this.dispatchTabPanelInactiveValue.bind(this);
    this.dispatchTabPanelDestroy = this.dispatchTabPanelDestroy.bind(this);
  }

  /**
   * @stable [12.04.2020]
   * @param {number} payload
   * @param {string} otherSection
   */
  public dispatchTabPanelActiveValue(payload: number, otherSection?: string): void {
    this.dispatchPlainAction(
      TabPanelActionBuilder.buildActiveValuePlainAction(this.asSection(otherSection), {payload})
    );
  }

  /**
   * @stable [12.04.2020]
   * @param {number} payload
   * @param {string} otherSection
   */
  public dispatchTabPanelInactiveValue(payload: number, otherSection?: string): void {
    this.dispatchPlainAction(
      TabPanelActionBuilder.buildInactiveValuePlainAction(this.asSection(otherSection), {payload})
    );
  }

  /**
   * @stable [12.04.2020]
   * @param {string} otherSection
   */
  public dispatchTabPanelDestroy(otherSection?: string): void {
    this.dispatchPlainAction(TabPanelActionBuilder.buildDestroyPlainAction(this.asSection(otherSection)));
  }
}
