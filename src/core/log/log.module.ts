import { LoggerFactory, LoggerLevelEnum } from 'ts-smart-logger';

import { DI_TYPES, bindInSingleton } from '../di';
import { ENV } from '../env';
import { LogManager } from './log-manager.service';
import { LogManagerEventPayloadFactory } from './log-manager-event-payload-factory.service';

LoggerFactory.configure({
  debugLevelPath: '[^TransportFactory|^EffectsService|^RouterEffects|^connector.decorator]',
  warnLevelPath: '[^EffectsService]',
  logLevel: ENV.prodMode ? LoggerLevelEnum.ERROR_LEVEL : LoggerLevelEnum.DEBUG_LEVEL,
});

bindInSingleton(DI_TYPES.LogManager, LogManager);
bindInSingleton(DI_TYPES.LogManagerEventPayloadFactory, LogManagerEventPayloadFactory);
