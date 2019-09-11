import { Store } from 'redux';

import { applySection, namedConstructor } from '../../../util';
import { DI_TYPES, staticInjector } from '../../../di';
import { IContainer } from '../../../entities-definitions.interface';
import { IContainerProps } from '../../../props-definitions.interface';
import { IDispatcherEntity } from '../../../definition';
import { IKeyValue } from '../../../definitions.interface';

@namedConstructor('$$storeDispatcherProxy')
export class StoreDispatcherProxy<TStore, TProps extends IContainerProps>
  implements IDispatcherEntity {

  /**
   * @stable [11.09.2019]
   * @param {IContainer<TProps>} container
   */
  constructor(private readonly container: IContainer<TProps>) {
  }

  /**
   * @stable [11.09.2019]
   * @param {string} type
   * @param {TChanges} data
   */
  public dispatch<TChanges = IKeyValue>(type: string, data?: TChanges): void {
    const sectionName = this.props.sectionName;
    this.dispatchCustomType(`${sectionName}.${type}`, applySection(sectionName, data));
  }

  /**
   * @stable [11.09.2019]
   * @param {string} type
   * @param {TData} data
   */
  public dispatchCustomType<TData = IKeyValue>(type: string, data?: TData): void {
    this.appStore.dispatch({type, data});
  }

  /**
   * @reactNativeCompatible
   * @stable [11.09.2019]
   * @returns {Store<TStore>}
   */
  private get appStore(): Store<TStore> {
    return staticInjector(DI_TYPES.Store);
  }

  /**
   * @stable [11.09.2019]
   * @returns {TProps}
   */
  private get props(): TProps {
    return this.container.props as TProps;
  }
}
