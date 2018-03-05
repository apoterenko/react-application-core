import * as io from 'socket.io-client/dist/socket.io';
import { injectable } from 'inversify';

import { BaseChannel } from '../base-channel.service';

@injectable()
export class SocketChannel extends BaseChannel {

  public connect(ip: string, channel: string): void {
    this.registerClient(ip, channel, io(ip));
  }
}
