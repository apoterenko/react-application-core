import './polyfills/universal-polyfills';

// Define RN platform
import { Platform } from 'react-native';
if (typeof window !== 'undefined') {
  Reflect.set(window, '$$RAC-RN_PLATFORM', Platform.OS);
}
