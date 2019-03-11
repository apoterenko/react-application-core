import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import {
  IToolbarToolsMiddlewareConfig,
  makeToolbarToolsRefreshMiddleware,
} from '../middleware';
import { ToolbarToolsActionBuilder } from '../../component/toolbar-tools/toolbar-tools-action.builder';

/**
 * @stable [11.03.2019]
 */
export function makeToolbarToolsEffectsProxy(config: IToolbarToolsMiddlewareConfig): () => void {
  const toolbarToolsRefreshMiddleware =  makeToolbarToolsRefreshMiddleware(config);

  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      /**
       * @stable [11.03.2019]
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(ToolbarToolsActionBuilder.buildRefreshActionType(config.listSection))
      public $onRefresh(): IEffectsAction {
        return toolbarToolsRefreshMiddleware;
      }
    }
  };
}
