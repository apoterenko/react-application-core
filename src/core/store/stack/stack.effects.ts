import { IEffectsAction, EffectsService } from 'redux-effects-promise';
import { LoggerFactory } from 'ts-smart-logger';

import { provideInSingleton } from '../../di';
import {
  ListActionBuilder,
  FormActionBuilder,
  FilterActionBuilder,
  TabPanelActionBuilder,
} from '../../component/action.builder';
import { STACK_PUSH_ACTION_TYPE } from './stack.interface';
import { StackActionBuilder } from './stack-action.builder';
import { getDestroyableSections } from './stack.helper';
import { IApplicationStoreEntity } from '../../entities-definitions.interface';

@provideInSingleton(ConnectorEffects)
export class ConnectorEffects {
  private static logger = LoggerFactory.makeLogger('ConnectorEffects');

  @EffectsService.effects(STACK_PUSH_ACTION_TYPE)
  public $onStackPush(action: IEffectsAction, state: IApplicationStoreEntity): IEffectsAction[] {
    const currentSection = action.data;
    const destroyableSections = getDestroyableSections(currentSection, state.stack);

    if (destroyableSections.length) {
      ConnectorEffects.logger.debug(`[$ConnectorEffects][onContainerInit] The sections to destroy: [${destroyableSections}]`);

      return [StackActionBuilder.buildRemoveAction(...destroyableSections)]
        .concat(this.buildActionsToDestroy(destroyableSections));
    }
    return null;
  }

  private buildActionsToDestroy(sectionsToDestroy: string[]): IEffectsAction[] {
    return sectionsToDestroy.map((section) => ListActionBuilder.buildDestroyAction(section))
      .concat(sectionsToDestroy.map((section) => FormActionBuilder.buildDestroyAction(section)))
      .concat(sectionsToDestroy.map((section) => FilterActionBuilder.buildDestroyAction(section)))
      .concat(sectionsToDestroy.map((section) => TabPanelActionBuilder.buildDestroyAction(section)));
  }
}
