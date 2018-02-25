import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { IApplicationListWrapperState, ListActionBuilder } from '../../component/list';
import { ConnectorActionBuilder } from '../../component/connector';
import { provideInSingleton } from '../../di';
import { ApplicationStateT } from '../../store';

export function makeUntouchedListEffectsProxy<TApplicationState extends ApplicationStateT>(config: {
  section: string,
  listWrapperStateResolver: (state: TApplicationState) => IApplicationListWrapperState;
}): () => void {
  const {
    listWrapperStateResolver,
    section,
  } = config;
  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      @EffectsService.effects(ConnectorActionBuilder.buildInitActionType(section))
      public $onConnectorInit(_: IEffectsAction, state: TApplicationState): IEffectsAction {
        return listWrapperStateResolver(state).list.touched
            ? null
            : ListActionBuilder.buildLoadAction(section);
      }
    }
  };
}
