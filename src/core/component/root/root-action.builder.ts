import {
  ROOT_SECTION,
  ROOT_PATH_UPDATE_ACTION_TYPE,
} from './root.interface';

export class RootActionBuilder {

  public static buildPathUpdateActionType(): string {
    return `${ROOT_SECTION}.${ROOT_PATH_UPDATE_ACTION_TYPE}`;
  }
}
