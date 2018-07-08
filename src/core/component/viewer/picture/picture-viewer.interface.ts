import { IComponentEntity } from '../../../entities-definitions.interface';
import { IViewerConfiguration, IViewerState  } from '../viewer.interface';

/**
 * @stable [08.07.2018]
 */
export interface IPictureViewerConfiguration extends IViewerConfiguration {
}

/**
 * @stable [08.07.2018]
 */
export interface IPictureViewerEntity extends IComponentEntity {
}

/**
 * @stable [08.07.2018]
 */
export interface IPictureViewerProps extends IPictureViewerConfiguration,
                                             IPictureViewerEntity {
}

/**
 * @stable [08.07.2018]
 */
export interface IPictureViewerState extends IViewerState {
}
