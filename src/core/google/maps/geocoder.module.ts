import { DI_TYPES, bindInSingleton } from '../../di';
import { GeoCoder } from './geocoder.service';

bindInSingleton(DI_TYPES.GeoCoder, GeoCoder);
