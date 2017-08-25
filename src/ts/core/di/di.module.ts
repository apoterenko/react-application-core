import { Container, interfaces } from 'inversify';
import { makeProvideDecorator } from 'inversify-binding-decorators';
import * as getDecorators from 'inversify-inject-decorators/lib';

export const appContainer = new Container();
export const { lazyInject } = getDecorators.default(appContainer);
export const provide = makeProvideDecorator(appContainer);
