import { injectable } from 'inversify';

import {
  EventsEnum,
  IEnvironment,
  TouchEventsEnum,
} from '../definition';
import { ENV } from './env.interface';

@injectable()
export class Environment implements IEnvironment {
  public readonly androidPlatform = ENV.androidPlatform;
  public readonly appNamespace = ENV.appNamespace;
  public readonly appProfile = ENV.appProfile;
  public readonly basePath = ENV.basePath;
  public readonly browserVersion = ENV.browserVersion;
  public readonly chromePlatform = ENV.chromePlatform;
  public readonly document = ENV.document;
  public readonly documentClickEvent = ENV.mobilePlatform ? TouchEventsEnum.TOUCH_START : EventsEnum.MOUSE_DOWN;
  public readonly googleKey = ENV.googleKey;
  public readonly iosPlatform = ENV.iosPlatform;
  public readonly macPlatform = ENV.macPlatform;
  public readonly mobilePlatform = ENV.mobilePlatform;
  public readonly platformOs = ENV.platformOs;
  public readonly prodMode = ENV.prodMode;
  public readonly safariPlatform = ENV.safariPlatform;
  public readonly window = ENV.window;
  public readonly windowsPhonePlatform = ENV.windowsPhonePlatform;
  public readonly windowsPlatform = ENV.windowsPlatform;
}
