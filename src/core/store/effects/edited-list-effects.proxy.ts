import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { excludeIdFieldFilter } from '../../util';
import { provideInSingleton } from '../../di';
import { ListActionBuilder } from '../../component/list';
import { RouterActionBuilder } from '../../router';
import { ApplicationStateT } from '../../store';
import { CustomActionBuilder } from '../../action';
import { IEntity, ISelectedWrapper } from '../../definition.interface';
import { FormActionBuilder } from '../../component/form';
import { StackActionBuilder } from '../../store';

export function makeEditedListEffectsProxy<TEntity extends IEntity,
                                           TApplicationState extends ApplicationStateT>(config: {
  listSection: string;
  formSection: string;
  pathResolver(entity?: TEntity, state?: TApplicationState): string;
  changesResolver?(state: TApplicationState): TEntity;
}): () => void {
  const {pathResolver, changesResolver, listSection, formSection} = config;
  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      @EffectsService.effects(ListActionBuilder.buildCreateActionType(listSection))
      public $onCreateEntity(_: IEffectsAction, state: TApplicationState): IEffectsAction[] {
        return [
          StackActionBuilder.buildLockAction(formSection),
          RouterActionBuilder.buildNavigateAction(pathResolver(null, state))
        ];
      }

      @EffectsService.effects(ListActionBuilder.buildSelectActionType(listSection))
      public $onSelectEntity(action: IEffectsAction, state: TApplicationState): IEffectsAction[] {
        const actionParams: ISelectedWrapper<TEntity> = action.data;
        return [
          StackActionBuilder.buildLockAction(formSection),
          RouterActionBuilder.buildNavigateAction(pathResolver(actionParams.selected, state))
        ];
      }

      @EffectsService.effects(CustomActionBuilder.buildCustomCloneActionType(formSection))
      public $onCloneEntity(_: IEffectsAction, state: TApplicationState): IEffectsAction[] {
        return [
          FormActionBuilder.buildChangesAction(
              formSection,
              excludeIdFieldFilter<TEntity, TEntity>(changesResolver(state))
          ),
          ListActionBuilder.buildDeselectAction(listSection),
          RouterActionBuilder.buildReplaceAction(pathResolver(null, state))
        ];
      }
    }
  };
}
