import { Container, interfaces } from 'inversify';
import { makeFluentProvideDecorator } from 'inversify-binding-decorators';
import ProvideInWhenOnSyntax from 'inversify-binding-decorators/dts/interfaces/interfaces';
import * as getDecorators from 'inversify-inject-decorators/lib';

export const appContainer = new Container();
export const { lazyInject } = getDecorators.default(appContainer);
export const provideInSingletonDecorator = makeFluentProvideDecorator(appContainer);
