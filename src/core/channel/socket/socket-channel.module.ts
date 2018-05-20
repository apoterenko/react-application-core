import { appContainer, DI_TYPES } from '../../di';

import { IChannelService } from '../channel.interface';
import { SocketChannel } from './socket-channel.service';

appContainer.bind<IChannelService>(DI_TYPES.Channel).to(SocketChannel).inSingletonScope();
