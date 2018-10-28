import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import {
  IListEmptyMessageActionFormFilterMiddlewareConfig,
  makeListEmptyMessageActionMiddleware,
} from '../middleware';
import { ListActionBuilder } from '../../component/action.builder';

/**
 * @stable [06.07.2018]
 */
export function makeListEmptyMessageActionEffectsProxy(
  config: IListEmptyMessageActionFormFilterMiddlewareConfig): () => void {

  const listEmptyMessageActionMiddleware = makeListEmptyMessageActionMiddleware(config);
  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      @EffectsService.effects(ListActionBuilder.buildEmptyMessageClickActionType(config.listSection))
      public $onEmptyMessageActionClick(): IEffectsAction[] {
        return listEmptyMessageActionMiddleware;
      }
    }
  };
}
