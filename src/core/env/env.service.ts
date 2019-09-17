import { injectable } from 'inversify';

import { IEnvironment, EventsEnum, TouchEventsEnum } from '../definition';
import { ENV } from './env.interface';

@injectable()
export class Environment implements IEnvironment {
  public readonly document = ENV.document;
  public readonly documentClickEvent = ENV.mobilePlatform
    ? TouchEventsEnum.TOUCH_START
    : EventsEnum.MOUSE_DOWN;
  public readonly appProfile = ENV.appProfile;
  public readonly appNamespace = ENV.appNamespace;
}
