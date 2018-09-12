import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { excludeIdFieldFilter } from '../../util';
import { provideInSingleton } from '../../di';
import { ListActionBuilder } from '../../component/list';
import { RouterActionBuilder } from '../../router';
import { CustomActionBuilder } from '../../action';
import { IEntity } from '../../definitions.interface';
import { FormActionBuilder } from '../../component/form';
import { makeSelectEntityMiddleware, makeCreateEntityMiddleware } from '../middleware';

export function makeEditedListEffectsProxy<TEntity extends IEntity,
                                           TApplicationState>(config: {
  listSection: string;
  useLazyLoading?: boolean;
  formSection?: any; // TODO
  path?(entity?: TEntity, state?: TApplicationState, action?: IEffectsAction): string;
  changesResolver?(state: TApplicationState): TEntity;
}): () => void {
  const {path, changesResolver, listSection, formSection, useLazyLoading} = config;
  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      @EffectsService.effects(ListActionBuilder.buildCreateActionType(listSection))
      public $onEntityCreate(action: IEffectsAction, state: TApplicationState): IEffectsAction[] {
        return makeCreateEntityMiddleware<TEntity, TApplicationState>({action, state, path, formSection});
      }

      /**
       * @stable [29.06.2018]
       * @param {IEffectsAction} action
       * @param {TApplicationState} state
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(ListActionBuilder.buildSelectActionType(listSection))
      public $onEntitySelect(action: IEffectsAction, state: TApplicationState): IEffectsAction[] {
        return makeSelectEntityMiddleware<TEntity, TApplicationState>({action, state, path, useLazyLoading, formSection, listSection});
      }

      /**
       * @stable [29.06.2018]
       * @param {IEffectsAction} action
       * @param {TApplicationState} state
       * @returns {IEffectsAction[]}
       */
      @EffectsService.effects(ListActionBuilder.buildLazyLoadDoneActionType(listSection))
      public $onEntityLazyLoadDone(action: IEffectsAction, state: TApplicationState): IEffectsAction[] {
        return makeSelectEntityMiddleware<TEntity, TApplicationState>({action, state, path, formSection, listSection});
      }

      @EffectsService.effects(CustomActionBuilder.buildCustomCloneActionType(formSection))
      public $onEntityClone(_: IEffectsAction, state: TApplicationState): IEffectsAction[] {
        return [
          FormActionBuilder.buildChangesAction(
              formSection,
              excludeIdFieldFilter<TEntity, TEntity>(changesResolver(state))
          ),
          ListActionBuilder.buildDeselectAction(listSection),
          RouterActionBuilder.buildReplaceAction(path(null, state))
        ];
      }
    }
  };
}
