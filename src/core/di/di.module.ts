import { Container, interfaces } from 'inversify';
import { makeProvideDecorator, makeFluentProvideDecorator } from 'inversify-binding-decorators';
import * as getDecorators from 'inversify-inject-decorators/lib';
import { AnyT } from '../definition.interface';

export const appContainer = new Container();
export const { lazyInject } = getDecorators.default(appContainer);
export const provide = makeProvideDecorator(appContainer);
const provideInSingletonDecorator = makeFluentProvideDecorator(appContainer);
export const provideInSingleton = (target: AnyT) => provideInSingletonDecorator(target)
    .inSingletonScope()
    .done();
