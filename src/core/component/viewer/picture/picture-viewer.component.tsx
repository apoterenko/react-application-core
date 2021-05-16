import * as React from 'react';

import {
  DefaultEntities,
  IPictureViewerProps,
  ViewerClassesEnum,
} from '../../../definition';
import {
  ClsUtils,
  ConditionUtils,
  JoinUtils,
  NvlUtils,
  PropsUtils,
} from '../../../util';
import { Viewer } from '../viewer.component';

/**
 * @component-impl
 * @stable [16.05.2021]
 */
export class PictureViewer extends Viewer<IPictureViewerProps> {

  /**
   * @stable [15.05.2021]
   */
  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<IPictureViewerProps>({
    defaultScr: DefaultEntities.MEDIA_NO_PICTURE_URL,
    usePreview: false,
  }, Viewer);

  /**
   * @stable [15.05.2021]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    // For only images because there no need to prefetch file manually
    this.doShowPreviewDialogIfApplicable();
  }

  /**
   * @stable [15.05.2021]
   */
  protected getClassName(): string {
    return ClsUtils.joinClassName(
      super.getClassName(),
      ViewerClassesEnum.PICTURE_VIEWER
    );
  }

  /**
   * @stable [15.05.2021]
   */
  protected get contentElement(): JSX.Element {
    return (
      <img
        className={ViewerClassesEnum.VIEWER_CONTENT}
        src={this.actualSrc}
        style={this.actualStyles}
        alt=''
        onClick={this.showPreviewDialogHandler}/>
    );
  }

  /**
   * @stable [15.05.2021]
   */
  protected get previewElement(): JSX.Element {
    return (
      <PictureViewer
        src={this.actualSrc}
        degree={this.actualOrDefaultPreviewDegree}
        scale={this.actualOrDefaultPreviewScale}/>
    );
  }

  /**
   * @stable [15.05.2021]
   */
  protected get previewForwardActionElement(): JSX.Element {
    return null;
  }

  /**
   * @stable [15.05.2021]
   */
  protected get previewBackActionElement(): JSX.Element {
    return null;
  }

  /**
   * @stable [15.05.2021]
   */
  private get actualStyles(): React.CSSProperties {
    const transformScaleStyles = this.domAccessor.getTransformScaleStyles(this.actualOrDefaultScale);
    const transformRotateStyles = this.domAccessor.getTransformRotateStyles(this.actualOrDefaultDegree);

    return ConditionUtils.ifNotNilThanValue(
      NvlUtils.coalesce(
        transformRotateStyles,
        transformScaleStyles
      ),
      (styles): React.CSSProperties =>
        this.domAccessor.getTransformStyles(
          JoinUtils.join([
            transformScaleStyles?.transform,
            transformRotateStyles?.transform
          ]),
          styles.transformOrigin
        )
    );
  }
}
