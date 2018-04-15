import { LoggerFactory, LoggerLevelEnum } from 'ts-smart-logger';

LoggerFactory.configure({
  debugLevelPath: '[^TransportFactory|^EffectsService|^RouterEffects|^connector.decorator]',
  warnLevelPath: '[^EffectsService]',
  logLevel: LoggerLevelEnum.DEBUG_LEVEL,
});
