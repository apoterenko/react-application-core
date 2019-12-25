import {
  bindInSingleton,
  DI_TYPES,
} from '../../di';

import { SocketChannel } from './socket-channel.service';

/**
 * @stable [11.12.2018]
 */
bindInSingleton(DI_TYPES.Channel, SocketChannel);
