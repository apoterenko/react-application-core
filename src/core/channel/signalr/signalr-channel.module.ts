import { bindInSingleton } from '../../di';

import { IChannel } from '../channel.interface';
import { SignalRChannel } from './signalr-channel.service';

/**
 * @stable [11.12.2018]
 */
bindInSingleton<IChannel>(SignalRChannel);
