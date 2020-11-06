import { bindInSingleton } from '../../di';
import { IChannel } from '../../definition';
import { SignalRChannel } from './signalr-channel.service';

/**
 * @stable [06.11.2020]
 */
bindInSingleton<IChannel>(SignalRChannel);
