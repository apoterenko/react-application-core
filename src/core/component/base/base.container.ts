import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Store } from 'redux';

import { lazyInject, DI_TYPES } from '../../di';
import { AnyT } from '../../definitions.interface';
import { IRoutes } from '../../router';
import { DictionariesActionBuilder } from '../../dictionary';
import { ApplicationPermissionsServiceT } from '../../permissions';
import { NOTIFICATION_INFO_ACTION_TYPE } from '../../notification';
import { IApplicationSettings } from '../../settings';
import { IDateConverter, INumberConverter } from '../../converter';
import { ApplicationTranslatorT } from '../../translation';
import { IFormDialog } from '../form';
import {
  IBaseContainer,
  IBaseContainerInternalProps,
  IBaseContainerInternalState,
} from './base.interface';
import { IUIFactory } from '../factory';
import { UniversalBaseContainer } from './universal-base.container';

export class BaseContainer<TInternalProps extends IBaseContainerInternalProps,
                           TInternalState extends IBaseContainerInternalState>
    extends UniversalBaseContainer<TInternalProps, TInternalState>
    implements IBaseContainer<TInternalProps, TInternalState> {

  @lazyInject(DI_TYPES.DateConverter) protected dc: IDateConverter;
  @lazyInject(DI_TYPES.NumberConverter) protected nc: INumberConverter;
  @lazyInject(DI_TYPES.Translate) protected t: ApplicationTranslatorT;
  @lazyInject(DI_TYPES.Store) protected appStore: Store<{}>;
  @lazyInject(DI_TYPES.Permission) protected permissionService: ApplicationPermissionsServiceT;
  @lazyInject(DI_TYPES.Settings) protected settings: IApplicationSettings;
  @lazyInject(DI_TYPES.UIFactory) protected uiFactory: IUIFactory;
  @lazyInject(DI_TYPES.Routes) protected routes: IRoutes;

  constructor(props: TInternalProps, public sectionName = 'section') {
    super(props);
    this.sectionName = props.sectionName || sectionName;

    this.navigateToBack = this.navigateToBack.bind(this);
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
