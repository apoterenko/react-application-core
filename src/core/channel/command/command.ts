import { AnyT, IKeyValue } from '../../definitions.interface';
import { uuid } from '../../util';
import { CommandParam } from './command.param';

export class Command {
  private command: string;
  private params: IKeyValue = {};
  private uuid = uuid();

  public setUuid(uuid0: string): Command {
    this.uuid = uuid0;
    return this;
  }

  public setCommand(command: string): Command {
    this.command = command;
    return this;
  }

  public addParam(paramName: string, paramValue: AnyT): Command {
    this.params[paramName] = new CommandParam(paramName, paramValue);
    return this;
  }

  public getCommand(): string {
    return this.command;
  }

  public getUuid(): string {
    return this.uuid;
  }

  public getParams(): CommandParam[] {
    return Object.keys(this.params).map((key) => this.params[key]);
  }
}
