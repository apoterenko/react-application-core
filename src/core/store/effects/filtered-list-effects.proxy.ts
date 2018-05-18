import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import { FilterActionBuilder } from '../../component/filter';
import { ListActionBuilder } from '../../component/list';
import { RouterActionBuilder } from '../../router';
import { StackActionBuilder } from '../stack';

export function makeFilteredListEffectsProxy(
    config: { filterPath?: string; section: string, filterSection?: string }
    ): () => void {
  const { filterPath, section, filterSection } = config;
  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      @EffectsService.effects(FilterActionBuilder.buildApplyActionType(section))
      public $onFilterApply(): IEffectsAction {
        return ListActionBuilder.buildLoadAction(section);
      }

      @EffectsService.effects(FilterActionBuilder.buildDeactivateActionType(section))
      public $onFilterDeactivate(): IEffectsAction[] {
        return [
          FilterActionBuilder.buildDestroyAction(section),
          ListActionBuilder.buildLoadAction(section)
        ];
      }

      @EffectsService.effects(FilterActionBuilder.buildOpenActionType(section))
      public $onFilterOpen(): IEffectsAction[] {
        return [
          StackActionBuilder.buildLockAction(filterSection),
          RouterActionBuilder.buildNavigateAction(filterPath)
        ];
      }
    }
  };
}
