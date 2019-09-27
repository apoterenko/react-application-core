import { IWebCameraConfiguration } from '../../configurations-definitions.interface';
import { IComponent } from '../../definition';

/**
 * @stable [02.08.2018]
 */
export interface IWebCameraProps extends IWebCameraConfiguration {
}

/**
 * @stable [02.08.2018]
 */
export interface IWebCamera extends IComponent<IWebCameraProps> {
  capture(): void;
}
