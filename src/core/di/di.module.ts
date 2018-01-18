import { Container, interfaces } from 'inversify';
import { makeProvideDecorator, makeFluentProvideDecorator } from 'inversify-binding-decorators';
import * as getDecorators from 'inversify-inject-decorators/lib';

export const appContainer = new Container();
export const { lazyInject } = getDecorators.default(appContainer);
export const provide = makeProvideDecorator(appContainer);
const provideInSingletonDecorator = makeFluentProvideDecorator(appContainer);
export const provideInSingleton = (target) => provideInSingletonDecorator(target)
    .inSingletonScope()
    .done();
export const staticInjector = <T>(serviceIdentifier: interfaces.ServiceIdentifier<T>) =>
    appContainer.get(serviceIdentifier);
