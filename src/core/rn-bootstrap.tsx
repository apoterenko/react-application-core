import * as React from 'react';
import { AppRegistry } from 'react-native';

import { LoggerFactory, LoggerLevelEnum } from 'ts-smart-logger';

import { ENV } from './env';

LoggerFactory.configureLogLevel(
  ENV.prodMode ? LoggerLevelEnum.ERROR_LEVEL : LoggerLevelEnum.DEBUG_LEVEL
);

import { IApplicationContainerProps } from './component/application';
import { IContainerClassEntity } from './entities-definitions.interface';
import { makeBootstrapApp } from './bootstrap/universal-bootstrap-app.factory';
import { RnApplicationContainer } from './component/application/rn-application.container';

export function rnBootstrap(
  containerName: string,
  applicationContainer: IContainerClassEntity = RnApplicationContainer,
  props?: IApplicationContainerProps,
) {
  const componentClass = makeBootstrapApp(applicationContainer, props);
  AppRegistry.registerComponent(containerName, () => componentClass);
}
