import { appContainer, DI_TYPES } from '../../di';

import { IChannel } from '../channel.interface';
import { SocketChannel } from './socket-channel.service';

/**
 * @stable [11.12.2018]
 */
appContainer.bind<IChannel>(DI_TYPES.Channel).to(SocketChannel).inSingletonScope();
