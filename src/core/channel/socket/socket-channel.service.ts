import * as io from 'socket.io-client/dist/socket.io';
import { injectable } from 'inversify';

import { AnyT } from '../../definitions.interface';
import { BaseChannel } from '../base-channel.service';

@injectable()
export class SocketChannel extends BaseChannel {

  /**
   * @stable [08.11.2020]
   * @param ip
   * @param config
   */
  public async connect(ip: string, config?: AnyT): Promise<void> {
    await this.registerClient(ip, io(ip, {
      transports: ['websocket'],
      ...config,
    }));
  }
}
