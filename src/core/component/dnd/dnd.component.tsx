import * as React from 'react';
import Dropzone from 'react-dropzone';

import { BaseComponent } from '../base';
import {
  IDndProps,
  IDnd,
  INativeDropZoneComponent,
} from './dnd.interface';

export class DnD extends BaseComponent<IDndProps> implements IDnd {

  /**
   * @stable [03.08.2018]
   * @param {IDndProps} props
   */
  constructor(props: IDndProps) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }

  /**
   * @stable [03.08.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
        <Dropzone ref='dropZone'
                  className='rac-dnd'
                  disabled={props.disabled}
                  style={{}}
                  onDrop={this.onDrop}>
          {this.t(this.settings.messages.dndMessage)}
          {props.children}
        </Dropzone>
    );
  }

  /**
   * @stable [03.08.2018]
   */
  public open(): void {
    this.dropZone.open();
  }

  /**
   * @stable [03.08.2018]
   * @param {File[]} files
   */
  private onDrop(files: File[]): void {
    const props = this.props;

    if (props.onSelect) {
      props.onSelect(files);
    }
  }

  /**
   * @stable [03.08.2018]
   * @returns {INativeDropZoneComponent}
   */
  private get dropZone(): INativeDropZoneComponent {
    return this.refs.dropZone as INativeDropZoneComponent;
  }
}
