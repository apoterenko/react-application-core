import * as R from 'ramda';
import { Store } from 'redux';
import { EffectsService } from 'redux-effects-promise';
import { LoggerFactory } from 'ts-smart-logger';

import {
  DI_TYPES,
  lazyInject,
  provideInSingleton,
} from '../di';
import {
  $STORAGE_REGISTER_SYNC_APP_STATE_TASK_ACTION_TYPE,
  $STORAGE_SYNC_APP_STATE_ACTION_TYPE,
  $STORAGE_UNREGISTER_SYNC_APP_STATE_TASK_ACTION_TYPE,
  ILogManager,
  IStateSerializer,
  IStorage,
  IStorageSettingsEntity,
  IUniversalStoreEntity,
  StorageEventCategoriesEnum,
  StorageEventsEnum,
} from '../definition';
import { ISettingsEntity } from '../settings';
import {
  DelayedTask,
  isFn,
} from '../util';

@provideInSingleton(UniversalStorageEffects)
export class UniversalStorageEffects {
  private static readonly logger = LoggerFactory.makeLogger('UniversalStorageEffects');

  @lazyInject(DI_TYPES.LogManager) private readonly logManager: ILogManager;
  @lazyInject(DI_TYPES.Settings) private readonly settings: ISettingsEntity;
  @lazyInject(DI_TYPES.StateSerializer) private readonly stateSerializer: IStateSerializer;
  @lazyInject(DI_TYPES.Storage) private readonly storage: IStorage;
  @lazyInject(DI_TYPES.Store) private readonly appStore: Store<IUniversalStoreEntity>;

  private isPreviousStatesAlreadyCleared = false;
  private syncStateWithStorageTask: DelayedTask;
  private syncStateWithStorageTaskUnsubscriber: () => void;

  /**
   * @stable [17.11.2019]
   */
  constructor() {
    this.doSyncState = this.doSyncState.bind(this);
  }

  /**
   * @stable [17.11.2019]
   * @returns {Promise<void>}
   */
  @EffectsService.effects($STORAGE_SYNC_APP_STATE_ACTION_TYPE)
  public $onAppSyncState(): Promise<void> {
    return this.doSyncState();
  }

  /**
   * @stable [17.11.2019]
   */
  @EffectsService.effects($STORAGE_REGISTER_SYNC_APP_STATE_TASK_ACTION_TYPE)
  public $onRegisterSyncStateTask(): void {
    const appStateSyncTimeout = this.storageSettings.appStateSyncTimeout;
    if (appStateSyncTimeout === 0) {
      return;
    }
    this.doUnRegisterSyncStateTask();

    this.syncStateWithStorageTask = new DelayedTask(this.doSyncState, appStateSyncTimeout);
    this.syncStateWithStorageTaskUnsubscriber = this.appStore.subscribe(() => this.syncStateWithStorageTask.start());

    UniversalStorageEffects.logger.debug(
      `[UniversalStorageEffects][$onRegisterSyncStateTask] The sync task has been register successfully`
    );
  }

  /**
   * @stable [17.11.2019]
   */
  @EffectsService.effects($STORAGE_UNREGISTER_SYNC_APP_STATE_TASK_ACTION_TYPE)
  public $onUnRegisterSyncStateTask(): void {
    this.doUnRegisterSyncStateTask(false);
  }

  /**
   * @stable [18.11.2019]
   * @param {boolean} silently
   */
  protected doUnRegisterSyncStateTask(silently = true): void {
    if (!R.isNil(this.syncStateWithStorageTask)) {
      this.syncStateWithStorageTask.stop();
      this.syncStateWithStorageTask = null;

      if (!silently) {
        UniversalStorageEffects.logger.debug(
          `[UniversalStorageEffects][doUnRegisterSyncStateTask] The sync task has been unregister successfully`
        );
      }
    }
    if (isFn(this.syncStateWithStorageTaskUnsubscriber)) {
      this.syncStateWithStorageTaskUnsubscriber();
      this.syncStateWithStorageTaskUnsubscriber = null;
    }
  }

  /**
   * @stable [17.11.2019]
   * @returns {Promise<void>}
   */
  protected async doSyncState(): Promise<void> {
    try {
      await this.syncState();

      UniversalStorageEffects.logger.debug(
        `[UniversalStorageEffects][doSyncState] The app state has been synced with storage successfully`
      );
    } catch (e) {
      this.logManager.send(StorageEventCategoriesEnum.STORAGE_ERROR, StorageEventsEnum.SYNC_APP_STATE, e.message);

      UniversalStorageEffects.logger.error(`[UniversalStorageEffects][doSyncState] Error:`, e);
    }
  }

  /**
   * @stable [17.11.2019]
   * @returns {Promise<void>}
   */
  protected async syncState(): Promise<void> {
    await this.clearPreviousStates();
    await this.storage.set(this.appStateKeyName, this.stateSerializer.serialize(this.appStore.getState()));
  }

  /**
   * @stable [17.11.2019]
   * @returns {Promise<void>}
   */
  protected async clearPreviousStates(): Promise<void> {
    if (this.isPreviousStatesAlreadyCleared) {
      return;
    }
    this.isPreviousStatesAlreadyCleared = true;

    // Remove the previous states (with the previous app versions)
    const tasksToClearPreviousStates = [];
    const tasksKeys = [];
    this.storage.each((value, key) => {
      if (key.endsWith(this.appStateKeyName)) {
        tasksKeys.push(key);
        tasksToClearPreviousStates.push(this.storage.remove(key, true));
      }
    });
    if (tasksToClearPreviousStates.length > 0) {
      await Promise.resolve(tasksToClearPreviousStates);

      UniversalStorageEffects.logger.debug(
        `[UniversalStorageEffects][clearPreviousStates] The previous states has been cleared successfully. Keys:`,
        JSON.stringify(tasksKeys)
      );
    }
  }

  /**
   * @stable [17.11.2019]
   * @returns {IStorageSettingsEntity}
   */
  protected get storageSettings(): IStorageSettingsEntity {
    return this.settings.storage || {};
  }

  /**
   * @stable [17.11.2019]
   * @returns {string}
   */
  protected get appStateKeyName(): string {
    return this.storageSettings.appStateKeyName || '$$rac.state.default';
  }
}
