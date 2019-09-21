import * as React from 'react';
import * as R from 'ramda';
import * as BPromise from 'bluebird';

import {
  defValuesFilter,
  detectBlobMimeType,
  isAbsoluteURI,
  joinClassName,
} from '../../../util';
import { Field, IFieldInputProps, toLastAddedMultiItemEntityId } from '../../field';
import { FlexLayout } from '../../layout';
import { PictureViewer, Viewer } from '../../viewer';
import { IViewFieldProps, IViewFieldState } from './view-field.interface';
import {
  MimeTypesEnum,
  TransportMethodsEnum,
} from '../../../definition';
import { PdfViewer } from '../../viewer/pdf/pdf-viewer.component';

export class ViewField extends Field<IViewFieldProps, IViewFieldState> {

  public static readonly defaultProps: IViewFieldProps = {
    viewer: PictureViewer,
  };

  private previousValue: string;
  private detectorFileTypeTask: BPromise<IViewFieldState>;

  /**
   * @stable [29.07.2019]
   * @param {IViewFieldProps} props
   */
  constructor(props: IViewFieldProps) {
    super(props);
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
   * @stable [29.07.2019]
   * @returns {Promise<void>}
   */
  public async componentDidMount(): Promise<void> {
    super.componentDidMount();
    this.doRefresh();
  }

  /**
   * @stable [29.07.2019]
   * @param {IViewFieldProps} prevProps
   * @param {IViewFieldState} prevState
   * @returns {Promise<void>}
   */
  public async componentDidUpdate(prevProps: IViewFieldProps, prevState: IViewFieldState): Promise<void> {
    super.componentDidUpdate(prevProps, prevState);
    this.doRefresh();
  }

  /**
   * @stable [27.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
      <div className={this.getFieldClassName()}>
        <FlexLayout
          ref={this.selfRef}
          className={this.getSelfElementClassName()}>
          {this.getInputElement()}
          {this.viewElement}
        </FlexLayout>
      </div>
    );
  }

  /**
   * @stable [27.06.2018]
   * @returns {IFieldInputProps}
   */
  protected getInputElementProps(): IFieldInputProps {
    return {
      ...super.getInputElementProps() as IFieldInputProps,
      type: 'hidden',
    };
  }

  /**
   * @stable [27.06.2018]
   * @returns {JSX.Element}
   */
  private get viewElement(): JSX.Element {
    const {viewer, usePreview} = this.props;
    const viewer0 = this.state.type === MimeTypesEnum.APPLICATION_PDF ? PdfViewer : viewer;
    const Component = viewer0 as { new(): Viewer };

    return (
      <Component
        usePreview={usePreview}
        src={this.state.url}/>
    );
  }

  /**
   * @stable [25.03.2019]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return joinClassName(super.getFieldClassName(), 'rac-view-field');
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

    if (isAbsoluteURI(currentValue)) {
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
