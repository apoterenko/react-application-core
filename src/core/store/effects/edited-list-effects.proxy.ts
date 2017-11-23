import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import { FilterActionBuilder } from '../../component/filter';
import { ListActionBuilder } from '../../component/list';
import { RouterActionBuilder } from '../../router';
import { ApplicationStateT } from '../../store';
import { IEntity, ISelectable } from '../../definition.interface';

export function makeEditedListEffectsProxy<TEntity extends IEntity,
                                           TApplicationState extends ApplicationStateT>(
  config: {
    section: string;
    pathResolver(entity?: TEntity, state?: TApplicationState): string;
  }
): () => void {
  const {pathResolver, section} = config;
  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      @EffectsService.effects(ListActionBuilder.buildCreateActionType(section))
      public $onCreateEntity(_: IEffectsAction, state: TApplicationState): IEffectsAction[] {
        return [
          ListActionBuilder.buildLockAction(section),    // Prevent the list auto destroying
          FilterActionBuilder.buildLockAction(section),  // Prevent the list filter auto destroying
          RouterActionBuilder.buildNavigateAction(pathResolver(null, state))
        ];
      }

      @EffectsService.effects(ListActionBuilder.buildSelectActionType(section))
      public $onSelectEntity(action: IEffectsAction, state: TApplicationState): IEffectsAction[] {
        const actionParams: ISelectable<TEntity> = action.data;
        return [
          ListActionBuilder.buildLockAction(section),    // Prevent the list auto destroying
          FilterActionBuilder.buildLockAction(section),  // Prevent the list filter auto destroying
          RouterActionBuilder.buildNavigateAction(pathResolver(actionParams.selected, state))
        ];
      }
    }
  };
}
