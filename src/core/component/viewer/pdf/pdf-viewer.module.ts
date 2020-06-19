import { DiServices } from '../../../di';
import { ViewersEnum } from '../../../definition';
import { PdfViewer } from './pdf-viewer.component';

/**
 * @stable [19.06.2020]
 */
DiServices.viewerLocator().register(ViewersEnum.PDF, PdfViewer);
