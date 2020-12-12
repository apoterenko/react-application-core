import * as React from 'react';
import * as R from 'ramda';
import * as BPromise from 'bluebird';

import {
  ClsUtils,
  defValuesFilter,
  detectBlobMimeType,
  UrlUtils,
} from '../../../util';
import { Field } from '../field/field.component';
import {
  IViewFieldProps,
  IViewFieldState,
  MimeTypesEnum,
  TransportMethodsEnum,
  ViewersEnum,
  ViewFieldClassesEnum,
} from '../../../definition';
import { toLastAddedMultiItemEntityId } from '../multifield/multifield.support';

export class ViewField extends Field<IViewFieldProps, IViewFieldState> {

  public static readonly defaultProps: IViewFieldProps = {
    errorMessageRendered: false,
    fieldRendered: false,
    viewer: ViewersEnum.PICTURE,
  };

  private previousValue: string;
  private detectorFileTypeTask: BPromise<IViewFieldState>;

  /**
   * @stable [16.10.2020]
   * @param originalProps
   */
  constructor(originalProps: IViewFieldProps) {
    super(originalProps);

    this.state = {url: null, type: null};
  }

  /**
   * @stable [29.07.2019]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();
    this.doClear();
  }

  /**
   * @stable [16.10.2020]
   */
  public async componentDidMount(): Promise<void> {
    super.componentDidMount();
    this.doRefresh();
  }

  /**
   * @stable [16.10.2020]
   * @param prevProps
   * @param prevState
   */
  public async componentDidUpdate(prevProps: IViewFieldProps, prevState: IViewFieldState): Promise<void> {
    super.componentDidUpdate(prevProps, prevState);
    this.doRefresh();
  }

  /**
   * @stable [16.10.2020]
   * @protected
   */
  protected get attachmentBodyElement(): JSX.Element {
    const {
      usePreview,
      viewer,
      viewerClassName,
      viewerConfiguration,
    } = this.originalProps;
    const {
      type,
      url,
    } = this.state;

    const $viewer = type === MimeTypesEnum.APPLICATION_PDF
      ? ViewersEnum.PDF
      : viewer;
    const Component = this.viewerLocator.resolve($viewer);

    return (
      <Component
        {...viewerConfiguration}
        className={
          ClsUtils.joinClassName(
            viewerClassName,
            ViewFieldClassesEnum.VIEW_FIELD_VIEWER
          )
        }
        src={url}
        usePreview={usePreview}
      />
    );
  }

  /**
   * @stable [16.10.2020]
   * @protected
   */
  protected getFieldClassName(): string {
    return ClsUtils.joinClassName(
      super.getFieldClassName(),
      ViewFieldClassesEnum.VIEW_FIELD
    );
  }

  /**
   * stable [19.09.2019]
   */
  private doRefresh(): void {
    const currentValue = this.currentValue;
    const previousValue = this.previousValue;

    if (R.equals(currentValue, previousValue)) {
      return;
    }
    this.previousValue = currentValue;
    this.doClear();

    if (R.isNil(currentValue)) {
      return;
    }

    /**
     * https://ru.reactjs.org/blog/2015/12/16/ismounted-antipattern.html
     *
     * The primary use case for isMounted() is to avoid calling setState() after a component has unmounted,
     * because calling setState() after a component has unmounted will emit a warning. The «setState warning»
     * exists to help you catch bugs, because calling setState() on an unmounted component is an indication
     * that your app/component has somehow failed to clean up properly. Specifically, calling setState() in
     * an unmounted component means that your app is still holding a reference to the component after the
     * component has been unmounted — which often indicates a memory leak!
     */

    // This is a cancellable async task
    this.detectorFileTypeTask = new BPromise<IViewFieldState>(
      (resolve) =>
        // This is not a cancellable async task
        this.getFileInfo(currentValue).then(resolve)
    );
    this.detectorFileTypeTask.then((payload) => this.setState(payload));
  }

  /**
   * @stable [29.07.2019]
   * @returns {string}
   */
  private get currentValue(): string {
    return toLastAddedMultiItemEntityId(this.value) as string;
  }

  /**
   * @stable [19.09.2019]
   */
  private doClear(): void {
    if (!R.isNil(this.detectorFileTypeTask)) {
      this.detectorFileTypeTask.cancel();
      this.detectorFileTypeTask = null;
    }

    const url = this.state.url;
    if (!R.isNil(url)) {
      URL.revokeObjectURL(url);
      this.setState({url: null, type: null});
    }
  }

  /**
   * @stable [19.09.2019]
   * @param {string} currentValue
   * @returns {Promise<IViewFieldState>}
   */
  private async getFileInfo(currentValue: string): Promise<IViewFieldState> {
    const {detectFileTypeTransportConfiguration, detectFileType} = this.props;
    let file;
    let url;
    let type;

    if (UrlUtils.isAbsoluteURI(currentValue)) {
      url = currentValue;

      if (detectFileType) {
        type = await detectBlobMimeType(
          await this.transport.request<Blob>({
            blobResponse: true,
            method: TransportMethodsEnum.GET,
            noCache: true, // To allow the browser cache (Pdf loader, etc..)
            noAuth: true,
            ...detectFileTypeTransportConfiguration,
            url: currentValue,
          })
        );
      }
    } else {
      file = await this.databaseStorage.get(currentValue);
      if (!R.isNil(file)) {
        url = URL.createObjectURL(file);  // No memory leak! Will be clear later (see doClear)
        if (detectFileType) {
          type = await detectBlobMimeType(file);
        }
      }
    }
    return defValuesFilter<IViewFieldState, IViewFieldState>({url, type});
  }
}
