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
import { IStoreEntity } from '../../entities-definitions.interface';

@provideInSingleton(StackEffects)
export class StackEffects {
  private static logger = LoggerFactory.makeLogger('StackEffects');

  @EffectsService.effects(STACK_PUSH_ACTION_TYPE)
  public $onStackPush(action: IEffectsAction, state: IStoreEntity): IEffectsAction[] {
    const currentSection = action.data;
    const destroyableSections = getDestroyableSections(currentSection, state.stack);

    if (destroyableSections.length) {
      StackEffects.logger.debug(`[$StackEffects][$onStackPush] The sections to destroy: [${destroyableSections}]`);

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
