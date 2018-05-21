import { AnyT } from '../../definitions.interface';

/**
 * @stable [21.05.2018]
 */
export class CommandResult {
  private command: string;
  private uuid: string;
  private data: AnyT;

  /**
   * @stable [21.05.2018]
   * @param {string} command
   * @param {string} uuid
   * @param {AnyT} data
   */
  constructor(command: string, uuid: string, data?: AnyT) {
    this.command = command;
    this.uuid = uuid;
    this.data = data;
  }

  /**
   * @stable [21.05.2018]
   * @returns {string}
   */
  public getCommand(): string {
    return this.command;
  }

  /**
   * @stable [21.05.2018]
   * @returns {string}
   */
  public getUuid(): string {
    return this.uuid;
  }

  /**
   * @stable [21.05.2018]
   * @returns {AnyT}
   */
  public getData(): AnyT {
    return this.data;
  }
}
