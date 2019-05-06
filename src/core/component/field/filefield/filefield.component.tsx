import { toClassName } from '../../../util';
import { IFileFieldProps, IFileFieldInternalState } from './filefield.interface';
import { BaseFileField } from './base-filefield.component';

export class FileField extends BaseFileField<IFileFieldProps, IFileFieldInternalState> {

  public static defaultProps: IFileFieldProps = {
    displayMessage: '%d file(s)',
    preventFocus: true,
  };

  /**
   * @stable [02.05.2019]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return toClassName(super.getFieldClassName(), 'rac-file-field');
  }
}
