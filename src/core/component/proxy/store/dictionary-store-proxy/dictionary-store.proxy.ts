import { BaseStoreProxy } from '../base-store.proxy';
import { DictionariesActionBuilder } from '../../../../action';
import {
  IDictionaryStoreProxy,
  IUniversalContainer,
  IUniversalContainerProps,
  IUniversalStoreEntity,
} from '../../../../definition';
import { IKeyValue } from '../../../../definitions.interface';

export class DictionaryStoreProxy<TStore extends IUniversalStoreEntity = IUniversalStoreEntity,
                                  TProps extends IUniversalContainerProps = IUniversalContainerProps>
  extends BaseStoreProxy<TStore, TProps>
  implements IDictionaryStoreProxy {

  /**
   * @stable [09.10.2019]
   * @param {IUniversalContainer<TProps extends IUniversalContainerProps>} container
   */
  constructor(readonly container: IUniversalContainer<TProps>) {
    super(container);
    this.dispatchLoadDictionary = this.dispatchLoadDictionary.bind(this);
  }

  /**
   * @stable [11.01.2020]
   * @param {string} dictionary
   * @param {TData} data
   */
  public dispatchLoadDictionary<TData = IKeyValue>(dictionary: string, data?: TData): void {
    this.dispatchAnyAction(DictionariesActionBuilder.buildLoadPlainAction(dictionary, data));
  }
}
