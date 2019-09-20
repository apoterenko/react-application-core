import { IUniversalContainerEntity } from '../../../definition';
import { IRnDefaultLayoutContainerConfiguration } from '../../../configurations-definitions.interface';

/* @stable [27.04.2018] */
export interface IRnDefaultLayoutContainerProps extends IUniversalContainerEntity,
                                                        IRnDefaultLayoutContainerConfiguration {
}

/* @stable [27.04.2018] */
export interface IRnDefaultLayoutContainer {
  openDrawer(): void;
  closeDrawer(): void;
}
