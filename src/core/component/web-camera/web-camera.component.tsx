import * as React from 'react';
import * as Webcam from 'webcamjs';

import { uuid, toBlobEntities } from '../../util';
import { BaseComponent } from '../base';
import { IWebCameraProps, IWebCamera } from './web-camera.interface';

export class WebCamera extends BaseComponent<IWebCameraProps>
  implements IWebCamera {

  public static readonly defaultProps: IWebCameraProps = {
    cameraWidth: 270,
    cameraHeight: 203,
  };

  private static readonly CAMERA_ID = uuid(true);

  /**
   * @stable [02.08.2018]
   * @param {IWebCameraProps} props
   */
  constructor(props: IWebCameraProps) {
    super(props);
    this.onCapture = this.onCapture.bind(this);

    Webcam.set({
      width: props.cameraWidth,
      height: props.cameraHeight,
      image_format: 'jpeg',
      jpeg_quality: 90,
    });
  }

  /**
   * @stable [02.08.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    Webcam.attach(`#${WebCamera.CAMERA_ID}`);
  }

  /**
   * @stable [02.08.2018]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();

    Webcam.reset();
  }

  /**
   * @stable [02.08.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
      <div id={WebCamera.CAMERA_ID}
           className='rac-web-camera'/>
    );
  }

  /**
   * @stable [02.08.2018]
   */
  public capture(): void {
    Webcam.snap(this.onCapture);
  }

  /**
   * @stable [02.08.2018]
   * @param {string} dataUri
   * @returns {Promise<void>}
   */
  private async onCapture(dataUri: string): Promise<void> {
    const blobEntities = await toBlobEntities(dataUri);

    const props = this.props;
    if (props.onSelect) {
      props.onSelect(blobEntities[0].blob);
    }
  }
}
