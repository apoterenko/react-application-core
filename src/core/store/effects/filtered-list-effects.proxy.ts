import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import { FilterActionBuilder } from '../../component/filter';
import { ListActionBuilder } from '../../component/list';
import { RouterActionBuilder } from '../../router';
import { StackActionBuilder } from '../stack';
import { FormActionBuilder } from '../../component/form';
import { makeFilterManualApplyMiddleware } from '../middleware';

export function makeFilteredListEffectsProxy(
    config: { filterPath?: string; filterSection?: string, listSection?: string }
    ): () => void {
  const { filterPath, filterSection, listSection } = config;
  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      /**
       * @stable [06.07.2018]
       * @param {IEffectsAction} action
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(FilterActionBuilder.buildManualApplyActionType(listSection))
      public $onFilterManualApply(action: IEffectsAction): IEffectsAction[] {
        return makeFilterManualApplyMiddleware({listSection, action});
      }

      @EffectsService.effects(FilterActionBuilder.buildApplyActionType(listSection))
      public $onFilterApply(): IEffectsAction {
        return ListActionBuilder.buildLoadAction(listSection);
      }

      @EffectsService.effects(FilterActionBuilder.buildDeactivateActionType(listSection))
      public $onFilterDeactivate(): IEffectsAction[] {
        return (
          filterSection ? [FormActionBuilder.buildDestroyAction(filterSection)] : []
        ).concat([
          FilterActionBuilder.buildDestroyAction(listSection),
          ListActionBuilder.buildLoadAction(listSection)
        ]);
      }

      @EffectsService.effects(FilterActionBuilder.buildOpenActionType(listSection))
      public $onFilterOpen(): IEffectsAction[] {
        return [
          StackActionBuilder.buildLockAction(filterSection),
          RouterActionBuilder.buildNavigateAction(filterPath)
        ];
      }
    }
  };
}
