import { IEffectsAction } from 'redux-effects-promise';

import { ListActionBuilder } from '../../component/list';
import { ApplicationStateT } from '../../store';
import { IUntouchedListMiddlewareConfig } from './middleware.interface';
import { orNull } from '../../util';

/* @stable - 31.03.2018 */
export const makeUntouchedListMiddleware =
  <TApplicationState extends ApplicationStateT>(config: IUntouchedListMiddlewareConfig<TApplicationState>) =>
    (_: IEffectsAction, state: TApplicationState): IEffectsAction =>
      orNull<IEffectsAction>(
        !config.resolver(state).list.touched,
        () => ListActionBuilder.buildLoadAction(config.section)
      );
