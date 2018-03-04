import { Command } from './command';

export class CommandsPayload {
  private commands: Command[] = [];

  public getCommands(): Command[] {
    return this.commands;
  }

  public addCommand(command: Command): CommandsPayload {
    this.commands.push(command);
    return this;
  }
}
