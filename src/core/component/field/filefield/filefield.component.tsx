import { IFileFieldProps, IFileFieldInternalState } from './filefield.interface';
import { BaseFileField } from './base-filefield.component';
import { MultiFieldEntityT } from '../multifield';

export class FileField
    extends BaseFileField<FileField, IFileFieldProps, IFileFieldInternalState> {

  public static defaultProps: IFileFieldProps = {
    displayMessage: '%d file(s)',
    preventFocus: true,
    displayValue: (value: MultiFieldEntityT, field: FileField) => {
      const len = field.multiFieldPlugin.getActiveValueLength(value);
      return field.printfDisplayMessage(len > 0, len);
    },
  };
}
