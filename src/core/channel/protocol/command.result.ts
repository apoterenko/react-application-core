/**
 * @stable [08.11.2020]
 */
export class CommandResult<TData = {}> {
  public static readonly $PROTOCOL_PAYLOAD_CLASS_IDENTIFIER = 'CommandResult';

  private readonly command: string;
  private readonly data: TData;
  private readonly uuid: string;

  /**
   * @stable [08.11.2020]
   * @param command
   * @param uuid
   * @param data
   */
  constructor(command?: string, uuid?: string, data?: TData) {
    this.command = command;
    this.uuid = uuid;
    this.data = data;
  }

  /**
   * @stable [08.11.2020]
   */
  public getCommand(): string {
    return this.command;
  }

  /**
   * @stable [08.11.2020]
   */
  public getUuid(): string {
    return this.uuid;
  }

  /**
   * @stable [08.11.2020]
   */
  public getData(): TData {
    return this.data;
  }
}
