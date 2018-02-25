import {
  CONNECTED_CONTAINER_INIT_ACTION_TYPE,
  CONNECTED_CONTAINER_DESTROY_ACTION_TYPE,
} from './connector.interface';

export class ConnectorActionBuilder {

  public static buildInitActionType(section: string): string {
    return `${CONNECTED_CONTAINER_INIT_ACTION_TYPE}.${section}`;
  }

  public static buildDestroyActionType(section: string): string {
    return `${CONNECTED_CONTAINER_DESTROY_ACTION_TYPE}.${section}`;
  }
}
