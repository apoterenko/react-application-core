import { LoggerFactory, LoggerLevelEnum } from 'ts-smart-logger';

import {
  bindInSingleton,
  DI_TYPES,
} from '../di';
import { LogManager } from './log-manager.service';
import { LogManagerEventPayloadFactory } from './log-manager-event-payload-factory.service';
import { DefaultEntities } from '../definition';

LoggerFactory.configure({
  debugLevelPath: '[^TransportFactory|^EffectsService|^RouterEffects|^connector.decorator]',
  warnLevelPath: '[^EffectsService]',
  logLevel: DefaultEntities.ENVIRONMENT_ENTITY.prodMode ? LoggerLevelEnum.ERROR_LEVEL : LoggerLevelEnum.DEBUG_LEVEL,
});

bindInSingleton(DI_TYPES.LogManager, LogManager);
bindInSingleton(DI_TYPES.LogManagerEventPayloadFactory, LogManagerEventPayloadFactory);
bindInSingleton(LogManager, LogManager);
