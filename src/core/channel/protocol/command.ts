import { AnyT, IKeyValue } from '../../definitions.interface';
import { uuid } from '../../util';
import { CommandParam } from './command.param';

/**
 * @stable [21.05.2018]
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
  private params: IKeyValue = {};
  private uuid = uuid();

  /**
   * @stable [21.05.2018]
   * @param {string} uuid0
   * @returns {Command}
   */
  public setUuid(uuid0: string): Command {
    this.uuid = uuid0;
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
   * @stable [21.05.2018]
   * @param {string} paramName
   * @param {AnyT} paramValue
   * @returns {Command}
   */
  public addParam(paramName: string, paramValue: AnyT): Command {
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
