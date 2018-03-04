import * as io from 'socket.io-client';
import { injectable } from 'inversify';

import { BaseChannel } from '../base-channel.service';

@injectable()
export class SocketChannel extends BaseChannel {

  public connect(ip: string, channel: string): void {
    const client: SocketIOClient.Socket = io(ip);
    this.registerClient(ip, channel, client);
  }
}
