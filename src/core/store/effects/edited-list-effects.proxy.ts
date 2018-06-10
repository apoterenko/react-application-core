import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { excludeIdFieldFilter } from '../../util';
import { provideInSingleton } from '../../di';
import { ListActionBuilder } from '../../component/list';
import { RouterActionBuilder } from '../../router';
import { CustomActionBuilder } from '../../action';
import { IEntity } from '../../definitions.interface';
import { FormActionBuilder } from '../../component/form';
import { StackActionBuilder } from '../../store';
import { makeSelectEntityMiddleware } from '../middleware';

export function makeEditedListEffectsProxy<TEntity extends IEntity,
                                           TApplicationState>(config: {
  listSection: string;
  formSection: any; // TODO
  path(entity?: TEntity, state?: TApplicationState, isChainExist?: boolean): string;
  changesResolver?(state: TApplicationState): TEntity;
}): () => void {
  const {path, changesResolver, listSection, formSection} = config;
  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      @EffectsService.effects(ListActionBuilder.buildCreateActionType(listSection))
      public $onCreateEntity(_: IEffectsAction, state: TApplicationState): IEffectsAction[] {
        return [
          StackActionBuilder.buildLockAction(formSection),
          RouterActionBuilder.buildNavigateAction(path(null, state))
        ];
      }

      @EffectsService.effects(ListActionBuilder.buildSelectActionType(listSection))
      public $onSelectEntity(action: IEffectsAction, state: TApplicationState): IEffectsAction[] {
        return makeSelectEntityMiddleware<TEntity, TApplicationState>({action, state, formSection, path});
      }

      @EffectsService.effects(CustomActionBuilder.buildCustomCloneActionType(formSection))
      public $onCloneEntity(_: IEffectsAction, state: TApplicationState): IEffectsAction[] {
        return [
          FormActionBuilder.buildChangesAction(
              formSection,
              excludeIdFieldFilter<TEntity, TEntity>(changesResolver(state))
          ),
          ListActionBuilder.buildDeselectAction(listSection),
          RouterActionBuilder.buildReplaceAction(path(null, state))
        ];
      }
    }
  };
}
