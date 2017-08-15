import { Container, interfaces } from 'inversify';
import * as getDecorators from 'inversify-inject-decorators/lib';
import { makeProvideDecorator } from 'inversify-binding-decorators';

export const appContainer = new Container();
export const { lazyInject } = getDecorators(appContainer);
export const provide = makeProvideDecorator(appContainer);
