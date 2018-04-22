import * as React from 'react';
import { AppRegistry } from 'react-native';

import { LoggerFactory, LoggerLevelEnum } from 'ts-smart-logger';

import { PROD_MODE } from './env';

LoggerFactory.configureLogLevel(
  PROD_MODE ? LoggerLevelEnum.ERROR_LEVEL : LoggerLevelEnum.DEBUG_LEVEL
);

import { IApplicationContainerProps } from './component/application';
import { IContainerClassEntity } from './entities-definitions.interface';
import { makeBootstrapApp } from './bootstrap/universal-bootstrap-app.factory';

export function rnBootstrap(
  containerName: string,
  applicationContainer: IContainerClassEntity,
  props?: IApplicationContainerProps,
) {
  const componentClass = makeBootstrapApp(applicationContainer, props);
  AppRegistry.registerComponent(containerName, () => componentClass);
}
