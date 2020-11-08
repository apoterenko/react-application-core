import * as io from 'socket.io-client/dist/socket.io';
import { LoggerFactory } from 'ts-smart-logger';
import { injectable } from 'inversify';

import { AnyT } from '../../definitions.interface';
import { BaseChannel } from '../base-channel.service';

@injectable()
export class SocketChannel extends BaseChannel {
  protected static readonly logger = LoggerFactory.makeLogger('SocketChannel');

  /**
   * @stable [08.11.2020]
   * @param ip
   * @param config
   */
  public async connect(ip: string, config?: AnyT): Promise<void> {
    if (this.hasClient(ip)) {
      SocketChannel.logger.info(`[$SocketChannel][connect] The client is already registered. Ip: ${ip}`);
      return;
    }

    await this.registerClient(ip, io(ip, {
      transports: ['websocket'],
      ...config,
    }));
  }
}
