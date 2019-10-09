import { BaseStoreProxy } from '../base-store.proxy';
import { DictionariesActionBuilder } from '../../../../dictionary';
import {
  IUniversalContainer,
  IUniversalContainerProps,
  IUniversalStoreEntity,
} from '../../../../definition';
import { IDictionaryStoreProxy } from './dictionary-store-proxy.interface';
import { IKeyValue } from '../../../../definitions.interface';
import { namedConstructor } from '../../../../util';

@namedConstructor('$$dictionaryStoreProxy')
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
   * @stable [09.10.2019]
   * @param {string} dictionary
   * @param {TData} data
   */
  public dispatchLoadDictionary<TData = IKeyValue>(dictionary: string, data?: TData): void {
    this.dispatchAnyAction(DictionariesActionBuilder.buildLoadAction(dictionary, data));
  }
}
