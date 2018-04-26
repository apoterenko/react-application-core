import { Container } from 'inversify';
import { makeProvideDecorator, makeFluentProvideDecorator } from 'inversify-binding-decorators';
import * as getDecorators from 'inversify-inject-decorators/lib';

export const appContainer = new Container();
export const { lazyInject } = getDecorators.default(appContainer);
export const provide = makeProvideDecorator(appContainer);
export const provideInSingletonDecorator = makeFluentProvideDecorator(appContainer);
