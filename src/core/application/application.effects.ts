import { IEffectsAction, EffectsService } from 'redux-effects-promise';
import { LoggerFactory } from 'ts-smart-logger';

import { provideInSingleton } from '../di';
import { IRootUpdatePathPayload, RootActionBuilder } from '../component/root';
import { FormActionBuilder } from '../component/form';
import { UniversalApplicationEffects } from './universal-application.effects';

@provideInSingleton(ApplicationEffects)
export class ApplicationEffects<TApi> extends UniversalApplicationEffects<TApi> {
  protected logger = LoggerFactory.makeLogger(ApplicationEffects);

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
      this.logger.warn(
          '[$ApplicationEffects][onUpdateRootPath] Section parameter is empty but changes are exists:',
          changes
      );
      return null;
    }
    return FormActionBuilder.buildChangesAction(section, changes);
  }
}
