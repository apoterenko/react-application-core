import { ListActionBuilder } from '../../../action.builder';
import {
  IGenericContainer,
  IGenericContainerProps,
  IReduxStoreEntity,
  IListStoreProxy,
} from '../../../../definition';
import { StoreProxy } from '../store.proxy';

export class ListStoreProxy<TStore extends IReduxStoreEntity = IReduxStoreEntity,
                            TProps extends IGenericContainerProps = IGenericContainerProps>
  extends StoreProxy<TStore, TProps>
  implements IListStoreProxy {

  /**
   * @stable [30.03.2020]
   * @param {IGenericContainer<TProps extends IGenericContainerProps>} container
   */
  constructor(readonly container: IGenericContainer<TProps>) {
    super(container);

    this.dispatchListCancelLoad = this.dispatchListCancelLoad.bind(this);
    this.dispatchListCreate = this.dispatchListCreate.bind(this);
    this.dispatchListCreate = this.dispatchListCreate.bind(this);
  }

  /**
   * @stable [30.03.2020]
   * @param {string} otherSection
   */
  public dispatchListCancelLoad(otherSection?: string): void {
    this.dispatchPlainAction(ListActionBuilder.buildCancelLoadPlainAction(this.asSection(otherSection)));
  }

  /**
   * @stable [30.03.2020]
   * @param {TEntity} selected
   * @param {string} otherSection
   */
  public dispatchListSelect<TEntity>(selected: TEntity, otherSection?: string): void {
    this.dispatchPlainAction(ListActionBuilder.buildSelectPlainAction(this.asSection(otherSection), {selected}));
  }

  /**
   * @stable [30.03.2020]
   * @param {string} otherSection
   */
  public dispatchListCreate(otherSection?: string): void {
    this.dispatchPlainAction(ListActionBuilder.buildCreatePlainAction(this.asSection(otherSection)));
  }

  /**
   * @stable [12.06.2021]
   * @param otherSection
   */
  public dispatchListDeselect(otherSection?: string): void {
    this.dispatchPlainAction(ListActionBuilder.buildDeselectPlainAction(this.asSection(otherSection)));
  }
}
