import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import { FilterActionBuilder } from '../../component/filter';
import { ListActionBuilder } from '../../component/list';
import { RouterActionBuilder } from '../../router';

export function makeFilteredListEffectsProxy(
    config: { filterPath?: string; section: string }
    ): () => void {
  const { filterPath, section } = config;
  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      @EffectsService.effects(FilterActionBuilder.buildApplyActionType(section))
      public $onFilterApply(): IEffectsAction {
        return ListActionBuilder.buildLoadAction(section);
      }

      @EffectsService.effects(FilterActionBuilder.buildOpenActionType(section))
      public $onFilterOpen(): IEffectsAction[] {
        return [
          ListActionBuilder.buildLockAction(section),    // Prevent the list auto destroying
          FilterActionBuilder.buildLockAction(section),  // Prevent the list filter auto destroying
          RouterActionBuilder.buildNavigateAction(filterPath)
        ];
      }

      @EffectsService.effects(ListActionBuilder.buildSearchActionType(section))
      public $onFilterActivateByListSearchAction(): IEffectsAction {
        return FilterActionBuilder.buildActivateAction(section);
      }
    }
  };
}
