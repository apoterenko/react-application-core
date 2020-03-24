import { Store } from 'redux';
import { IEffectsAction } from 'redux-effects-promise';

import { applySection } from '../../../util';
import {
  DI_TYPES,
  lazyInject,
} from '../../../di';
import {
  IDispatcher,
  IUniversalContainerProps,
  IUniversalStoreEntity,
} from '../../../definition';
import {
  IKeyValue,
  IPropsWrapper,
} from '../../../definitions.interface';

export class BaseStoreProxy<TStore extends IUniversalStoreEntity = IUniversalStoreEntity,
                            TProps extends IUniversalContainerProps = IUniversalContainerProps>
  implements IDispatcher {

  @lazyInject(DI_TYPES.Store) protected readonly appStore: Store<TStore>;

  /**
   * @stable [24.03.2020]
   * @param {{props: TProps}} container
   */
  constructor(protected readonly container: IPropsWrapper<TProps>) {
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
   * @stable [24.03.2020]
   * @param {IEffectsAction} action
   */
  public dispatchAnyAction(action: IEffectsAction): void {
    this.appStore.dispatch(action);
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
