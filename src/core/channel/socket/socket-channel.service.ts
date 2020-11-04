import * as io from 'socket.io-client/dist/socket.io';
import { injectable } from 'inversify';

import { AnyT } from '../../definitions.interface';
import { BaseChannel } from '../base-channel.service';

@injectable()
export class SocketChannel extends BaseChannel {

  /**
   * @stable [21.05.2018]
   * @param {string} ip
   * @param {AnyT} config
   */
  public connect(ip: string, config?: AnyT): void {
    this.registerClient(ip, io(ip, {
      transports: ['websocket'],
      ...config,
    }));
  }
}
