import * as React from 'react';
import Dropzone from 'react-dropzone';

import { BaseComponent, IBaseComponentInternalProps } from '../base';
import {
  IDndInternalProps,
  IDnd,
  INativeDropZoneComponent,
} from './dnd.interface';

export class DnD extends BaseComponent<DnD, IDndInternalProps, {}>
    implements IDnd {

  constructor(props: IBaseComponentInternalProps) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }

  public render(): JSX.Element {
    return (
        <Dropzone ref='dropZone'
                  className='rac-dnd'
                  style={{}}
                  onDrop={this.onDrop}>
          {this.t(this.applicationSettings.messages.dndMessage)}
        </Dropzone>
    );
  }

  public open(): void {
    (this.refs.dropZone as INativeDropZoneComponent).open();
  }

  private onDrop(files: File[]): void {
    const props = this.props;

    if (props.onSelect) {
      props.onSelect(files);
    }
  }
}
