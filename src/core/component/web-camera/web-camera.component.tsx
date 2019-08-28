import * as React from 'react';
import * as Webcam from 'webcamjs';

import { BaseComponent } from '../base';
import { IWebCameraProps, IWebCamera } from './web-camera.interface';
import { uuid, isFn, fromUrlToBlob } from '../../util';

export class WebCamera extends BaseComponent<IWebCameraProps>
  implements IWebCamera {

  public static readonly defaultProps: IWebCameraProps = {
    cameraWidth: 360,
    cameraHeight: 270,
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
      jpeg_quality: 100,
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
   * @stable [01.08.2019]
   * @param {string} dataUri
   * @returns {Promise<void>}
   */
  private async onCapture(dataUri: string): Promise<void> {
    const props = this.props;
    if (isFn(props.onSelect)) {
      props.onSelect(await fromUrlToBlob(dataUri));
    }
  }
}
