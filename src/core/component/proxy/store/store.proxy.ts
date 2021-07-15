import { Store } from 'redux';
import { IEffectsAction } from 'redux-effects-promise';

import {
  ActionUtils,
  SectionUtils,
} from '../../../util';
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
   * @stable [07.07.2021]
   * @param container
   */
  constructor(protected readonly container: IGenericContainer<TProps>) {
  }

  /**
   * @stable [07.07.2021]
   * @param type
   * @param data
   */
  public dispatch<TChanges = {}>(type: string, data?: TChanges): void {
    this.dispatchActionByType(
      ActionUtils.asComplexActionType(this.sectionName, type),
      SectionUtils.applySection(this.sectionName, data)
    );
  }

  /**
   * @stable [07.07.2021]
   * @param type
   * @param data
   */
  public dispatchActionByType<TData = {}>(type: string, data?: TData): void {
    this.dispatchPlainAction({type, data});
  }

  /**
   * @stable [07.07.2021]
   * @param action
   */
  public dispatchPlainAction(action: IEffectsAction): void {
    this.appStore.dispatch(action);
  }

  /**
   * @stable [07.07.2021]
   */
  protected get sectionName(): string {
    return this.originalProps.sectionName;
  }

  /**
   * @stable [07.07.2021]
   * @param otherSection
   */
  protected asSection(otherSection?: string): string {
    return otherSection || this.sectionName;
  }

  /**
   * @stable [07.07.2021]
   */
  protected get originalProps(): TProps {
    return this.container.originalProps as TProps;
  }
}
