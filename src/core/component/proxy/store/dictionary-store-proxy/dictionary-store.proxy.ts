import { StoreProxy } from '../store.proxy';
import { DictionariesActionBuilder } from '../../../../action';
import {
  IDictionaryStoreProxy,
  IFluxPayloadEntity,
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

    this.dispatchLoadDictionaryOnChange = this.dispatchLoadDictionaryOnChange.bind(this);
  }

  /**
   * @stable [07.08.2020]
   * @param dictionary
   * @param payload
   */
  public dispatchLoadDictionaryOnChange<TData = {}>(dictionary: string, payload?: IFluxPayloadEntity<TData>): void {
    this.dispatchLoadDictionary(dictionary, payload);
  }

  /**
   * @stable [07.08.2020]
   * @param dictionary
   * @param payload
   * @private
   */
  private dispatchLoadDictionary<TData = {}>(dictionary: string, payload?: IFluxPayloadEntity<TData>): void {
    this.dispatchPlainAction(DictionariesActionBuilder.buildLoadPlainAction(dictionary, payload));
  }
}
