import { IEffectsAction, EffectsService } from 'redux-effects-promise';
import { LoggerFactory } from 'ts-smart-logger';

import { provideInSingleton } from '../di';
import { IRootUpdatePathPayload } from '../component/root/root.interface';
import { RootActionBuilder } from '../component/root/root-action.builder';
import { FormActionBuilder } from '../component/form/form-action.builder';
import { ApplicationActionBuilder } from '../component/application/application-action.builder';
import { LayoutActionBuilder } from '../component/layout/layout-action.builder';
import { UniversalApplicationEffects } from './universal-application.effects';

@provideInSingleton(ApplicationEffects)
export class ApplicationEffects<TApi> extends UniversalApplicationEffects<TApi> {
  private static logger0 = LoggerFactory.makeLogger('ApplicationEffects');

  /**
   * Initial form state supporting
   */
  @EffectsService.effects(RootActionBuilder.buildPathUpdateActionType())
  public onUpdateRootPath(action: IEffectsAction): IEffectsAction {
    const payload = action.data as IRootUpdatePathPayload;
    const section = payload.section;
    const changes = payload.changes;

    if (!changes || Object.keys(changes).length === 0) {
      return null;
    }
    if (!section) {
      ApplicationEffects.logger0.warn(
          '[$ApplicationEffects][onUpdateRootPath] Section parameter is empty but changes are exists:',
          changes
      );
      return null;
    }
    return FormActionBuilder.buildChangesAction(section, changes);
  }

  /**
   * @stable [11.08.2018]
   * @returns {IEffectsAction[]}
   */
  @EffectsService.effects(ApplicationActionBuilder.buildLogoutActionType())
  public $onLogout(): IEffectsAction[] {
    return super.$onLogout().concat(LayoutActionBuilder.buildDestroyAction());
  }
}
