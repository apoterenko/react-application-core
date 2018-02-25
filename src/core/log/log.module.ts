import { LoggerFactory, LoggerLevelEnum } from 'ts-smart-logger';

LoggerFactory.configure({
  debugLevelPath: '[^EffectsService|^RouterEffects|^connector.decorator]',
  warnLevelPath: '[^EffectsService]',
  logLevel: LoggerLevelEnum.DEBUG_LEVEL,
});
