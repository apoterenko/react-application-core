import { ListActionBuilder } from '../../../action.builder';
import {
  IGenericContainer,
  IGenericContainerProps,
  IGenericStoreEntity,
  IListStoreProxy,
} from '../../../../definition';
import { StoreProxy } from '../store.proxy';

export class ListStoreProxy<TStore extends IGenericStoreEntity = IGenericStoreEntity,
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
    this.dispatchAnyAction(ListActionBuilder.buildCancelLoadPlainAction(this.asSection(otherSection)));
  }

  /**
   * @stable [30.03.2020]
   * @param {TEntity} selected
   * @param {string} otherSection
   */
  public dispatchListSelect<TEntity>(selected: TEntity, otherSection?: string): void {
    this.dispatchAnyAction(ListActionBuilder.buildSelectPlainAction(this.asSection(otherSection), {selected}));
  }

  /**
   * @stable [30.03.2020]
   * @param {string} otherSection
   */
  public dispatchListCreate(otherSection?: string): void {
    this.dispatchAnyAction(ListActionBuilder.buildCreatePlainAction(this.asSection(otherSection)));
  }

  /**
   * @stable [03.02.2020]
   * @param {string} otherSection
   * @returns {string}
   */
  private asSection(otherSection?: string): string {
    return otherSection || this.sectionName;
  }
}
