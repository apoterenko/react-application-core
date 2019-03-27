import * as React from 'react';

import { toClassName } from '../../../util';
import { Field, IFieldInputProps, toLastAddedMultiItemEntity } from '../../field';
import { FlexLayout } from '../../layout';
import { PictureViewer } from '../../viewer';
import { IViewFieldProps } from './viewfield.interface';

export class ViewField extends Field<IViewFieldProps> {

  public static defaultProps: IViewFieldProps = {
    viewer: PictureViewer,
  };

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
    const Component = this.props.viewer;
    return <Component src={toLastAddedMultiItemEntity(this.value)}/>;
  }

  /**
   * @stable [25.03.2019]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return toClassName(super.getFieldClassName(), 'rac-view-field');
  }
}
