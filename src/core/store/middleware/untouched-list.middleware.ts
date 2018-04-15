import { IEffectsAction } from 'redux-effects-promise';

import { orNull } from '../../util';
import { ListActionBuilder } from '../../component/list/list-action.builder';
import { IUntouchedListMiddlewareConfig } from './middleware.interface';

/* @stable - 31.03.2018 */
export const makeUntouchedListMiddleware = <TApplicationState>(config: IUntouchedListMiddlewareConfig<TApplicationState>) =>
    (_: IEffectsAction, state: TApplicationState): IEffectsAction =>
      orNull<IEffectsAction>(
        !config.resolver(state).list.touched,
        () => ListActionBuilder.buildLoadAction(config.section)
      );
