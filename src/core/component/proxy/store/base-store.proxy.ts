import { Store, AnyAction } from 'redux';

import { applySection } from '../../../util';
import { getStore } from '../../../di';
import {
  IDispatcher,
  IUniversalContainer,
  IUniversalContainerProps,
  IUniversalStoreEntity,
} from '../../../definition';
import { IKeyValue } from '../../../definitions.interface';

export class BaseStoreProxy<TStore extends IUniversalStoreEntity = IUniversalStoreEntity,
                            TProps extends IUniversalContainerProps = IUniversalContainerProps>
  implements IDispatcher {

  /**
   * @stable [09.10.2019]
   * @param {IUniversalContainer<TProps extends IUniversalContainerProps>} container
   */
  constructor(protected readonly container: IUniversalContainer<TProps>) {
  }

  /**
   * @stable [03.10.2019]
   * @param {string} type
   * @param {TChanges} data
   */
  public dispatch<TChanges = IKeyValue>(type: string, data?: TChanges): void {
    this.dispatchCustomType(`${this.sectionName}.${type}`, applySection(this.sectionName, data));
  }

  /**
   * @stable [11.09.2019]
   * @param {string} type
   * @param {TData} data
   */
  public dispatchCustomType<TData = IKeyValue>(type: string, data?: TData): void {
    this.dispatchAnyAction({type, data});
  }

  /**
   * @stable [11.09.2019]
   * @param {AnyAction} action
   */
  public dispatchAnyAction(action: AnyAction): void {
    this.appStore.dispatch(action);
  }

  /**
   * @reactNativeCompatible
   * @stable [11.09.2019]
   * @returns {Store<TStore>}
   */
  protected get appStore(): Store<TStore> {
    return getStore();
  }

  /**
   * @stable [11.09.2019]
   * @returns {string}
   */
  protected get sectionName(): string {
    return this.props.sectionName;
  }

  /**
   * @stable [11.09.2019]
   * @returns {TProps}
   */
  protected get props(): TProps {
    return this.container.props as TProps;
  }
}
