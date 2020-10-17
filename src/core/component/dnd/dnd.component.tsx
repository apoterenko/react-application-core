import * as React from 'react';
import Dropzone from 'react-dropzone';

import { GenericComponent } from '../base/generic.component';
import { ConditionUtils } from '../../util';
import {
  DndClassesEnum,
  IDndProps,
} from '../../definition';

export class DnD extends GenericComponent<IDndProps> {

  private readonly dropzoneRef = React.createRef<{ open(): void; }>();

  /**
   * @stable [17.10.2020]
   * @param originalProps
   */
  constructor(originalProps: IDndProps) {
    super(originalProps);

    this.onDrop = this.onDrop.bind(this);
  }

  /**
   * @stable [18.10.2020]
   */
  public render(): JSX.Element {
    const {
      disabled,
    } = this.originalProps;

    return (
      <Dropzone
        ref={this.dropzoneRef}
        disabled={disabled}
        onDrop={this.onDrop}
      >
        {({getRootProps, getInputProps}) => (
          <React.Fragment>
            <div
              {...getRootProps()}
              className={DndClassesEnum.DND}
            >
              <input {...getInputProps()} />
              {this.t(this.settings.messages.UPLOAD_FILES_HERE)}
              {this.originalChildren}
            </div>
          </React.Fragment>
        )}
      </Dropzone>
    );
  }

  /**
   * @stable [17.10.2020]
   */
  public open(): void {
    this.dropzoneRef.current.open();
  }

  /**
   * @stable [17.10.2020]
   * @param files
   * @private
   */
  private onDrop(files: File[]): void {
    ConditionUtils.ifNotNilThanValue(this.originalProps.onSelect, (onSelect) => onSelect(files));
  }
}
