import { LoggerFactory, LoggerLevelEnum } from 'ts-smart-logger';

import { ENV } from '../env';
import { appContainer, DI_TYPES } from '../di';
import { LogManager } from './log-manager.service';

LoggerFactory.configure({
  debugLevelPath: '[^TransportFactory|^EffectsService|^RouterEffects|^connector.decorator]',
  warnLevelPath: '[^EffectsService]',
  logLevel: ENV.prodMode ? LoggerLevelEnum.ERROR_LEVEL : LoggerLevelEnum.DEBUG_LEVEL,
});

appContainer.bind(DI_TYPES.LogManager).to(LogManager).inSingletonScope();
