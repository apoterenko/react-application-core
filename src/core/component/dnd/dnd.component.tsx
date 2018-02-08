import * as React from 'react';
import Dropzone from 'react-dropzone';

import { BaseComponent, IBaseComponentInternalProps } from '../base';

export class DnD extends BaseComponent<DnD, IBaseComponentInternalProps, { files: string[] }> {

  constructor(props: IBaseComponentInternalProps) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
    this.state = { files: [] };
  }

  public render(): JSX.Element {
    return (
        <Dropzone className='rac-dnd'
                  style={{}}
                  onDrop={this.onDrop}>
          {this.t('Try dropping some files here, or click to select files to upload.')}
          {
            this.state.files.map((fileName) => (<div>{fileName}</div>))
          }
        </Dropzone>
    );
  }

  private onDrop(files): void {
    // TODO Singleton
    const reader = new FileReader();
    reader.onloadend = (event: ProgressEvent) => {
      const buffer = reader.result as ArrayBuffer;
    };

    const file = files[0] as File;
    this.setState({files: this.state.files.concat(file.name)});
    // reader.readAsArrayBuffer(file);
  }
}
