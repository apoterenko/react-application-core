import { Container, interfaces } from 'inversify';
import getDecorators from 'inversify-inject-decorators';
import { makeProvideDecorator } from 'inversify-binding-decorators';

export const appContainer = new Container();
export const { lazyInject } = getDecorators(appContainer);
export const provide = makeProvideDecorator(appContainer);
