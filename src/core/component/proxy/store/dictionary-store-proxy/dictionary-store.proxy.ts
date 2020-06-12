import { StoreProxy } from '../store.proxy';
import { DictionariesActionBuilder } from '../../../../action';
import {
  IApiEntity,
  IDictionaryStoreProxy,
  IGenericContainer,
  IGenericContainerProps,
  IReduxStoreEntity,
} from '../../../../definition';

export class DictionaryStoreProxy<TStore extends IReduxStoreEntity = IReduxStoreEntity,
                                  TProps extends IGenericContainerProps = IGenericContainerProps>
  extends StoreProxy<TStore, TProps>
  implements IDictionaryStoreProxy {

  /**
   * @stable [30.03.2020]
   * @param {IGenericContainer<TProps extends IGenericContainerProps>} container
   */
  constructor(readonly container: IGenericContainer<TProps>) {
    super(container);
    this.dispatchLoadDictionary = this.dispatchLoadDictionary.bind(this);
  }

  /**
   * @stable [09.05.2020]
   * @param {string} dictionary
   * @param {IApiEntity} apiEntity
   */
  public dispatchLoadDictionary(dictionary: string, apiEntity?: IApiEntity): void {
    this.dispatchPlainAction(DictionariesActionBuilder.buildLoadPlainAction(dictionary, apiEntity));
  }
}
