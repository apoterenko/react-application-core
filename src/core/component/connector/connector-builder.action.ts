import { CONNECTOR_INIT_ACTION_TYPE, CONNECTOR_DESTROY_ACTION_TYPE } from './connector.interface';

export class ConnectorActionBuilder {

  public static buildInitActionType(section: string): string {
    return `${section}.${CONNECTOR_INIT_ACTION_TYPE}`;
  }

  public static buildDestroyActionType(section: string): string {
    return `${section}${CONNECTOR_DESTROY_ACTION_TYPE}`;
  }
}
