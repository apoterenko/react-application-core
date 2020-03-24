import { BaseStoreProxy } from '../base-store.proxy';
import { DictionariesActionBuilder } from '../../../../action';
import {
  IDictionaryStoreProxy,
  IUniversalContainerProps,
  IUniversalStoreEntity,
} from '../../../../definition';
import {
  IKeyValue,
  IPropsWrapper,
} from '../../../../definitions.interface';

export class DictionaryStoreProxy<TStore extends IUniversalStoreEntity = IUniversalStoreEntity,
                                  TProps extends IUniversalContainerProps = IUniversalContainerProps>
  extends BaseStoreProxy<TStore, TProps>
  implements IDictionaryStoreProxy {

  /**
   * @stable [24.03.2020]
   * @param {IPropsWrapper<TProps extends IUniversalContainerProps>} container
   */
  constructor(readonly container: IPropsWrapper<TProps>) {
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
