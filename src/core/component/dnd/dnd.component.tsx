import * as React from 'react';
import Dropzone from 'react-dropzone';

import { GenericComponent } from '../base/generic.component';
import { ConditionUtils } from '../../util';
import {
  DndClassesEnum,
  IDndProps,
} from '../../definition';

/**
 * @component-impl
 * @stable [18.10.2020]
 */
export class DnD extends GenericComponent<IDndProps, {}, { open(): void; }> {

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
        ref={this.actualRef}
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
    this.actualRef.current.open();
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
