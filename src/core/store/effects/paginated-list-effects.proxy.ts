import {
  EffectsService,
  IEffectsAction,
} from 'redux-effects-promise';

import { ListActionBuilder } from '../../component/action.builder';
import { provideInSingleton } from '../../di';
import { PageToolbarActionBuilder } from '../../action';

export function makePaginatedListEffectsProxy(section: string): () => void {
  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      @EffectsService.effects(PageToolbarActionBuilder.buildPreviousPageActionType(section))
      public $onPrevious(): IEffectsAction[] {
        return [
          ListActionBuilder.buildPreviousPageAction(section),
          ListActionBuilder.buildLoadAction(section)
        ];
      }

      @EffectsService.effects(PageToolbarActionBuilder.buildNextPageActionType(section))
      public $onNext(): IEffectsAction[] {
        return [
          ListActionBuilder.buildNextPageAction(section),
          ListActionBuilder.buildLoadAction(section)
        ];
      }

      @EffectsService.effects(PageToolbarActionBuilder.buildFirstPageActionType(section))
      public $onFirst(): IEffectsAction[] {
        return [
          ListActionBuilder.buildFirstPageAction(section),
          ListActionBuilder.buildLoadAction(section)
        ];
      }

      @EffectsService.effects(PageToolbarActionBuilder.buildLastPageActionType(section))
      public $onLast(): IEffectsAction[] {
        return [
          ListActionBuilder.buildLastPageAction(section),
          ListActionBuilder.buildLoadAction(section)
        ];
      }
    }
  };
}
