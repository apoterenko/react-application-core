import { IFileFieldProps, IFileFieldInternalState } from './filefield.interface';
import { BaseFileField } from './base-filefield.component';

export class FileField extends BaseFileField<IFileFieldProps, IFileFieldInternalState> {

  public static defaultProps: IFileFieldProps = {
    displayMessage: '%d file(s)',
    preventFocus: true,
  };
}
