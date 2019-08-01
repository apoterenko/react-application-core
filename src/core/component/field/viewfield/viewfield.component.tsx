import * as React from 'react';
import * as R from 'ramda';
import * as URI from 'urijs';

import { toClassName } from '../../../util';
import { Field, IFieldInputProps, toLastAddedMultiItemEntityId } from '../../field';
import { FlexLayout } from '../../layout';
import { PictureViewer, Viewer } from '../../viewer';
import { IViewFieldProps, IViewFieldState } from './viewfield.interface';

export class ViewField extends Field<IViewFieldProps, IViewFieldState> {

  public static readonly defaultProps: IViewFieldProps = {
    viewer: PictureViewer,
  };

  private previousValue: string;

  /**
   * @stable [29.07.2019]
   * @param {IViewFieldProps} props
   */
  constructor(props: IViewFieldProps) {
    super(props);
    this.state = {url: null};
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
    const Component = viewer as { new(): Viewer };
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
    return toClassName(super.getFieldClassName(), 'rac-view-field');
  }

  /**
   * @stable [29.07.2019]
   * @returns {Promise<void>}
   */
  private async doRefresh(): Promise<void> {
    const currentValue = this.currentValue;
    const previousValue = this.previousValue;

    if (!R.equals(currentValue, previousValue)) {
      this.previousValue = currentValue;
      this.doClear();

      if (!R.isNil(currentValue)) {
        if (URI(currentValue).is('absolute')) {
          // The original url from a server
          this.setState({url: currentValue});
        } else {
          this.setState({url: URL.createObjectURL(await this.databaseStorage.get(currentValue))});
        }
      }
    }
  }

  /**
   * @stable [29.07.2019]
   */
  private doClear(): void {
    const {url} = this.state;
    if (!R.isNil(url)) {
      URL.revokeObjectURL(url);
      this.setState({url: null});
    }
  }

  /**
   * @stable [29.07.2019]
   * @returns {string}
   */
  private get currentValue(): string {
    return toLastAddedMultiItemEntityId(this.value) as string;
  }
}
