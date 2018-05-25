import { appContainer, DI_TYPES } from '../../di';

import { IChannel } from '../channel.interface';
import { SocketChannel } from './socket-channel.service';

appContainer.bind<IChannel>(DI_TYPES.Channel).to(SocketChannel).inSingletonScope();
