import {
  CONNECTED_CONTAINER_INIT_ACTION_TYPE,
  CONNECTED_CONTAINER_DESTROY_ACTION_TYPE,
} from './universal-connector.interface';

export class ConnectorActionBuilder {

  /**
   * @stable [20.10.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildInitActionType(section: string): string {
    return `${CONNECTED_CONTAINER_INIT_ACTION_TYPE}.${section}`;
  }

  /**
   * @stable [20.10.2018]
   * @param {string} section
   * @returns {string}
   */
  public static buildDestroyActionType(section: string): string {
    return `${CONNECTED_CONTAINER_DESTROY_ACTION_TYPE}.${section}`;
  }
}
