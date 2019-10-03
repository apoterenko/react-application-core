import { Store, AnyAction } from 'redux';

import { applySection } from '../../../util';
import { getStore } from '../../../di';
import {
  IContainer,
  IContainerProps,
  IDispatcher,
} from '../../../definition';
import { IKeyValue } from '../../../definitions.interface';

export class BaseStoreProxy<TStore, TProps extends IContainerProps>
  implements IDispatcher {

  /**
   * @stable [03.10.2019]
   * @param {IContainer<TProps extends IContainerProps>} container
   */
  constructor(protected readonly container: IContainer<TProps>) {
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
  protected dispatchAnyAction(action: AnyAction): void {
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
