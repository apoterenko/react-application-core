import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { excludeIdFieldFilter } from '../../util';
import { provideInSingleton } from '../../di';
import { FilterActionBuilder } from '../../component/filter';
import { ListActionBuilder } from '../../component/list';
import { RouterActionBuilder } from '../../router';
import { ApplicationStateT } from '../../store';
import { CustomActionBuilder } from '../../action';
import { IEntity, ISelectable } from '../../definition.interface';
import { FormActionBuilder } from '../../component/form';

export function makeEditedListEffectsProxy<TEntity extends IEntity,
                                           TApplicationState extends ApplicationStateT>(config: {
  listSection: string;
  formSection?: string;
  pathResolver(entity?: TEntity, state?: TApplicationState): string;
  entityResolver?(state: TApplicationState): TEntity;
}): () => void {
  const {pathResolver, entityResolver, listSection, formSection} = config;
  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      @EffectsService.effects(ListActionBuilder.buildCreateActionType(listSection))
      public $onCreateEntity(_: IEffectsAction, state: TApplicationState): IEffectsAction[] {
        return [
          ListActionBuilder.buildLockAction(listSection),    // Prevent the list auto destroying
          FilterActionBuilder.buildLockAction(listSection),  // Prevent the list filter auto destroying
          RouterActionBuilder.buildNavigateAction(pathResolver(null, state))
        ];
      }

      @EffectsService.effects(ListActionBuilder.buildSelectActionType(listSection))
      public $onSelectEntity(action: IEffectsAction, state: TApplicationState): IEffectsAction[] {
        const actionParams: ISelectable<TEntity> = action.data;
        return [
          ListActionBuilder.buildLockAction(listSection),    // Prevent the list auto destroying
          FilterActionBuilder.buildLockAction(listSection),  // Prevent the list filter auto destroying
          RouterActionBuilder.buildNavigateAction(pathResolver(actionParams.selected, state))
        ];
      }

      @EffectsService.effects(CustomActionBuilder.buildCustomCloneActionType(formSection))
      public $onCloneEntity(_: IEffectsAction, state: TApplicationState): IEffectsAction[] {
        return [
          FormActionBuilder.buildChangesAction(
              formSection,
              excludeIdFieldFilter<TEntity, TEntity>(entityResolver(state))
          ),
          ListActionBuilder.buildDeselectAction(listSection),
          RouterActionBuilder.buildReplaceAction(pathResolver(null, state))
        ];
      }
    }
  };
}
