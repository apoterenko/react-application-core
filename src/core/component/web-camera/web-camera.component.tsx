import * as React from 'react';
import * as R from 'ramda';
import * as Webcam from 'webcamjs';

import { GenericComponent } from '../base/generic.component';
import {
  BlobUtils,
  ConditionUtils,
  UuidUtils,
} from '../../util';
import { IWebCameraProps } from '../../definition';

export class WebCamera extends GenericComponent<IWebCameraProps> {

  public static readonly defaultProps: IWebCameraProps = {
    width: 360,
    height: 270,
  };

  private $isMounted = false;
  private $isCameraLive = false;
  private static readonly CAMERA_ID = UuidUtils.uuid(true);

  /**
   * @stable [02.11.2020]
   * @param originalProps
   */
  constructor(originalProps: IWebCameraProps) {
    super(originalProps);
    this.onCapture = this.onCapture.bind(this);
    this.onLive = this.onLive.bind(this);

    Webcam.set({
      width: originalProps.width,
      height: originalProps.height,
      image_format: 'jpeg',
      jpeg_quality: 100,
    });
  }

  /**
   * @stable [02.11.2020]
   */
  public componentDidMount(): void {
    Webcam.attach(`#${WebCamera.CAMERA_ID}`);
    Webcam.on('live', this.onLive);

    this.$isMounted = true;
  }

  /**
   * @stable [02.11.2020]
   */
  public componentWillUnmount(): void {
    this.reset();

    this.$isMounted = false;
  }

  /**
   * @stable [02.08.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
      <div
        id={WebCamera.CAMERA_ID}
        className='rac-web-camera'/>
    );
  }

  /**
   * @stable [02.11.2020]
   */
  public capture(): void {
    Webcam.snap(this.onCapture);
  }

  /**
   * @stable [02.11.2020]
   * @param dataUri
   * @private
   */
  private async onCapture(dataUri: string): Promise<void> {
    return ConditionUtils.ifNotNilThanValue(
      this.originalProps.onSelect,
      async (onSelect) => onSelect(await BlobUtils.fromUrlToBlob(dataUri))
    );
  }

  /**
   * @stable [02.11.2020]
   * @private
   */
  private reset(): void {
    if (this.$isCameraLive) {
      Webcam.reset();
      Webcam.off('live', this.onLive);

      this.$isCameraLive = false;
    }
  }

  /**
   * @stable [03.11.2020]
   * @private
   */
  private onLive(): void {
    this.$isCameraLive = true;

    if (!this.$isMounted) {
      this.reset();
    }
  }
}
