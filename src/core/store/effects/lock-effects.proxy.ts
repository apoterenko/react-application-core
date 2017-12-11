import { EffectsService, IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton } from '../../di';
import { ListActionBuilder } from '../../component/list';
import { FormActionBuilder } from '../../component/form';
import { LockActionBuilder, LockContainerT } from '../../lock';

export function makeLockEffectsProxy(section: string): () => void {
  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      @EffectsService.effects(FormActionBuilder.buildLockActionType(section))
      public $onFormLock(): IEffectsAction {
        return LockActionBuilder.buildAction({ section, component: LockContainerT.FORM });
      }

      @EffectsService.effects(ListActionBuilder.buildLockActionType(section))
      public $onListLock(): IEffectsAction {
        return LockActionBuilder.buildAction({ section, component: LockContainerT.LIST });
      }
    }
  };
}
