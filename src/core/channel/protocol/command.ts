import {
  TypeUtils,
  UuidUtils,
} from '../../util';
import { CommandParam } from './command.param';

/**
 * @stable [08.11.20]
 */
export class Command {
  public static readonly $PROTOCOL_PAYLOAD_CLASS_IDENTIFIER = 'Command';

  /**
   * @stable [21.05.2018]
   * @returns {Command}
   */
  public static newCommand(): Command {
    return new Command();
  }

  private command: string;
  private params = {};
  private uuid = UuidUtils.uuid();

  /**
   * @stable [08.11.2020]
   * @param $uuid
   */
  public setUuid($uuid: string): Command {
    this.uuid = $uuid;
    return this;
  }

  /**
   * @stable [21.05.2018]
   * @param {string} command
   * @returns {Command}
   */
  public setCommand(command: string): Command {
    this.command = command;
    return this;
  }

  /**
   * @stable [20.04.2021]
   * @param paramName
   * @param paramValue
   */
  public addParam(paramName: string, paramValue: unknown): Command {
    if (TypeUtils.isUndef(paramValue)) {
      return this;
    }
    this.params[paramName] = new CommandParam(paramName, paramValue);
    return this;
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
   * @returns {CommandParam[]}
   */
  public getParams(): CommandParam[] {
    return Object.keys(this.params).map((key) => this.params[key]);
  }
}
