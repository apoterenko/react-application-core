import {
  DI_TYPES,
  DiSupport,
} from '../../di';
import { ViewerLocator } from './viewer-locator.service';

/**
 * @stable [19.06.2020]
 */
DiSupport.bindInSingleton(DI_TYPES.ViewerLocator, ViewerLocator);

/**
 * @stable [19.06.2020]
 */
import './pdf/pdf-viewer.module';
import './picture/picture-viewer.module';
