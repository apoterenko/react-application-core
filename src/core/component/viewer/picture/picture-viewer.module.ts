import { DiServices } from '../../../di';
import { ViewersEnum } from '../../../definition';
import { PictureViewer } from './picture-viewer.component';

/**
 * @stable [19.06.2020]
 */
DiServices.viewerLocator().register(ViewersEnum.PICTURE, PictureViewer);
