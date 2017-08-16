import { EffectsAction, EffectsService } from 'redux-effects-promise';

import { provide, lazyInject } from '../di/di.module';
import { DI_TYPES } from '../di/di.interface';
import { IRouter, ROUTER_NAVIGATE_ACTION_TYPE } from './router.interface';

@provide(RouterEffects)
export class RouterEffects {

	@lazyInject(DI_TYPES.Router) private router: IRouter;

	@EffectsService.effects(ROUTER_NAVIGATE_ACTION_TYPE)
	routerNavigate(action: EffectsAction): void {
		if (typeof action.data === 'string') {
			this.router.push(action.data);
		} else {
			this.router.push(action.data.path, action.data.state);
		}
	}
}
