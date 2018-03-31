import { AnyT } from '../../definitions.interface';

export class CommandResult {
  private command: string;
  private uuid: string;
  private data: AnyT;

  constructor(command: string, uuid: string, data?: AnyT) {
    this.command = command;
    this.uuid = uuid;
    this.data = data;
  }

  public getCommand(): string {
    return this.command;
  }

  public getUuid(): string {
    return this.uuid;
  }

  public getData(): AnyT {
    return this.data;
  }
}
