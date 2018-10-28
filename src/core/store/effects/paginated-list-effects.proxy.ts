import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { ListActionBuilder, ToolbarActionBuilder } from '../../component/action.builder';
import { provideInSingleton } from '../../di';

export function makePaginatedListEffectsProxy(section: string): () => void {
  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      @EffectsService.effects(ToolbarActionBuilder.buildPagerPreviousActionType(section))
      public $onPrevious(): IEffectsAction[] {
        return [
          ListActionBuilder.buildPreviousPageAction(section),
          ListActionBuilder.buildLoadAction(section)
        ];
      }

      @EffectsService.effects(ToolbarActionBuilder.buildPagerNextActionType(section))
      public $onNext(): IEffectsAction[] {
        return [
          ListActionBuilder.buildNextPageAction(section),
          ListActionBuilder.buildLoadAction(section)
        ];
      }

      @EffectsService.effects(ToolbarActionBuilder.buildPagerFirstActionType(section))
      public $onFirst(): IEffectsAction[] {
        return [
          ListActionBuilder.buildFirstPageAction(section),
          ListActionBuilder.buildLoadAction(section)
        ];
      }

      @EffectsService.effects(ToolbarActionBuilder.buildPagerLastActionType(section))
      public $onLast(): IEffectsAction[] {
        return [
          ListActionBuilder.buildLastPageAction(section),
          ListActionBuilder.buildLoadAction(section)
        ];
      }
    }
  };
}
