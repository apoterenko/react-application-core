import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import { IListEmptyMessageActionFormFilterMiddlewareConfig } from '../middleware';
import { makeListEmptyMessageActionFormFilterMiddleware } from '../middleware';
import { ListActionBuilder } from '../../component/list';

/**
 * @stable [09.06.2018]
 */
export function makeListEmptyMessageActionFormFilterEffectsProxy(
  config: IListEmptyMessageActionFormFilterMiddlewareConfig): () => void {
  const listEmptyMessageActionFormFilterMiddleware = makeListEmptyMessageActionFormFilterMiddleware(config);
  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      @EffectsService.effects(ListActionBuilder.buildEmptyMessageClickActionType(config.listSection))
      public $onEmptyMessageActionClick(): IEffectsAction[] {
        return listEmptyMessageActionFormFilterMiddleware;
      }
    }
  };
}
