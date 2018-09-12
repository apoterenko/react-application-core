import { LoggerFactory, LoggerLevelEnum } from 'ts-smart-logger';
import { ENV } from '../env';

LoggerFactory.configure({
  debugLevelPath: '[^TransportFactory|^EffectsService|^RouterEffects|^connector.decorator]',
  warnLevelPath: '[^EffectsService]',
  logLevel: ENV.prodMode ? LoggerLevelEnum.ERROR_LEVEL : LoggerLevelEnum.DEBUG_LEVEL,
});
