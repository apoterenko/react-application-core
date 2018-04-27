import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { lazyInject, DI_TYPES } from '../../di';
import { AnyT } from '../../definitions.interface';
import { DictionariesActionBuilder } from '../../dictionary';
import { IPermissionsService } from '../../permissions';
import { NOTIFICATION_INFO_ACTION_TYPE } from '../../notification';
import { IFormDialog } from '../form';
import { IUIFactory } from '../factory';
import { UniversalBaseContainer } from './universal-base.container';
import { IContainerEntity, IContainer } from '../../entities-definitions.interface';
import { IContainerConfiguration } from '../../configurations-definitions.interface';

export class BaseContainer<TInternalProps extends IContainerEntity & IContainerConfiguration,
                           TInternalState = {}>
    extends UniversalBaseContainer<TInternalProps, TInternalState>
    implements IContainer<TInternalProps, TInternalState> {

  @lazyInject(DI_TYPES.Permission) protected permissionService: IPermissionsService;
  @lazyInject(DI_TYPES.UIFactory) protected uiFactory: IUIFactory;

  constructor(props: TInternalProps) {
    super(props);
    this.activateFormDialog = this.activateFormDialog.bind(this);
  }

  // Dictionary service method (DRY)
  protected dispatchLoadDictionary(section: string, payload?: AnyT): void {
    this.dispatchCustomType(DictionariesActionBuilder.buildLoadActionType(section), { section, payload });
  }

  // Dictionary service method (DRY)
  protected dispatchClearDictionary(section: string): void {
    this.dispatchCustomType(DictionariesActionBuilder.buildClearActionType(section), { section });
  }

  // Notification service method (DRY)
  protected dispatchNotification(info: string): void {
    this.dispatchCustomType(NOTIFICATION_INFO_ACTION_TYPE, { info });
  }

  // Service method (DRY)
  protected isPermissionAccessible<TApplicationAccessConfig>(checkedObject: TApplicationAccessConfig): boolean {
    return this.permissionService.isAccessible(checkedObject);
  }

  // Service method (DRY)
  protected activateFormDialog(): void {
    (this.refs.formDialog as IFormDialog).activate();
  }
}
