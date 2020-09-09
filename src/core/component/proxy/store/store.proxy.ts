import { Store } from 'redux';
import { IEffectsAction } from 'redux-effects-promise';

import { SectionUtils } from '../../../util';
import {
  DI_TYPES,
  lazyInject,
} from '../../../di';
import {
  IGenericContainer,
  IGenericContainerProps,
  IReduxStoreEntity,
  IStoreProxy,
} from '../../../definition';
import { ISettingsEntity } from '../../../settings';

export class StoreProxy<TStore extends IReduxStoreEntity = IReduxStoreEntity,
                        TProps extends IGenericContainerProps = IGenericContainerProps>
  implements IStoreProxy {

  @lazyInject(DI_TYPES.Settings) protected readonly settings: ISettingsEntity;
  @lazyInject(DI_TYPES.Store) protected readonly appStore: Store<TStore>;

  /**
   * @stable [30.03.2020]
   * @param {IGenericContainer<TProps extends IGenericContainerProps>} container
   */
  constructor(protected readonly container: IGenericContainer<TProps>) {
  }

  /**
   * @stable [03.10.2019]
   * @param {string} type
   * @param {TChanges} data
   */
  public dispatch<TChanges = {}>(type: string, data?: TChanges): void {
    this.dispatchActionByType(`${this.sectionName}.${type}`, SectionUtils.applySection(this.sectionName, data));
  }

  /**
   * @stable [11.09.2019]
   * @param {string} type
   * @param {TData} data
   */
  public dispatchActionByType<TData = {}>(type: string, data?: TData): void {
    this.dispatchPlainAction({type, data});
  }

  /**
   * @stable [24.03.2020]
   * @param {IEffectsAction} action
   */
  public dispatchPlainAction(action: IEffectsAction): void {
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
   * @stable [03.02.2020]
   * @param {string} otherSection
   * @returns {string}
   */
  protected asSection(otherSection?: string): string {
    return otherSection || this.sectionName;
  }

  /**
   * @stable [11.09.2019]
   * @returns {TProps}
   */
  protected get props(): TProps {
    return this.container.props as TProps;
  }
}
