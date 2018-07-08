import * as React from 'react';

import { Field, IFieldInputProps, toLastAddedMultiItemEntity } from '../../field';
import { CenterLayout } from '../../layout';
import { PictureViewer } from '../../viewer';
import { IViewFieldProps } from './viewfield.interface';

export class ViewField extends Field<ViewField, IViewFieldProps> {

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
        <CenterLayout ref='self'
                      className='rac-view-field'>
          {this.getInputElement()}
          {this.viewElement}
        </CenterLayout>
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
}
