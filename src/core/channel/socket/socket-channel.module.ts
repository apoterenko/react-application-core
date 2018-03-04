import { appContainer, DI_TYPES } from '../../di';

import { IApplicationChannel } from '../channel.interface';
import { SocketChannel } from './socket-channel.service';

appContainer.bind<IApplicationChannel>(DI_TYPES.Channel).to(SocketChannel).inSingletonScope();
