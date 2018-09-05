import { LoggerFactory, LoggerLevelEnum } from 'ts-smart-logger';
import { PROD_MODE } from '../env';

LoggerFactory.configure({
  debugLevelPath: '[^TransportFactory|^EffectsService|^RouterEffects|^connector.decorator]',
  warnLevelPath: '[^EffectsService]',
  logLevel: PROD_MODE ? LoggerLevelEnum.ERROR_LEVEL : LoggerLevelEnum.DEBUG_LEVEL,
});
