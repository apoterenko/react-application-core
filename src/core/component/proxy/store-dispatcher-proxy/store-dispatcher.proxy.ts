import { Store, AnyAction } from 'redux';

import { applySection, namedConstructor } from '../../../util';
import { DI_TYPES, staticInjector } from '../../../di';
import { FormActionBuilder } from '../../action.builder';
import { IContainer } from '../../../entities-definitions.interface';
import { IDispatcher, IContainerProps } from '../../../definition';
import { IKeyValue } from '../../../definitions.interface';

@namedConstructor('$$storeDispatcherProxy')
export class StoreDispatcherProxy<TStore, TProps extends IContainerProps>
  implements IDispatcher {

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
   * @param {string} otherSection
   */
  public dispatchFormReset(otherSection?: string): void {
    this.dispatchAnyAction(FormActionBuilder.buildResetPlainAction(otherSection || this.sectionName));
  }

  /**
   * @stable [11.09.2019]
   * @param {AnyAction} action
   */
  private dispatchAnyAction(action: AnyAction): void {
    this.appStore.dispatch(action);
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
   * @returns {string}
   */
  private get sectionName(): string {
    return this.props.sectionName;
  }

  /**
   * @stable [11.09.2019]
   * @returns {TProps}
   */
  private get props(): TProps {
    return this.container.props as TProps;
  }
}
